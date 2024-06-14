"use server";
import dbConnect from "src/lib/dbConnect";
import Profile from "src/models/profile";
import User from "src/models/user";
import { sessionType } from "src/types/session";
import { getSession } from "src/lib/auth";

export async function createProfile(payload: {
  username: string;
  bio: string;
  socials: {
    name: string;
    url: string;
  }[];
  interests: string[];
}) {
  try {
    const session = (await getSession()) as sessionType;
    await dbConnect();
    const user = await User.findById(session.user._id).select(
      "profile username"
    );
    if (!user) {
      return Promise.reject({
        success: false,
        message: "User not found",
      });
    }
    const existingProfile = await Profile.findOne({
      username: payload.username,
    });
    if (existingProfile) {
      return Promise.reject({
        success: false,
        message: "Profile already exists",
      });
    }
    const profile = new Profile({
      user: user._id,
      username: payload.username,
      bio: payload.bio,
      socials: payload.socials,
      interests: payload.interests,
    });
    await profile.save();
    user.profile = profile._id;
    user.username = payload.username;
    await user.save();
    // revalidatePath(`/onboarding/profile`,"page")
    return Promise.resolve({
      success: true,
      message: "Profile created successfully",
      data: JSON.parse(JSON.stringify(profile)),
    });
  } catch (e) {
    console.log(e);
    return Promise.reject({
      success: false,
      message: e.message,
      data: null,
    });
  }
}
