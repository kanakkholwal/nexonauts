"use server";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import dbConnect from "src/lib/dbConnect";
import UserModel from "src/models/user";
import { sessionType } from "src/types/session";


export async function followUnfollowUser(username: string) {
    try {
        const session = await getServerSession(authOptions) as sessionType | null;
        if (!session) {
            return Promise.reject({
                isFollowing: false,
                message: "Not authenticated"
            });
        }
        console.log("user logged in , ")

        await dbConnect();
        const user = await UserModel.findOne({ username: username }).exec();
        if (!user) {
            return Promise.reject({
                success: false,
                message: "User not found"
            });
        }
        console.log("user found , ")
        const currentUser = await UserModel.findById(session.user._id).exec();
        if (!currentUser) {
            return Promise.reject({
                success: false,
                message: "User not found"
            });
        }
        console.log("current user found , ")
        const data = await currentUser.followUnfollowUser(user._id)
        console.error(data.message)
        revalidatePath(`/devs/${username}`);

        return Promise.resolve(data);
    }catch(err){
        console.log(err);
        return Promise.reject({
            success: false,
            message: "An error occured"
        });
    }
    
}

export async function getRepoByUserName(username: string) {
    await dbConnect();

    const developer = await UserModel.findOne({ username: username, verified: true, private: false })
        .select('integrations.github')
        .exec();
    if (developer.integrations.github.integrated === false) {
        return Promise.resolve({
            integrated: false,
            message: "Github integration not found",
            repos: []
        });
    }
    const access_token = developer.integrations.github.access_token;
    const response = await fetch(`https://api.github.com/user/repos`, {
        headers: {
            Authorization: `token ${access_token}`
        }
    });
    const repos = await response.json();

    return {
        integrated: true,
        repos: FilterRepos(repos)
    };

}
function FilterRepos(repos: any[]) {
    return repos.filter((repo: any) =>
        !repo.private && repo.visibility === "public" && !repo.fork && !repo.archived && !repo.disabled &&
        !repo.mirror_url && (repo.permissions.push && repo.permissions.pull && repo.permissions.maintain)
    ).sort((a, b) => b.stargazers_count - a.stargazers_count).sort((a, b) => b.updated_at - a.updated_at)

}

function SanatizeRepositiory(repo: any) {


}
