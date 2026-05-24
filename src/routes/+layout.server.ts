import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
	return {
		session: locals.session,
		currentPath: locals.currentPath ?? url.pathname
	};
};
