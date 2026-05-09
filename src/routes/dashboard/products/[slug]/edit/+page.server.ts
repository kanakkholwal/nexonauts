import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { z } from "zod";
import {
	getProductForCreator,
	PRODUCT_CATEGORIES,
	updateProductByCreator
} from "$lib/server/authoring";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
	const profileId = locals.session?.user?.profile;
	if (!profileId) {
		throw redirect(
			303,
			`/auth/sign-in?callbackUrl=/dashboard/products/${params.slug}/edit`
		);
	}

	const product = await getProductForCreator(params.slug, profileId);
	if (!product) throw error(404, "Product not found");

	return {
		product,
		categories: PRODUCT_CATEGORIES,
		meta: {
			title: `Edit ${product.name} - Dashboard`,
			description: "Update your product listing."
		}
	};
};

const formSchema = z.object({
	name: z.string().trim().min(3).max(100),
	description: z.string().trim().min(100).max(5000),
	url: z.string().url(),
	preview_url: z.string().url(),
	tags: z.array(z.string()).default([]),
	categories: z.array(z.string()).default([]),
	price: z.number().min(0).default(0),
	published: z.boolean().default(false)
});

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		const profileId = locals.session?.user?.profile;
		if (!profileId) return fail(401, { message: "Unauthorized" });

		const product = await getProductForCreator(params.slug!, profileId);
		if (!product) return fail(404, { message: "Product not found" });

		const data = await request.formData();
		const tags = String(data.get("tags") ?? "")
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean);
		const categories = data.getAll("categories").map((c) => String(c));
		const parsed = formSchema.safeParse({
			name: data.get("name"),
			description: data.get("description"),
			url: data.get("url"),
			preview_url: data.get("preview_url"),
			tags,
			categories,
			price: Number(data.get("price") ?? 0),
			published: data.get("published") === "true"
		});

		if (!parsed.success) {
			return fail(400, { message: parsed.error.issues[0]?.message ?? "Validation failed" });
		}

		const result = await updateProductByCreator(product._id, profileId, parsed.data);
		if (!result.success) return fail(400, { message: result.message });
		return result;
	}
};
