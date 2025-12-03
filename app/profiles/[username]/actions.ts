import { revalidatePath } from "next/cache";
import { Session } from "src/auth";
import dbConnect from "src/lib/db";
import ProfileModel from "src/models/profile";
import UserModel from "src/models/user";
import { getSession } from "~/auth/server";


export async function getProfile(username: string) {
  await dbConnect();
  const profile = await ProfileModel.findOne({ username: username })
    .populate("user", "username name profilePicture")
    .populate("following", "username name profilePicture")
    .populate("followers", "username name profilePicture")
    .exec();
  if (!profile) {
    return null;
  }
  return Promise.resolve(JSON.parse(JSON.stringify(profile)));
}

export type ProfileType = Awaited<ReturnType<typeof getProfile>>;

export async function followUnFollowProfile(username: string) {
  "use server";

  try {
    const session = (await getSession()) as Session | null;
    if (!session) {
      return Promise.reject({
        isFollowing: false,
        message: "Not authenticated",
      });
    }
    if (session.user.username === username) {
      return Promise.reject({
        success: false,
        message: "You can't follow yourself",
      });
    }
    if (!session.user.emailVerified) {
      return Promise.reject({
        success: false,
        message: "You need to verify your account to follow users",
      });
    }
    if (!session.user.profile) {
      return Promise.reject({
        success: false,
        message: "You need to create a profile to follow users",
      });
    }

    await dbConnect();
    const profile = await ProfileModel.findOne({ username: username }).exec();
    if (!profile) {
      return Promise.reject({
        success: false,
        message: "Requested profile not found",
      });
    }

    const currentUser = await UserModel.findById(session.user.id).exec();
    if (!currentUser) {
      return Promise.reject({
        success: false,
        message: "Your account not found",
      });
    }
    const currentProfile = await ProfileModel.findById(
      session.user.profile
    ).exec();
    if (!currentProfile) {
      return Promise.reject({
        success: false,
        message: "Your profile not found",
      });
    }

    const data = await currentProfile.followUnfollowUser(profile._id);
    if (data.success) {
      revalidatePath(`/devs/${username}`);
      revalidatePath(`/devs/${session.user.username}`);
    } else {
      console.error(data?.message);
      return Promise.reject(data?.message);
    }
  } catch (err: any) {
    console.log(err);
    return Promise.reject(err?.message || "An error occurred");
  }
}

export async function getRepoByUserName(username: string) {
  await dbConnect();

  const developer = await UserModel.findOne({
    username: username,
    verified: true,
    private: false,
  })
    .select("integrations.github")
    .exec();
  if (developer.integrations.github.integrated === false) {
    return Promise.resolve({
      integrated: false,
      message: "Github integration not found",
      repos: [],
    });
  }
  const access_token = developer.integrations.github.access_token;
  const response = await fetch(`https://api.github.com/user/repos`, {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const repos = await response.json();

  return {
    integrated: true,
    repos: FilterRepos(repos),
  };
}
function FilterRepos(repos: any[]) {
  return repos
    .filter(
      (repo: any) =>
        !repo.private &&
        repo.visibility === "public" &&
        !repo.fork &&
        !repo.archived &&
        !repo.disabled &&
        !repo.mirror_url &&
        repo.permissions.push &&
        repo.permissions.pull &&
        repo.permissions.maintain
    )
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .sort((a, b) => b.updated_at - a.updated_at);
}

function SanatizeRepositiory(repo: any) {}
