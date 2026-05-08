"use server";
import dbConnect from "src/lib/db";
import Profile from "src/models/profile";
import User from "src/models/user";
import { Session } from "~/auth";
import { getSession } from "~/auth/server";


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
    const session = (await getSession()) as Session;
    await dbConnect();
    const user = await User.findById(session.user.id).select(
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
      user: user.id,
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
  } catch (e: any) {
    console.log(e);
    return Promise.reject({
      success: false,
      message: e?.message,
      data: null,
    });
  }
}
