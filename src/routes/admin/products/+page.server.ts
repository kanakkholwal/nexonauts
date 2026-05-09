import { fail, type Actions } from "@sveltejs/kit";
import { getAdminProducts } from "$lib/server/management";
import { deleteProductAsAdmin } from "$lib/server/moderation";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	return {
		products: await getAdminProducts(),
		meta: {
			title: "Products - Admin",
			description: "Review marketplace listings in the Nexonauts admin console."
		}
	};
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		if (locals.session?.user?.role !== "admin") return fail(403, { message: "Forbidden" });

		const data = await request.formData();
		const productId = String(data.get("productId") ?? "");
		if (!productId) return fail(400, { message: "Missing productId" });

		const result = await deleteProductAsAdmin(productId);
		if (!result.success) return fail(400, { message: result.message });
		return result;
	}
};
