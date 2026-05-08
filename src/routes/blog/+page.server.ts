import { getHomePagePosts } from "$lib/blog/actions";
import { decodeHTMLEntities } from "src/utils/string";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ setHeaders }) => {
	const { posts } = await getHomePagePosts();
	const decoded = posts.map((post) => ({
		...post,
		title: decodeHTMLEntities(post.title)
	}));

	setHeaders({ "cache-control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" });

	return {
		posts: JSON.parse(JSON.stringify(decoded)),
		meta: {
			title: "Blog — Nexonauts",
			description: "Get the latest news, insights, and updates from our team."
		}
	};
};
