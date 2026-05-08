import { redirect } from "@sveltejs/kit";
import { getDashboardIntegrations } from "$lib/server/management";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	if (!session?.user) {
		throw redirect(303, "/auth/sign-in?callbackUrl=/dashboard/settings/integrations");
	}

	return {
		integrations: await getDashboardIntegrations(session.user.id),
		meta: {
			title: "Integrations - Settings",
			description: "Review connected GitHub and Gumroad integrations."
		}
	};
};
