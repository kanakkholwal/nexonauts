import { CATEGORIES, SHORT_DESCRIPTION, TITLE } from "data/marketplace";
import {
	getMarketplacePopularTags,
	searchMarketplaceProducts
} from "$lib/server/marketplace";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get("query") ?? "";
	const category = url.searchParams.get("category") ?? "";
	const tags = url.searchParams.get("tags") ?? "";
	const price = url.searchParams.get("price") ?? "";

	const [products, popularTags] = await Promise.all([
		searchMarketplaceProducts({ query, category, tags, price }),
		getMarketplacePopularTags()
	]);

	return {
		products,
		popularTags,
		filters: { query, category, tags, price },
		categories: [...CATEGORIES],
		meta: {
			title: `${TITLE} - Explore`,
			description: SHORT_DESCRIPTION
		}
	};
};
