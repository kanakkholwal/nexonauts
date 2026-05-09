import { env as privateEnv } from "$env/dynamic/private";
import z from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	BASE_URL: z.url().optional(),
	INTEGRATION_GITHUB_ID: z.string(),
	INTEGRATION_GITHUB_SECRET: z.string(),
	GOOGLE_ID: z.string(),
	GOOGLE_SECRET: z.string(),
	GUMROAD_APP_ID: z.string().optional(),
	GUMROAD_APP_SECRET: z.string().optional(),
	JWT_SECRET: z.string().optional(),
	BETTER_AUTH_SECRET: z.string().optional(),
	BASE_MAIL_SERVER_URL: z.url(),
	SERVER_IDENTITY: z.string().optional(),
	MONGODB_URI: z.string(),
	CLOUDINARY_CLOUD_NAME: z.string().optional(),
	CLOUDINARY_API_KEY: z.string().optional(),
	CLOUDINARY_API_SECRET: z.string().optional(),
	GEMINI_API_KEY: z.string().optional()
});

const envRaw = {
	NODE_ENV: privateEnv.NODE_ENV,
	BASE_URL: privateEnv.BASE_URL,
	INTEGRATION_GITHUB_ID: privateEnv.INTEGRATION_GITHUB_ID,
	INTEGRATION_GITHUB_SECRET: privateEnv.INTEGRATION_GITHUB_SECRET,
	GOOGLE_ID: privateEnv.GOOGLE_ID,
	GOOGLE_SECRET: privateEnv.GOOGLE_SECRET,
	GUMROAD_APP_ID: privateEnv.GUMROAD_APP_ID,
	GUMROAD_APP_SECRET: privateEnv.GUMROAD_APP_SECRET,
	JWT_SECRET: privateEnv.JWT_SECRET,
	BETTER_AUTH_SECRET: privateEnv.BETTER_AUTH_SECRET,

	BASE_MAIL_SERVER_URL: privateEnv.BASE_MAIL_SERVER_URL,
	SERVER_IDENTITY: privateEnv.SERVER_IDENTITY,
	MONGODB_URI: privateEnv.MONGODB_URI,
	CLOUDINARY_CLOUD_NAME: privateEnv.CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY: privateEnv.CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET: privateEnv.CLOUDINARY_API_SECRET,
	GEMINI_API_KEY: privateEnv.GEMINI_API_KEY
};

const env = envSchema.parse(envRaw);
Object.freeze(env);
export { env };
