import { redirect } from "@sveltejs/kit";
import { getDashboardAccount } from "$lib/server/management";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	if (!session?.user) {
		redirect(303, "/auth/sign-in?callbackUrl=/dashboard/settings/account");
	}

	return {
		account: await getDashboardAccount(session.user.id),
		meta: {
			title: "Account - Settings",
			description: "Review your account details and security status."
		}
	};
};
