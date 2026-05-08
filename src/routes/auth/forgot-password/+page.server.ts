import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session) throw redirect(303, "/dashboard");
	return {
		meta: {
			title: "Forgot Password — Nexonauts",
			description: "Reset your account password."
		}
	};
};
