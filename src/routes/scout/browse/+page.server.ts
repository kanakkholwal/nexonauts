import type { PublicToolPricingType } from "src/models/tool";
import { HERO_SECTION, METADATA } from "data/scout/browse";
import { getScoutTools } from "$lib/server/scout";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get("query") ?? "";
	const page = Math.max(1, Number(url.searchParams.get("page") ?? "1") || 1);
	const offset = Math.max(0, Number(url.searchParams.get("offset") ?? "0") || 0);
	const view = url.searchParams.get("view") === "list" ? "list" : "grid";
	const category = url.searchParams.get("category") ?? "all";
	const pricing_type = url.searchParams.get("pricing_type") ?? "all";

	const filter = {
		pricing_type: pricing_type as PublicToolPricingType | "all",
		category
	};

	const result = await getScoutTools(query, page, filter, offset);

	return {
		...result,
		query,
		page,
		offset,
		view,
		filter,
		hero: HERO_SECTION,
		meta: {
			title: METADATA.title ?? "Browse Nexo Scout",
			description: METADATA.description
		}
	};
};

