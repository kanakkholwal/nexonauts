import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.toString();
	throw redirect(307, query ? `/marketplace/explore?${query}` : "/marketplace/explore");
};
