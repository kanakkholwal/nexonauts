import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		session: locals.session
	};
};

export const prerender = false;
export const ssr = true;
