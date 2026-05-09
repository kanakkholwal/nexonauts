import { getRequestEvent } from "$app/server";
import { appConfig } from "@root/project.config";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { APIError } from "better-auth/api";
import { admin, haveIBeenPwned, username } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { client, db } from "src/lib/db";
import { mailFetch } from "src/lib/server-fetch";
import { env } from "src/lib/server/env";

const VERIFY_EMAIL_PATH_PREFIX = "/auth/verify-mail";
const RESET_PASSWORD_PATH_PREFIX = "/auth/reset-password";

export const betterAuthOptions = {
	appName: appConfig.name,
	database: mongodbAdapter(db, { client }),
	baseURL: env.BASE_URL ?? "http://localhost:3000",
	onAPIError: {
		throw: true,
		onError: (error, ctx) => {
			console.log("Auth error:", error);
			console.log("Auth error , context:", ctx);
		}
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		autoSignIn: true,
		sendResetPassword: async ({ user, token }) => {
			const reset_link = new URL(env.BASE_URL ??  "http://localhost:3000");
			reset_link.pathname = RESET_PASSWORD_PATH_PREFIX;
			reset_link.searchParams.set("token", token);
			try {
				const response = await mailFetch<{
					data: string[] | null;
					error?: string | null | object;
				}>("/api/send", {
					method: "POST",
					body: JSON.stringify({
						template_key: "reset-password",
						targets: [user.email],
						subject: "Reset Password",
						payload: {
							name: user.name,
							email: user.email,
							reset_link: reset_link.toString()
						}
					})
				});
				if (response.error) {
					throw new APIError("INTERNAL_SERVER_ERROR", {
						message: "Error sending email from mail server"
					});
				}
			} catch (err) {
				console.error(err);
				throw new APIError("INTERNAL_SERVER_ERROR", {
					message: "Error sending email"
				});
			}
		}
	},
	emailVerification: {
		sendOnSignUp: true,
		sendVerificationEmail: async ({ user, token }) => {
			const verification_url = new URL(
				env.BASE_URL ?? "http://localhost:3000"
			);
			verification_url.pathname = VERIFY_EMAIL_PATH_PREFIX;
			verification_url.searchParams.set("token", token);
			try {
				const response = await mailFetch<{
					data: string[] | null;
					error?: string | null | object;
				}>("/api/send", {
					method: "POST",
					body: JSON.stringify({
						template_key: "welcome_verify",
						targets: [user.email],
						subject: `Welcome to ${appConfig.name}`,
						payload: {
							platform_name: appConfig.name,
							name: user.name,
							email: user.email,
							verification_url: verification_url.toString()
						}
					})
				});
				if (response.error) {
					throw new APIError("INTERNAL_SERVER_ERROR", {
						message: "Error sending email"
					});
				}
			} catch (err) {
				console.error(err);
				throw new APIError("INTERNAL_SERVER_ERROR", {
					message: "Error sending email"
				});
			}
		}
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_ID,
			clientSecret: env.GOOGLE_SECRET,
			mapProfileToUser: async (profile) => ({ image: profile.picture })
		},
		github: {
			clientId: env.INTEGRATION_GITHUB_ID,
			clientSecret: env.INTEGRATION_GITHUB_SECRET,
			mapProfileToUser: async (profile) => ({ image: profile.avatar_url })
		}
	},
	advanced: {
		crossSubDomainCookies: {
			enabled: env.NODE_ENV === "production",
			domain: appConfig.appDomain
		},
		cookiePrefix: "nexonauts"
	},
	trustedOrigins: [
		"nexonauts.com",
		"auth.nexonauts.com",
		"app.nexonauts.com",
		"platform.nexonauts.com",
		"https://nexonauts.com",
		"https://auth.nexonauts.com",
		"https://app.nexonauts.com",
		"https://platform.nexonauts.com",
		"*.nexonauts.com",
		"https://*.nexonauts.com",
		"https://*.dev.nexonauts.com"
	],
	user: {
		modelName: "users",
		fields: {
			image: "profilePicture",
			emailVerified: "verified"
		},
		additionalFields: {
			role: { type: "string", required: true, input: false, defaultValue: "user" },
			other_roles: { type: "string[]", required: false, input: false },
			account_type: { type: "string", required: true, input: false, defaultValue: "free" },
			gender: { type: "string", input: true, defaultValue: "not_specified" },
			username: { type: "string", required: true, unique: true, input: true },
			integrations: { type: "json", input: false, defaultValue: {} },
			profile: { type: "string", input: false, defaultValue: null }
		}
	},
	session: {
		expiresIn: 604800,
		updateAge: 86400,
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
			strategy: "compact"
		}
	},
	account: {
		encryptOAuthTokens: true,
		accountLinking: {
			enabled: true,
			trustedProviders: ["google", "github", "email-password"],
			allowDifferentEmails: false
		}
	},
	plugins: [
		username(),
		admin({
			defaultRole: "user",
			adminRole: ["admin"],
			defaultBanExpiresIn: 60 * 60 * 24 * 7
		}),
		haveIBeenPwned({
			customPasswordCompromisedMessage: "Please choose a more secure password."
		}),
		sveltekitCookies(getRequestEvent)
	],
	telemetry: {
		enabled: false
	}
} satisfies BetterAuthOptions;

export const auth = betterAuth(betterAuthOptions);

export type Session = typeof auth.$Infer.Session;
export type SessionUserType = typeof auth.$Infer.Session.user;
