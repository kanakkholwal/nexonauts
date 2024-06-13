'use server';
import { ProfileTypeWithIdUser } from 'src/models/profile';

import { revalidatePath } from 'next/cache';
import dbConnect from 'src/lib/dbConnect';
import Profile from 'src/models/profile';

type updateAbleData = {
  bio: string;
  socials: {
    name: string;
    url: string;
  }[];
  interests: string[];
};

export type updateProfileInput = {
  username: string;
  data: Partial<updateAbleData>;
};

export async function updateProfile({ username, data }: updateProfileInput) {
  try {
    await dbConnect();

    const profile = await Profile.findOneAndUpdate(
      {
        username: username,
      },
      {
        $set: data,
      },
      { new: true }
    );
    return JSON.parse(JSON.stringify(profile));
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    revalidatePath(`/settings/profile`);
    revalidatePath(`/devs/${username}`);
  }
}

export async function getProfile(
  profileId: string
): Promise<ProfileTypeWithIdUser | null> {
  try {
    await dbConnect();

    const profile = await Profile.findById(profileId)
      .populate('user', 'name username profilePicture')
      .exec();
    return JSON.parse(JSON.stringify(profile));
  } catch (err) {
    console.log(err);
    return null;
  }
}
