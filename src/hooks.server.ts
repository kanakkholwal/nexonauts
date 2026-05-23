import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { auth } from "$lib/server/auth";
import { env } from "$lib/server/env";

const PROTECTED_ROUTES = ["/admin"];

function coerceObjectIdLike(value: unknown): string | null {
	if (value == null) return null;
	if (typeof value === "string") return value || null;
	if (typeof value !== "object") return null;

	const buffer = (value as { buffer?: unknown }).buffer ?? value;
	if (!buffer || typeof buffer !== "object") return null;

	const bytes: number[] = [];
	for (let i = 0; i < 12; i++) {
		const byte = (buffer as Record<number, unknown>)[i];
		if (typeof byte !== "number") return null;
		bytes.push(byte);
	}
	return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const sessionHook: Handle = async ({ event, resolve }) => {
	const baseUrl = env.BASE_URL ?? event.url.origin;
	event.locals.currentPath = baseUrl + event.url.pathname;

	try {
		const session = await auth.api.getSession({ headers: event.request.headers });
		const cloned = session ? (JSON.parse(JSON.stringify(session)) as typeof session) : null;

		if (cloned?.user) {
			const user = cloned.user as Record<string, unknown>;
			const id = coerceObjectIdLike(user.id) ?? user.id;
			user.id = id;
		}

		event.locals.session = cloned;
	} catch (err) {
		console.error("hooks.server: getSession failed", err);
		event.locals.session = null;
	}

	return resolve(event);
};

const protectedRouteGuard: Handle = async ({ event, resolve }) => {
	const matched = PROTECTED_ROUTES.find((route) => event.url.pathname.startsWith(route));
	if (matched && !event.locals.session?.user) {
		const callback = encodeURIComponent(event.url.pathname + event.url.search);
		redirect(303, `/auth/sign-in?callbackUrl=${callback}`);
	}
	return resolve(event);
};

const betterAuthHandler: Handle = async ({ event, resolve }) =>
	svelteKitHandler({ auth, event, resolve, building: false });

export const handle = sequence(betterAuthHandler, sessionHook, protectedRouteGuard);
