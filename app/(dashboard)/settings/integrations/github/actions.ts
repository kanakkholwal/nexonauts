"use server";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import axios from "axios";
import dbConnect from "lib/dbConnect";
import { getServerSession } from "next-auth/next";
import UserModel from "src/models/user";
import { sessionType } from "src/types/session";



export async function saveAccessToken(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const dataBody = {
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        redirect_uri: process.env.NEXTAUTH_URL + "settings/integrations/github",
        code,
    }

    const response = await axios.post(url, dataBody, {
        headers: {
            'Accept': 'application/json',
        },
    });
    const data = response.data

    // Parse the response string as URLSearchParams
    const params = new URLSearchParams(data);
    console.log(response.data);
    // Data access_token=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&scope=repo%2Cuser&token_type=bearer
    // extract access_token from data



    if (!data.access_token) {
        return Promise.reject("Error getting token");
    }

    const session = await getServerSession(authOptions) as sessionType
    await dbConnect();
    const user = await UserModel.findById(session.user._id).select('integrations').exec();
    console.log("User", user);
    if (!user) {
        return Promise.reject("User not found");
    }
    if (!user.integrations) {
        user.integrations = {};
        user.integrations.github = {}
    }
    user.integrations.github = {
        access_token: data.access_token,
        lastAuthorized: new Date().toISOString(),
        scope: data.scope,
        integrated: true
    }
    await user.save();
    console.log("Token saved");

    return Promise.resolve(data);


}

export async function fetchRepositories(accessToken) {
    try {
        // Make a GET request to GitHub API's /user/repos endpoint
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/vnd.github.v3+json', // Specify version of the API
            },
        });

        // Return the list of repositories from the response data
        return Promise.resolve(response.data.filter(repo => !repo.fork && !repo.archived && !repo.disabled && !repo.private))
    } catch (error) {
        console.error('Error fetching repositories:', error.response.data);
        // Return null or handle the error as needed
        return Promise.reject(error.response.data);
    }
}