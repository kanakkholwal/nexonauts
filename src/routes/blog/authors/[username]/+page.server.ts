import { error } from "@sveltejs/kit";
import { getPostsByAuthor } from "$lib/blog/actions";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const { profile, posts } = await getPostsByAuthor(params.username);
	if (!profile) throw error(404, "Author not found.");

	setHeaders({ "cache-control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" });

	return {
		profile,
		posts,
		meta: {
			title: `${profile.user?.name ?? params.username} — Nexonauts Blog`,
			description: `Articles by ${profile.user?.name ?? params.username}`
		}
	};
};
