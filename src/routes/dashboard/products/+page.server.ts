import { fail, redirect, type Actions } from "@sveltejs/kit";
import { getDashboardProducts } from "$lib/server/management";
import { deleteProductAsCreator } from "$lib/server/moderation";
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

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const profileId = locals.session?.user?.profile;
		if (!profileId) return fail(401, { message: "Unauthorized" });

		const data = await request.formData();
		const productId = String(data.get("productId") ?? "");
		if (!productId) return fail(400, { message: "Missing productId" });

		const result = await deleteProductAsCreator(productId, profileId);
		if (!result.success) return fail(400, { message: result.message });
		return result;
	}
};
