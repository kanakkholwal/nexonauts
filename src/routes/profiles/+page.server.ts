import { getProfiles } from "$lib/server/profiles";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get("query") ?? "";
	const page = Number(url.searchParams.get("page") ?? 1);
	const offset = Number(url.searchParams.get("offset") ?? 0);
	const profiles = await getProfiles(query, page, offset || 32);

	return {
		profiles,
		query,
		meta: {
			title: "Explore Developers — Nexonauts",
			description: "Connect with top developers, designers, and creators in the Nexonauts ecosystem."
		}
	};
};
