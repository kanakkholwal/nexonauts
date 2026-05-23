import { docs } from "docvia/source";
import type { PageServerLoad } from "./$types";

type LanguageMeta = {
	code: string;
	name: string;
	tagline: string;
};

const LANGUAGE_CATALOG: LanguageMeta[] = [
	{
		code: "go",
		name: "Go",
		tagline: "Concurrency primitives, channels, and the things that make Go feel like Go."
	}
];

export const load: PageServerLoad = async () => {
	const learnPages = docs.getPages().filter((p) => p.slugs[0] === "learn");

	const languages = LANGUAGE_CATALOG.map((lang) => {
		const topicCount = learnPages.filter((p) => p.slugs[1] === lang.code).length;
		return { ...lang, topicCount };
	}).filter((lang) => lang.topicCount > 0);

	return { languages };
};
