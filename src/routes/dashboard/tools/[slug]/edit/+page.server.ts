import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { z } from "zod";
import {
	getToolBySlug,
	listToolCategories,
	TOOL_PRICING_TYPES,
	TOOL_STATUSES,
	updateToolByAuthor
} from "$lib/server/authoring";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
	const profileId = locals.session?.user?.profile;
	if (!profileId) {
		throw redirect(303, `/auth/sign-in?callbackUrl=/dashboard/tools/${params.slug}/edit`);
	}

	const tool = await getToolBySlug(params.slug);
	if (!tool) throw error(404, "Tool not found");

	if (String(tool.author) !== profileId) {
		throw error(403, "You do not own this tool.");
	}

	return {
		tool,
		availableCategories: await listToolCategories(),
		pricingTypes: TOOL_PRICING_TYPES,
		statuses: TOOL_STATUSES,
		meta: {
			title: `Edit ${tool.name} - Dashboard`,
			description: "Update your submitted tool."
		}
	};
};

const formSchema = z.object({
	name: z.string().trim().min(2).max(120),
	description: z.string().trim().min(20).max(5000),
	link: z.string().url(),
	coverImage: z.string().url(),
	bannerImage: z.string().url().optional().or(z.literal("")),
	tags: z.array(z.string()).default([]),
	categories: z
		.array(z.object({ name: z.string().min(1), slug: z.string().min(1) }))
		.default([]),
	pricing_type: z.enum(TOOL_PRICING_TYPES),
	status: z.enum(TOOL_STATUSES)
});

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		const profileId = locals.session?.user?.profile;
		if (!profileId) return fail(401, { message: "Unauthorized" });

		const tool = await getToolBySlug(params.slug!);
		if (!tool) return fail(404, { message: "Tool not found" });
		if (String(tool.author) !== profileId) return fail(403, { message: "Forbidden" });

		const data = await request.formData();
		const tags = String(data.get("tags") ?? "")
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean);

		const names = data.getAll("categoryNames").map((c) => String(c));
		const slugs = data.getAll("categorySlugs").map((c) => String(c));
		const categories = names.map((name, idx) => ({ name, slug: slugs[idx] ?? "" }));

		const bannerImage = String(data.get("bannerImage") ?? "");

		const parsed = formSchema.safeParse({
			name: data.get("name"),
			description: data.get("description"),
			link: data.get("link"),
			coverImage: data.get("coverImage"),
			bannerImage: bannerImage || undefined,
			tags,
			categories,
			pricing_type: data.get("pricing_type"),
			status: data.get("status")
		});

		if (!parsed.success) {
			return fail(400, { message: parsed.error.issues[0]?.message ?? "Validation failed" });
		}

		const { bannerImage: _, ...rest } = parsed.data;
		const result = await updateToolByAuthor(tool._id, profileId, {
			...rest,
			...(parsed.data.bannerImage ? { bannerImage: parsed.data.bannerImage } : {})
		});
		if (!result.success) return fail(400, { message: result.message });
		return result;
	}
};
