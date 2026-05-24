import { createFetch } from "@better-fetch/fetch";
import { env } from "$env/dynamic/private";

type FetchInstance = ReturnType<typeof createFetch>;

let cached: FetchInstance | null = null;

function getMailFetch(): FetchInstance {
	if (cached) return cached;
	const baseURL = env.BASE_MAIL_SERVER_URL;
	const identity = env.SERVER_IDENTITY;
	if (!baseURL || !identity) {
		throw new Error(
			"mailFetch unavailable: BASE_MAIL_SERVER_URL or SERVER_IDENTITY is not set in the environment."
		);
	}
	cached = createFetch({
		baseURL,
		headers: {
			"Content-Type": "application/json",
			"X-IDENTITY-KEY": identity
		}
	});
	return cached;
}

export const mailFetch: FetchInstance = ((...args: Parameters<FetchInstance>) =>
	getMailFetch()(...args)) as FetchInstance;
