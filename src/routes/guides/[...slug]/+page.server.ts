import { error, redirect } from "@sveltejs/kit";
import { docs } from "docvia/source";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const slugs = params.slug ? params.slug.split("/").filter(Boolean) : [];

	// /learn/... content has its own dedicated route. Redirect any stray
	// /guides/learn/... hits to the canonical URL so we don't double-serve.
	if (slugs[0] === "learn") {
		redirect(308, `/learn/${slugs.slice(1).join("/")}`);
	}

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
