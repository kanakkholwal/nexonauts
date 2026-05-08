import { redirect } from "@sveltejs/kit";
import { getDashboardTools } from "$lib/server/management";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	if (!session?.user) {
		throw redirect(303, "/auth/sign-in?callbackUrl=/dashboard/tools");
	}

	return {
		tools: session.user.profile ? await getDashboardTools(session.user.profile) : [],
		meta: {
			title: "Tools - Dashboard",
			description: "Manage tools you've submitted to the directory."
		}
	};
};
