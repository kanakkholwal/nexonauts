import { redirect } from "@sveltejs/kit";
import { getDashboardProfile } from "$lib/server/management";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	if (!session?.user) {
		throw redirect(303, "/auth/sign-in?callbackUrl=/dashboard/settings/profile");
	}

	return {
		profile: session.user.profile ? await getDashboardProfile(session.user.profile) : null,
		meta: {
			title: "Profile - Settings",
			description: "Review your public Nexonauts profile."
		}
	};
};
