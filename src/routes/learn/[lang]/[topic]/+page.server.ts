import { error } from "@sveltejs/kit";
import { docs } from "docvia/source";
import type { PageServerLoad } from "./$types";

const LANGUAGE_NAMES: Record<string, string> = {
	go: "Go"
};

export const load: PageServerLoad = async ({ params }) => {
	const { lang, topic } = params;
	if (!LANGUAGE_NAMES[lang]) error(404, "Unknown language");

	const page = await docs.getPage(["learn", lang, topic]);
	if (!page) error(404, "Example not found");

	// Build prev/next from the same language's topic list, ordered by frontmatter `order`.
	const entries = docs.getPages().filter((p) => p.slugs[0] === "learn" && p.slugs[1] === lang);
	const enriched = (
		await Promise.all(
			entries.map(async (entry) => {
				const p = await docs.getPage(entry.slugs);
				const d = (p?.data ?? {}) as { title?: string; order?: number; draft?: boolean };
				if (d.draft) return null;
				const ts = entry.slugs.slice(2).join("/");
				if (!ts) return null;
				return { topicSlug: ts, title: d.title ?? ts, order: d.order ?? Number.MAX_SAFE_INTEGER };
			})
		)
	)
		.filter((x): x is NonNullable<typeof x> => x !== null)
		.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

	const currentIdx = enriched.findIndex((e) => e.topicSlug === topic);
	const prev = currentIdx > 0 ? enriched[currentIdx - 1] : null;
	const next = currentIdx >= 0 && currentIdx < enriched.length - 1 ? enriched[currentIdx + 1] : null;

	return {
		lang,
		langName: LANGUAGE_NAMES[lang],
		topic,
		title: (page.data as { title?: string }).title ?? topic,
		description: (page.data as { description?: string }).description ?? null,
		content: page.content,
		prev,
		next
	};
};
