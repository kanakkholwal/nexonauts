"use server";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import dbConnect from "src/lib/dbConnect";
import Profile from "src/models/product";
import User from "src/models/user";
import { sessionType } from "src/types/session";

export async function createProfile(payload: {
    username: string;
    bio: string;
    socials: {
        name: string;
        url: string;
    }[];
    interests: string[];
}) {
    try{
        const session = await getServerSession(authOptions) as sessionType;
        await dbConnect();
        const user = await User.findById(session.user._id);
        if(!user){
            return Promise.reject({
                success: false,
                message: "User not found"
            })
        }
        const existingProfile = await Profile.findOne({username: payload.username});
        if(existingProfile){
            return Promise.reject({
                success: false,
                message: "Profile already exists"
            })
        }
        const profile = new Profile({
            username: payload.username,
            bio: payload.bio,
            socials: payload.socials,
            interests: payload.interests
        });
        await profile.save();
        user.profile = profile._id;
        user.username = payload.username;
        await user.save();
        return Promise.resolve({
            success: true,
            message: "Profile created successfully"
        })


    }catch(e){
        console.log(e)
        return Promise.reject({
            success: false,
            message: e.message
        })
    }


}

