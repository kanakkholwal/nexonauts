import { error, fail } from "@sveltejs/kit";
import { followUnfollowProfile, getProfile } from "$lib/server/profiles";
import type { Actions, PageServerLoad } from "./$types";

type FollowerRef = {
	_id: string;
};

export const load: PageServerLoad = async ({ params, locals }) => {
	const developer = await getProfile(params.username);
	if (!developer) error(404, "Profile not found.");

	const sessionUser = locals.session?.user;
	const isOwner = sessionUser?.username === developer.username;
	const followers: FollowerRef[] = Array.isArray(developer.followers)
		? (developer.followers as FollowerRef[])
		: [];
	const isFollowing =
		(sessionUser?.profile && followers.some((follower) => follower._id === sessionUser.profile)) ??
		false;

	return {
		developer,
		isOwner,
		isFollowing,
		meta: {
			title: `${developer.user?.name ?? developer.username}'s profile`,
			description: developer.bio ?? `Profile of @${developer.username}`
		}
	};
};

export const actions: Actions = {
	follow: async ({ params, locals }) => {
		const sessionUser = locals.session?.user;
		if (!sessionUser) return fail(401, { message: "Not authenticated" });
		if (sessionUser.username === params.username) {
			return fail(400, { message: "You can't follow yourself" });
		}
		if (!sessionUser.emailVerified) {
			return fail(403, { message: "Verify your account to follow users" });
		}
		if (!sessionUser.profile) {
			return fail(403, { message: "Create a profile before following users" });
		}

		const result = await followUnfollowProfile(
			sessionUser.id,
			sessionUser.profile,
			params.username
		);
		if (!result.success) return fail(400, { message: result.message });
		return { success: true, message: result.message };
	}
};
