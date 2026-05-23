import { error } from "@sveltejs/kit";
import { docs } from "docvia/source";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const slugs = params.slug ? params.slug.split("/").filter(Boolean) : [];
	const page = await docs.getPage(slugs);
	if (!page) error(404, "Guide not found");

	return {
		slugs: page.slugs,
		url: page.url,
		title: (page.data as { title?: string }).title ?? slugs.join("/"),
		description: (page.data as { description?: string }).description ?? null,
		headings: page.headings ?? [],
		content: page.content
	};
};
