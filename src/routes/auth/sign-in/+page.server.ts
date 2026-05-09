import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) redirect(303, "/dashboard");
	return {
		meta: {
			title: "Sign In — Nexonauts",
			description: "Access your developer dashboard."
		}
	};
};
