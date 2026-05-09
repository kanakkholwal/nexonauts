import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { env } from "$lib/server/env";
import {
	INTEGRATION_DESCRIPTORS,
	getIntegrationStatus,
	isIntegrationPlatform,
	revokeIntegration,
	saveIntegrationToken
} from "$lib/server/integrations";
import type { PageServerLoad } from "./$types";

function resolveBaseUrl(event: { url: URL }): string {
	return env.BASE_URL ?? `${event.url.origin}`;
}

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const userId = locals.session?.user?.id;
	if (!userId) {
		redirect(
        			303,
        			`/auth/sign-in?callbackUrl=/dashboard/settings/integrations/${params.platform}`
        		);
	}

	if (!isIntegrationPlatform(params.platform)) {
		error(404, "Unknown integration");
	}

	const descriptor = INTEGRATION_DESCRIPTORS[params.platform];
	const status = await getIntegrationStatus(userId, params.platform);

	const code = url.searchParams.get("code");
	let exchangeResult: { ok: boolean; message?: string } | null = null;

	if (code && !status.integrated) {
		exchangeResult = await saveIntegrationToken(
			userId,
			params.platform,
			resolveBaseUrl({ url }),
			code
		);
		if (exchangeResult.ok) {
			redirect(303, `/dashboard/settings/integrations/${params.platform}`);
		}
	}

	let authUrl: string | null = null;
	try {
		authUrl = descriptor.authUrl(resolveBaseUrl({ url }));
	} catch {
		authUrl = null;
	}

	return {
		platform: params.platform,
		descriptor: {
			label: descriptor.label,
			description: descriptor.description,
			usageCases: descriptor.usageCases,
			scope: descriptor.scope
		},
		status: await getIntegrationStatus(userId, params.platform),
		authUrl,
		exchangeError: exchangeResult && !exchangeResult.ok ? exchangeResult.message ?? null : null,
		meta: {
			title: `${descriptor.label} - Integrations`,
			description: descriptor.description
		}
	};
};

export const actions: Actions = {
	revoke: async ({ locals, params }) => {
		const userId = locals.session?.user?.id;
		if (!userId) return fail(401, { message: "Unauthorized" });
		if (!isIntegrationPlatform(params.platform!)) {
			return fail(404, { message: "Unknown integration" });
		}

		const result = await revokeIntegration(userId, params.platform);
		if (!result.ok) return fail(400, { message: result.message });
		return { success: true, message: `Disconnected ${params.platform}` };
	}
};
