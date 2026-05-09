import {
	BASE_MAIL_SERVER_URL,
	BASE_URL,
	BETTER_AUTH_SECRET,
	BETTER_AUTH_URL,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME,
	GEMINI_API_KEY,
	GITHUB_ID,
	GITHUB_SECRET,
	GUMROAD_APP_ID,
	GUMROAD_APP_SECRET,
	JWT_SECRET,
	GOOGLE_ID,
	GOOGLE_SECRET,
	MONGODB_URI,
	NODE_ENV,
	SERVER_IDENTITY
} from "$env/static/private";
import z from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	BASE_URL: z.url().optional(),
	GITHUB_ID: z.string(),
	GITHUB_SECRET: z.string().min(8),
	GOOGLE_ID: z.string(),
	GOOGLE_SECRET: z.string().min(8),
	GUMROAD_APP_ID: z.string().optional(),
	GUMROAD_APP_SECRET: z.string().optional(),
	JWT_SECRET: z.string().min(8).optional(),
	BETTER_AUTH_SECRET: z.string().min(8).optional(),
	BETTER_AUTH_URL: z.url().optional(),
	BASE_MAIL_SERVER_URL: z.string().min(1),
	SERVER_IDENTITY: z.string().optional(),
	MONGODB_URI: z.string().min(10),
	CLOUDINARY_CLOUD_NAME: z.string().optional(),
	CLOUDINARY_API_KEY: z.string().optional(),
	CLOUDINARY_API_SECRET: z.string().optional(),
	GEMINI_API_KEY: z.string().optional()
});

const envRaw = {
	NODE_ENV,
	BASE_URL,
	GITHUB_ID,
	GITHUB_SECRET,
	GOOGLE_ID,
	GOOGLE_SECRET,
	GUMROAD_APP_ID,
	GUMROAD_APP_SECRET,
	JWT_SECRET,
	BETTER_AUTH_SECRET,
	BETTER_AUTH_URL,
	BASE_MAIL_SERVER_URL,
	SERVER_IDENTITY,
	MONGODB_URI,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	GEMINI_API_KEY
};

const env = envSchema.parse(envRaw);
Object.freeze(env);
export { env };
