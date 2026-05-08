import { FULL_DESCRIPTION, TITLE, getCategoryByLabel } from "data/marketplace";
import { getMarketplaceProductsByCategory } from "$lib/server/marketplace";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const results = await getMarketplaceProductsByCategory();

	return {
		results,
		categoryDescriptions: Object.fromEntries(
			results.map((result) => [
				result.category,
				getCategoryByLabel(result.category)?.description ??
					`Explore our collection of ${result.category}`
			])
		),
		meta: {
			title: TITLE,
			description: FULL_DESCRIPTION
		}
	};
};
