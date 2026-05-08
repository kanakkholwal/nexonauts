import { getScoutLandingCategories, getScoutToolCount } from "$lib/server/scout";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const [totalTools, categories] = await Promise.all([
		getScoutToolCount(),
		getScoutLandingCategories()
	]);

	return {
		totalTools,
		categories,
		meta: {
			title: "Nexo Scout - The AI Tool Directory",
			description:
				"Discover the best AI tools, services, and resources to supercharge your workflow."
		}
	};
};

