import { redirect } from "@sveltejs/kit";
import { getDashboardProducts } from "$lib/server/management";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	if (!session?.user) {
		throw redirect(303, "/auth/sign-in?callbackUrl=/dashboard/products");
	}

	return {
		products: session.user.profile ? await getDashboardProducts(session.user.profile) : [],
		meta: {
			title: "Products - Dashboard",
			description: "Manage your marketplace listings."
		}
	};
};
