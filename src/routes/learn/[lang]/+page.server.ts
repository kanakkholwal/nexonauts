import { error } from "@sveltejs/kit";
import { docs } from "docvia/source";
import type { PageServerLoad } from "./$types";

type GuideFrontmatter = {
	title?: string;
	description?: string;
	tags?: string[];
	draft?: boolean;
	order?: number;
};

const LANGUAGE_NAMES: Record<string, string> = {
	go: "Go"
};

export const load: PageServerLoad = async ({ params }) => {
	const lang = params.lang;
	if (!LANGUAGE_NAMES[lang]) error(404, "Unknown language");

	const entries = docs.getPages().filter((p) => p.slugs[0] === "learn" && p.slugs[1] === lang);

	const topics = (
		await Promise.all(
			entries.map(async (entry) => {
				const page = await docs.getPage(entry.slugs);
				const data = (page?.data ?? {}) as GuideFrontmatter;
				if (data.draft) return null;
				const topicSlug = entry.slugs.slice(2).join("/");
				if (!topicSlug) return null;
				return {
					topicSlug,
					title: data.title ?? topicSlug,
					description: data.description ?? null,
					order: data.order ?? Number.MAX_SAFE_INTEGER
				};
			})
		)
	)
		.filter((t): t is NonNullable<typeof t> => t !== null)
		.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

	return {
		lang,
		langName: LANGUAGE_NAMES[lang],
		topics
	};
};
