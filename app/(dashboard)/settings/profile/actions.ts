"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "src/lib/dbConnect";
import Profile from "src/models/profile";

type updateAbleData = {
    bio: string;
    socials: {
        name: string;
        url: string;
    }[];
    interests: string[];
}

type updateProfileInput = {
    username: string,
    data: Partial<updateAbleData>,
}

export async function updateProfile({ username, data }: updateProfileInput) {
    try {
        await dbConnect();

        const profile = await Profile.findOneAndUpdate(
            {
                username: username
            },
            {
                $set: data
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

export async function getProfile(profileId: string){
    try {
        await dbConnect();

        const profile = await Profile.findById(profileId);
        return JSON.parse(JSON.stringify(profile));
    }
    catch(err){
        console.log(err);
        return null;
    }
}