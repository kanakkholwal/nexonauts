import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/integrations/svelte-kit";
import { auth } from "$lib/server/auth";

const PROTECTED_ROUTES = ["/dashboard", "/admin"];

const SEO_REDIRECTS: Array<[string, string]> = [
	["/tool-scout/tools/", "/scout/tools/"],
	["/toolzen/tools/", "/scout/tools/"],
	["/toolbox/", "/scout/"]
];

const seoRedirects: Handle = async ({ event, resolve }) => {
	const { pathname, search } = event.url;

	for (const [from, to] of SEO_REDIRECTS) {
		if (pathname.startsWith(from)) {
			throw redirect(308, pathname.replace(from, to) + search);
		}
	}

	if (pathname === "/toolbox" && search.startsWith("?query")) {
		throw redirect(308, "/scout/browse" + search);
	}

	return resolve(event);
};

const sessionHook: Handle = async ({ event, resolve }) => {
	const baseUrl = process.env.BASE_URL ?? event.url.origin;
	event.locals.currentPath = baseUrl + event.url.pathname;

	try {
		const session = await auth.api.getSession({ headers: event.request.headers });
		event.locals.session = session
			? (JSON.parse(JSON.stringify(session)) as typeof session)
			: null;
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
		throw redirect(303, `/auth/sign-in?callbackUrl=${callback}`);
	}
	return resolve(event);
};

const betterAuthHandler: Handle = async ({ event, resolve }) =>
	svelteKitHandler({ auth, event, resolve, building: false });

export const handle = sequence(
	betterAuthHandler,
	seoRedirects,
	sessionHook,
	protectedRouteGuard
);
