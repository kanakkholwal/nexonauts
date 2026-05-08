import { error } from "@sveltejs/kit";
import {
	getMarketplaceProductBySlug,
	getMoreMarketplaceProductsByCreator,
	getSimilarMarketplaceProducts
} from "$lib/server/marketplace";
import { decodeHTMLEntities } from "src/utils/string";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
	const product = await getMarketplaceProductBySlug(params.slug);
	if (!product) throw error(404, "Product not found.");

	const [moreFromCreator, similarProducts] = await Promise.all([
		getMoreMarketplaceProductsByCreator(product),
		getSimilarMarketplaceProducts(product)
	]);

	return {
		product,
		moreFromCreator,
		similarProducts,
		isCreator: locals.session?.user?.username === product.creator?.username,
		meta: {
			title: `${decodeHTMLEntities(product.name)} on Nexonauts`,
			description: product.description.slice(0, 160)
		}
	};
};
