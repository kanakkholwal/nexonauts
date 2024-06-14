"use server";

import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { sessionType } from "src/types/session";

import { revalidatePath } from "next/cache";
import dbConnect from "src/lib/dbConnect";
import { INTEGRATION_CONFIG } from "src/lib/integrations";
import User from "src/models/user";

export async function getUserIntegrationData(platform: string) {
  const session = (await getServerSession(authOptions)) as sessionType;
  // connect to the database and get the user integrations data
  await dbConnect();
  const user = await User.findById(session.user._id)
    .select(`integrations.${platform}`)
    .exec();
  const integrationData = JSON.parse(
    JSON.stringify(user.integrations[platform])
  );
  return integrationData;
}
export async function saveAccessToken(
  options: Record<string, any>,
  platform: string
) {
  "use server";
  try {
    const integrationConfig = INTEGRATION_CONFIG[platform];

    const session = (await getServerSession(authOptions)) as sessionType;

    const integrationData = await getUserIntegrationData(platform);

    if (integrationData.integrated) {
      return Promise.reject("Integration already connected");
    }

    integrationConfig.required.forEach((key) => {
      if (!options[key]) {
        return Promise.reject(`Missing required parameter: ${key}`);
      }
    });
    const data = await integrationConfig.saveToken(options);
    console.log("Data", data);

    revalidatePath(`/settings/integrations/${platform}`, "page");
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(false);
  }
}
export async function revokeToken(platform: string) {
  "use server";
  try {
    const session = (await getServerSession(authOptions)) as sessionType;

    const integrationData = await getUserIntegrationData(platform);

    if (!integrationData.integrated) {
      return Promise.reject("Integration not connected");
    }

    const user = await User.findById(session.user._id)
      .select(`integrations.${platform}`)
      .exec();
    user.integrations[platform].integrated = false;
    user.integrations[platform].access_token = null;
    user.integrations[platform].lastAuthorized = null;
    await user.save();
    revalidatePath(`/settings/integrations/${platform}`, "page");
    return Promise.resolve(true);
  } catch (e) {
    console.error(e);
    return Promise.reject(false);
  }
}
