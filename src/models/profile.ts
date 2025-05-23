import mongoose, { type Document, Schema, Types } from "mongoose";

export type ProfileType = {
  user: string;
  username: string;
  bio: string;
  socials: {
    name: string;
    url: string;
  }[];
  interests: string[];
};

export type ProfileTypeWithId = ProfileType & {
  _id: string;
};
export type ProfileTypeWithIdUser = Omit<ProfileTypeWithId, "user"> & {
  user: {
    _id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
  _id: string;
};

interface Profile extends Document {
  user: Types.ObjectId;
  username: string;
  bio: string;
  socials: {
    name: string;
    url: string;
  }[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  interests: string[];
}

const profileSchema = new Schema<Profile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      required: true,
      default: "",
    },
    socials: {
      type: [
        {
          name: String,
          url: String,
        },
      ],
      default: [],
    },
    followers: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
    following: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
    interests: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
//

// profileSchema.index({ username: 1 });

profileSchema.methods.followUnfollowUser = async function (profileId: string) {
  try {
    const profileToFollow = await this.model("Profile").findById(profileId);
    if (!profileToFollow) {
      throw new Error("Profile not found");
    }

    const isFollowing = this.following.includes(profileId);

    if (isFollowing) {
      // Unfollow
      this.following = this.following.filter(
        (id: Types.ObjectId) => id.toString() !== profileId.toString()
      );
      profileToFollow.followers = profileToFollow.followers.filter(
        (id: Types.ObjectId) => id.toString() !== this._id.toString()
      );
    } else {
      // Follow
      this.following.push(profileId);
      profileToFollow.followers.push(this._id);
    }

    await Promise.all([this.save(), profileToFollow.save()]);

    return {
      success: true,
      message: isFollowing
        ? "Unfollowed successfully"
        : "Followed successfully",
    };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "An error occurred" };
  }
};
profileSchema.statics.findCommonFollowers = async function (
  profileId1: Types.ObjectId,
  profileId2: Types.ObjectId
): Promise<Types.ObjectId[]> {
  const profile1 = await this.findById(profileId1)
    .select("followers")
    .lean()
    .exec();
  const profile2 = await this.findById(profileId2)
    .select("followers")
    .lean()
    .exec();

  if (!profile1 || !profile2) {
    throw new Error("One or both profiles not found.");
  }

  const commonFollowers = profile1.followers.filter(
    (follower: Types.ObjectId) => profile2.followers.includes(follower)
  );

  return commonFollowers;
};
profileSchema.statics.findCommonFollowing = async function (
  profileId1: Types.ObjectId,
  profileId2: Types.ObjectId
): Promise<Types.ObjectId[]> {
  const profile1 = await this.findById(profileId1)
    .select("following")
    .lean()
    .exec();
  const profile2 = await this.findById(profileId2)
    .select("following")
    .lean()
    .exec();

  if (!profile1 || !profile2) {
    throw new Error("One or both profiles not found.");
  }

  const commonFollowing = profile1.following.filter(
    (following: Types.ObjectId) => profile2.following.includes(following)
  );

  return commonFollowing;
};
profileSchema.statics.findCommonFollowersFollowing = async function (
  profileId1: Types.ObjectId,
  profileId2: Types.ObjectId
): Promise<Types.ObjectId[]> {
  const profile1 = await this.findById(profileId1)
    .select("followers following")
    .lean()
    .exec();
  const profile2 = await this.findById(profileId2)
    .select("followers following")
    .lean()
    .exec();

  if (!profile1 || !profile2) {
    throw new Error("One or both profiles not found.");
  }

  const commonFollowersFollowing = profile1.followers.filter(
    (follower: Types.ObjectId) => profile2.following.includes(follower)
  );

  return commonFollowersFollowing;
};
const Profile =
  mongoose.models.Profile || mongoose.model<Profile>("Profile", profileSchema);
export default Profile;
