import dbConnect from "$lib/db";
import ProfileModel from "src/models/profile";
import UserModel from "src/models/user";

export async function getProfiles(
	query: string,
	currentPage: number,
	perPage: number
) {
	const resultsPerPage = perPage || 32;
	const skip = currentPage * resultsPerPage - resultsPerPage;
	const filterQuery = {
		$or: [
			{ username: { $regex: query, $options: "i" } },
			{ "user.name": { $regex: query, $options: "i" } }
		]
	};
	await dbConnect();
	const profiles = await ProfileModel.find(filterQuery)
		.populate("user", "username name profilePicture")
		.populate("following", "username name profilePicture")
		.populate("followers", "username name profilePicture")
		.skip(skip)
		.limit(resultsPerPage)
		.exec();

	return JSON.parse(JSON.stringify(profiles));
}

export async function getProfile(username: string) {
	await dbConnect();
	const profile = await ProfileModel.findOne({ username })
		.populate("user", "username name profilePicture")
		.populate("following", "username name profilePicture")
		.populate("followers", "username name profilePicture")
		.exec();
	if (!profile) return null;
	return JSON.parse(JSON.stringify(profile));
}

export type ProfileType = Awaited<ReturnType<typeof getProfile>>;

export async function followUnfollowProfile(
	currentUserId: string,
	currentProfileId: string,
	targetUsername: string
): Promise<{ success: boolean; message: string }> {
	await dbConnect();
	const target = await ProfileModel.findOne({ username: targetUsername }).exec();
	if (!target) return { success: false, message: "Requested profile not found" };

	const currentUser = await UserModel.findById(currentUserId).exec();
	if (!currentUser) return { success: false, message: "Your account not found" };

	const currentProfile = await ProfileModel.findById(currentProfileId).exec();
	if (!currentProfile) return { success: false, message: "Your profile not found" };

	const result = await currentProfile.followUnfollowUser(target._id);
	return result?.success
		? { success: true, message: result.message ?? "Updated" }
		: { success: false, message: result?.message ?? "Could not update" };
}
