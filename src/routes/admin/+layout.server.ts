import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.session?.user) throw redirect(303, "/auth/sign-in?callbackUrl=/admin");
	if (locals.session.user.role !== "admin") throw error(403, "Admins only.");

	return {
		session: locals.session
	};
};

export const prerender = false;
export const ssr = true;
