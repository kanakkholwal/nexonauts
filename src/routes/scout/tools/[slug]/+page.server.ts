import { error, fail } from "@sveltejs/kit";
import { appConfig } from "@root/project.config";
import {
	getScoutRatingsAndReviews,
	getScoutSimilarTools,
	getScoutToolBySlug,
	postScoutRatingAndReview,
	toggleScoutBookmark
} from "$lib/server/scout";
import type { Actions, PageServerLoad } from "./$types";
import { decodeHTMLEntities } from "src/utils/string";

function getAverageRating(ratings: Array<{ rating: number }>) {
	if (ratings.length === 0) return 0;
	const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
	return total / ratings.length;
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const tool = await getScoutToolBySlug(params.slug, { incrementView: true });
	if (!tool) error(404, "Tool not found.");

	const [ratings, similarTools] = await Promise.all([
		getScoutRatingsAndReviews(tool._id, { limit: 5 }),
		getScoutSimilarTools(tool)
	]);

	const sessionProfile = locals.session?.user?.profile;

	return {
		tool,
		ratings,
		similarTools,
		averageRating: getAverageRating(ratings),
		reviewCount: ratings.length,
		hasSession: Boolean(locals.session?.user),
		canReview: Boolean(locals.session?.user?.emailVerified && locals.session?.user?.profile),
		isBookmarked:
			Boolean(sessionProfile) &&
			(tool.bookmarks ?? []).some((bookmark) => String(bookmark) === sessionProfile),
		meta: {
			title: `${decodeHTMLEntities(tool.name)} - Review & Pricing`,
			description: tool.description.slice(0, 160),
			url: `${appConfig.url}/scout/tools/${tool.slug}`
		}
	};
};

export const actions: Actions = {
	bookmark: async ({ params, locals }) => {
		const sessionUser = locals.session?.user;
		if (!sessionUser) return fail(401, { action: "bookmark", message: "Sign in to save tools." });
		if (!sessionUser.profile) {
			return fail(403, { action: "bookmark", message: "Create a profile before saving tools." });
		}

		const tool = await getScoutToolBySlug(params.slug, { incrementView: false });
		if (!tool) return fail(404, { action: "bookmark", message: "Tool not found." });

		const isBookmarked = await toggleScoutBookmark(tool._id, sessionUser.profile);
		return {
			action: "bookmark",
			success: true,
			message: isBookmarked ? "Tool saved to your bookmarks." : "Tool removed from your bookmarks."
		};
	},
	review: async ({ request, params, locals }) => {
		const sessionUser = locals.session?.user;
		if (!sessionUser) return fail(401, { action: "review", message: "Sign in to post a review." });
		if (!sessionUser.emailVerified) {
			return fail(403, { action: "review", message: "Verify your account before posting reviews." });
		}
		if (!sessionUser.profile) {
			return fail(403, { action: "review", message: "Create a profile before posting reviews." });
		}

		const formData = await request.formData();
		const rating = Number(formData.get("rating") ?? "0");
		const comment = String(formData.get("comment") ?? "").trim();

		if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
			return fail(400, { action: "review", message: "Choose a rating between 1 and 5." });
		}
		if (comment.length < 10) {
			return fail(400, { action: "review", message: "Review comments must be at least 10 characters." });
		}
		if (comment.length > 500) {
			return fail(400, { action: "review", message: "Review comments must stay under 500 characters." });
		}

		const tool = await getScoutToolBySlug(params.slug, { incrementView: false });
		if (!tool) return fail(404, { action: "review", message: "Tool not found." });

		await postScoutRatingAndReview({
			toolId: tool._id,
			userId: sessionUser.profile,
			rating,
			comment
		});

		return {
			action: "review",
			success: true,
			message: "Review published."
		};
	}
};
