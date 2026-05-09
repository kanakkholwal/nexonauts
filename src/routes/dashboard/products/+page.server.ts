import { fail, redirect, type Actions } from "@sveltejs/kit";
import { getDashboardProducts } from "$lib/server/management";
import { deleteProductAsCreator } from "$lib/server/moderation";
import { importGumroadProduct, listGumroadProducts } from "$lib/server/integrations/gumroad";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = locals.session;
	if (!session?.user) {
		throw redirect(303, "/auth/sign-in?callbackUrl=/dashboard/products");
	}

	const importFrom = url.searchParams.get("importFrom");
	const wantGumroadList = importFrom === "gumroad";

	const [products, gumroadList] = await Promise.all([
		session.user.profile ? getDashboardProducts(session.user.profile) : Promise.resolve([]),
		wantGumroadList ? listGumroadProducts(session.user.id) : Promise.resolve(null)
	]);

	return {
		products,
		gumroad: gumroadList
			? gumroadList.ok
				? { ok: true as const, products: gumroadList.products }
				: { ok: false as const, message: gumroadList.message }
			: null,
		showImportPanel: wantGumroadList,
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
	},
	importGumroad: async ({ request, locals }) => {
		const userId = locals.session?.user?.id;
		const profileId = locals.session?.user?.profile;
		if (!userId || !profileId) return fail(401, { message: "Unauthorized" });

		const data = await request.formData();
		const productId = String(data.get("gumroadProductId") ?? "");
		if (!productId) return fail(400, { message: "Missing Gumroad product id" });

		const result = await importGumroadProduct(userId, profileId, productId);
		if (!result.ok) return fail(400, { message: result.message });
		return { success: true, message: "Product imported from Gumroad" };
	}
};
