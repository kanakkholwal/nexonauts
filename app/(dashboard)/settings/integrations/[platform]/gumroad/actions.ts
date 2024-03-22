"use server";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import axios from "axios";
import dbConnect from "lib/dbConnect";
import { getServerSession } from "next-auth/next";
import UserModel from "src/models/user";
import { sessionType } from "src/types/session";

type optionsType = {
    scope: string;
    code: string;
    redirect_uri: string;
}


export async function saveAccessToken(options: optionsType) {
    const url = 'https://api.gumroad.com/oauth/token';

    const dataBody = {
        code: options.code,
        client_id: process.env.GUMROAD_APP_ID,
        client_secret: process.env.GUMROAD_APP_SECRET,
        redirect_uri: options.redirect_uri,
    }

    const response = await axios.post(url, dataBody);
    const data = response.data;

    if (!data.access_token) {
        return Promise.reject("Error saving token");
    }

    console.log("Data", data);
    const session = await getServerSession(authOptions) as sessionType
    await dbConnect();
    const user = await UserModel.findById(session.user._id).select('integrations').exec();
    console.log("User", user);
    if (!user) {
        return Promise.reject("User not found");
    }
    if (!user.integrations) {
        user.integrations = {};
        user.integrations.gumroad = {}
    }
    user.integrations.gumroad = {
        access_token: data.access_token,
        lastAuthorized: data.created_at,
        scope: options.scope,
        integrated: true

    }
    await user.save();
    console.log("Token saved");

    return Promise.resolve(data);


}