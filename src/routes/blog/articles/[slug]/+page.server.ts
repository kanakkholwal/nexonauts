import { error } from "@sveltejs/kit";
import { getPostBySlug } from "$lib/blog/actions";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const { post, success } = await getPostBySlug(params.slug);
	if (!post || !success) throw error(404, "Post not found.");

	setHeaders({ "cache-control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" });

	return {
		post,
		meta: {
			title: post.title,
			description: post.description
		}
	};
};
