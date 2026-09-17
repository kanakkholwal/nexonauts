import { docs } from "virtual:docvia/source";
import type { PageServerLoad } from "./$types";
import { devTools } from "./dev-tools/tools";

// Every number on the homepage is counted here, so nothing on the page is a
// figure someone typed. A count that is not true is not shown.
export const load: PageServerLoad = async () => {
	const pages = docs.getPages();
	const learnPages = pages.filter((p) => p.slugs[0] === "learn");
	const guidePages = pages.filter((p) => p.slugs[0] !== "learn" && p.slugs.length > 0);

	const languages = [...new Set(learnPages.map((p) => p.slugs[1]).filter(Boolean))];

	const guides = (
		await Promise.all(
			guidePages.map(async (entry) => {
				const page = await docs.getPage(entry.slugs);
				const data = (page?.data ?? {}) as { title?: string; draft?: boolean };
				if (data.draft) return null;
				return {
					title: data.title ?? entry.slugs.join("/"),
					href: `/guides/${entry.slugs.join("/")}`
				};
			})
		)
	).filter((g): g is { title: string; href: string } => g !== null);

	const topics = learnPages.map((p) => ({
		title: p.slugs[p.slugs.length - 1].replace(/-/g, " "),
		href: `/learn/${p.slugs.slice(1).join("/")}`
	}));

	return {
		counts: {
			tools: devTools.length,
			categories: new Set(devTools.map((t) => t.category)).size,
			guides: guides.length,
			topics: topics.length,
			languages: languages.length
		},
		guides,
		topics
	};
};
