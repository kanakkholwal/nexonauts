import z from "zod";
import { env as privateEnv } from "$env/dynamic/private";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	BASE_URL: z.url().optional(),
	INTEGRATION_GITHUB_ID: z.string(),
	INTEGRATION_GITHUB_SECRET: z.string(),
	GOOGLE_ID: z.string(),
	GOOGLE_SECRET: z.string(),
	JWT_SECRET: z.string().optional(),
	BASE_MAIL_SERVER_URL: z.url(),
	SERVER_IDENTITY: z.string().optional(),
	MONGODB_URI: z.string()
});

const envRaw = {
	NODE_ENV: privateEnv.NODE_ENV,
	BASE_URL: privateEnv.BASE_URL,
	INTEGRATION_GITHUB_ID: privateEnv.INTEGRATION_GITHUB_ID,
	INTEGRATION_GITHUB_SECRET: privateEnv.INTEGRATION_GITHUB_SECRET,
	GOOGLE_ID: privateEnv.GOOGLE_ID,
	GOOGLE_SECRET: privateEnv.GOOGLE_SECRET,
	JWT_SECRET: privateEnv.JWT_SECRET,

	BASE_MAIL_SERVER_URL: privateEnv.BASE_MAIL_SERVER_URL,
	SERVER_IDENTITY: privateEnv.SERVER_IDENTITY,
	MONGODB_URI: privateEnv.MONGODB_URI
};

const env = envSchema.parse(envRaw);
Object.freeze(env);

export { env };
