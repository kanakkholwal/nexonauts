import { BASE_MAIL_SERVER_URL, BETTER_AUTH_URL, GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET, MONGODB_URI, NODE_ENV } from "$env/static/private";
import z from "zod";

const envSchmema = z.object({
    GITHUB_ID: z.string(),
    GOOGLE_ID: z.string(),
    GITHUB_SECRET: z.string().min(8),
    GOOGLE_SECRET: z.string().min(8),
    BASE_MAIL_SERVER_URL: z.url(),
    NODE_ENV: z.enum(['development', 'production', 'test']),
    BETTER_AUTH_URL: z.url().optional(),
    MONGODB_URI: z.string().min(10),
});

const envraw = {
    GITHUB_ID,
    GOOGLE_ID,
    GITHUB_SECRET,
    GOOGLE_SECRET,
    BASE_MAIL_SERVER_URL,
    NODE_ENV,
    BETTER_AUTH_URL,MONGODB_URI
}


const env = envSchmema.parse(envraw);
Object.freeze(env);
export { env };

