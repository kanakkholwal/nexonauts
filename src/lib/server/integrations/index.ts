import { nanoid } from "nanoid";
import dbConnect from "$lib/db";
import { env } from "$lib/server/env";
import UserModel from "src/models/user";

export type IntegrationPlatform = "github" | "gumroad";

export type IntegrationDescriptor = {
	platform: IntegrationPlatform;
	label: string;
	description: string;
	usageCases: { name: string; description: string }[];
	scope: string;
	authUrl: (baseUrl: string) => string;
	exchangeCodeForToken: (
		baseUrl: string,
		code: string
	) => Promise<{ access_token: string } & Record<string, unknown>>;
};

function buildRedirectUri(baseUrl: string, platform: IntegrationPlatform): string {
	return `${baseUrl.replace(/\/$/, "")}/dashboard/settings/integrations/${platform}`;
}

export const INTEGRATION_DESCRIPTORS: Record<IntegrationPlatform, IntegrationDescriptor> = {
	github: {
		platform: "github",
		label: "GitHub",
		description: "Import your GitHub repositories and activity.",
		usageCases: [
			{ name: "Import repositories", description: "Pull repos from GitHub into your dashboard." },
			{ name: "Import activity", description: "Surface activity from GitHub in your timeline." }
		],
		scope: "user public_repo",
		authUrl(baseUrl) {
			const params = new URLSearchParams({
				client_id: env.GITHUB_ID,
				redirect_uri: buildRedirectUri(baseUrl, "github"),
				scope: this.scope,
				state: nanoid()
			});
			return `https://github.com/login/oauth/authorize?${params.toString()}`;
		},
		async exchangeCodeForToken(baseUrl, code) {
			const response = await fetch("https://github.com/login/oauth/access_token", {
				method: "POST",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify({
					client_id: env.GITHUB_ID,
					client_secret: env.GITHUB_SECRET,
					redirect_uri: buildRedirectUri(baseUrl, "github"),
					code
				})
			});
			if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
			const data = (await response.json()) as { access_token?: string };
			if (!data.access_token) throw new Error("GitHub did not return an access token");
			return data as { access_token: string };
		}
	},
	gumroad: {
		platform: "gumroad",
		label: "Gumroad",
		description: "Import your Gumroad products into the marketplace.",
		usageCases: [
			{ name: "Import products", description: "Pull live products from your Gumroad library." },
			{ name: "Sync availability", description: "Keep imported listings in sync with Gumroad." }
		],
		scope: "view_profile edit_products",
		authUrl(baseUrl) {
			if (!env.GUMROAD_APP_ID) {
				throw new Error("GUMROAD_APP_ID is not configured");
			}
			const params = new URLSearchParams({
				client_id: env.GUMROAD_APP_ID,
				redirect_uri: buildRedirectUri(baseUrl, "gumroad"),
				scope: this.scope,
				state: nanoid()
			});
			return `https://gumroad.com/oauth/authorize?${params.toString()}`;
		},
		async exchangeCodeForToken(baseUrl, code) {
			if (!env.GUMROAD_APP_ID || !env.GUMROAD_APP_SECRET) {
				throw new Error("Gumroad OAuth credentials are not configured");
			}
			const params = new URLSearchParams({
				code,
				client_id: env.GUMROAD_APP_ID,
				client_secret: env.GUMROAD_APP_SECRET,
				redirect_uri: buildRedirectUri(baseUrl, "gumroad")
			});
			const response = await fetch("https://api.gumroad.com/oauth/token", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: params.toString()
			});
			if (!response.ok) throw new Error(`Gumroad responded ${response.status}`);
			const data = (await response.json()) as { access_token?: string };
			if (!data.access_token) throw new Error("Gumroad did not return an access token");
			return data as { access_token: string };
		}
	}
};

export function isIntegrationPlatform(value: string): value is IntegrationPlatform {
	return value in INTEGRATION_DESCRIPTORS;
}

export type IntegrationStatus = {
	integrated: boolean;
	scope: string | null;
	lastAuthorized: string | null;
};

export async function getIntegrationStatus(
	userId: string,
	platform: IntegrationPlatform
): Promise<IntegrationStatus> {
	await dbConnect();
	const user = await UserModel.findById(userId).select("integrations").lean().exec();
	const integrations = (user as { integrations?: Record<string, unknown> } | null)?.integrations;
	const platformData = (integrations?.[platform] ?? {}) as Partial<{
		integrated: boolean;
		scope: string | null;
		lastAuthorized: Date | string | null;
	}>;
	return {
		integrated: platformData.integrated ?? false,
		scope: platformData.scope ?? null,
		lastAuthorized: platformData.lastAuthorized
			? new Date(platformData.lastAuthorized as Date | string).toISOString()
			: null
	};
}

export async function saveIntegrationToken(
	userId: string,
	platform: IntegrationPlatform,
	baseUrl: string,
	code: string
): Promise<{ ok: true } | { ok: false; message: string }> {
	const descriptor = INTEGRATION_DESCRIPTORS[platform];
	try {
		const tokenResponse = await descriptor.exchangeCodeForToken(baseUrl, code);
		await dbConnect();
		const user = await UserModel.findById(userId).select("integrations").exec();
		if (!user) return { ok: false, message: "User not found" };

		if (!user.integrations) {
			(user as unknown as { integrations: Record<string, unknown> }).integrations = {};
		}
		const existing =
			(user.integrations as Record<string, Record<string, unknown>> | undefined)?.[platform] ?? {};
		(user.integrations as Record<string, Record<string, unknown>>)[platform] = {
			...existing,
			access_token: tokenResponse.access_token,
			scope: descriptor.scope,
			integrated: true,
			lastAuthorized: new Date()
		};
		user.markModified("integrations");
		await user.save();
		return { ok: true };
	} catch (err) {
		console.error(`saveIntegrationToken(${platform}) failed`, err);
		return { ok: false, message: err instanceof Error ? err.message : "Unknown error" };
	}
}

export async function revokeIntegration(
	userId: string,
	platform: IntegrationPlatform
): Promise<{ ok: true } | { ok: false; message: string }> {
	try {
		await dbConnect();
		const user = await UserModel.findById(userId).select("integrations").exec();
		if (!user) return { ok: false, message: "User not found" };

		const integrations = user.integrations as
			| Record<string, Record<string, unknown>>
			| undefined;
		if (!integrations || !integrations[platform]) {
			return { ok: false, message: "Integration is not connected" };
		}
		integrations[platform] = {
			...integrations[platform],
			access_token: null,
			integrated: false,
			lastAuthorized: null
		};
		user.markModified("integrations");
		await user.save();
		return { ok: true };
	} catch (err) {
		console.error(`revokeIntegration(${platform}) failed`, err);
		return { ok: false, message: err instanceof Error ? err.message : "Unknown error" };
	}
}
