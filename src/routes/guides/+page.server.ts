import { docs } from "docvia/source";
import type { PageServerLoad } from "./$types";

type GuideFrontmatter = {
	title?: string;
	description?: string;
	tags?: string[];
	draft?: boolean;
	order?: number;
};

export const load: PageServerLoad = async () => {
	const entries = docs.getPages().filter((p) => p.slugs[0] !== "learn");

	const pages = (
		await Promise.all(
			entries.map(async (entry) => {
				// The root index.md represents /guides itself — exclude it from the list.
				if (entry.slugs.length === 0) return null;

				// getPages() in dev mode through the Vite virtual module returns
				// empty frontmatter — fetch the page directly to get real metadata.
				const page = await docs.getPage(entry.slugs);
				const data = (page?.data ?? {}) as GuideFrontmatter;
				if (data.draft) return null;

				return {
					slugs: entry.slugs,
					title: data.title ?? entry.slugs.join("/"),
					description: data.description ?? null,
					tags: data.tags ?? [],
					order: data.order ?? Number.MAX_SAFE_INTEGER
				};
			})
		)
	)
		.filter((p): p is NonNullable<typeof p> => p !== null)
		.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

	return { pages };
};
