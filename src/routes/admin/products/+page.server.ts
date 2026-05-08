import { getAdminProducts } from "$lib/server/management";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	return {
		products: await getAdminProducts(),
		meta: {
			title: "Products - Admin",
			description: "Review marketplace listings in the Nexonauts admin console."
		}
	};
};
