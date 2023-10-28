import App, { Usage } from "models/app";
import User from "models/user";
import mongoose from "mongoose";

export const DEV_VIEW_KEYS = "name shortDescription description appId type path coverImage recommended version ratings membership categories tags developer createdAt averageRating";
export const PUBLIC_VIEW_KEYS = "name shortDescription description appId type path coverImage recommended version ratings membership categories tags developer createdAt averageRating";
export const ADMIN_VIEW_KEYS = "name shortDescription description appId type path coverImage recommended version ratings membership categories tags developer createdAt averageRating";
export const PUBLIC_RUN_KEYS = "name shortDescription description appId type path coverImage recommended version ratings membership categories tags developer createdAt averageRating formFlow";
export const DEV_EDIT_KEYS = "name shortDescription description appId type path coverImage categories version tags membership formFlow config";
export const ADMIN_EDIT_KEYS = "name shortDescription description appId type path coverImage categories version tags membership formFlow config";


export async function getAppsOfUser(userId: string, options?: Record<string, any> | null) {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
        console.log("User not found!");
        return {
            sucess: false,
            message: 'User not found!',
            apps: []
        }
    }
    const userApps = await App.find({
        "developer.userId": existingUser._id,
        ...options
    }).exec()
    if (!userApps) {
        console.log("No apps found!");
        return {
            sucess: false,
            message: 'No apps found!',
            apps: []
        }
    }

    return {
        sucess: true,
        message: 'Apps found!',
        apps: userApps
    }
}
export async function getAppOfUserByAPPID(userId: string, appId: string, options?: Record<string, any> | null) {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
        console.log("User not found!");
        return {
            sucess: false,
            message: 'User not found!',
            app: null
        }
    }
    const app = await App.findOne({
        "developer.userId": existingUser._id,
        appId: appId,
        ...options
    }).lean().exec()
    if (!app) {
        console.log("No app found!");
        return {
            sucess: false,
            message: 'No apps found!',
            app: null
        }
    }

    return {
        sucess: true,
        message: 'Apps found!',
        app: app
    }
}
export async function getUsageByUser(userId: string) {

    const allUsage = await Usage.aggregate([
        {
            $match: {
                "usage.userId": new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $unwind: "$usage"
        },
        {
            $match: {
                "usage.userId": userId
            }
        },
        {
            $group: {
                _id: "$usage.userId",
                usages: {
                    $push: "$usage"
                }
            }
        }
    ]).exec()
    if (!allUsage) {
        console.log("No usage found!");
        return {
            sucess: false,
            message: 'No usage found!',
            usages: []
        }
    }
    return {
        sucess: true,
        message: 'Usage found!',
        usages: allUsage
    }

}
export async function getUsageByUserAndAppId(userId: string, appId: string) {

    const allUsage = await Usage.aggregate([
        {
            $match: {
                "usage.userId": new mongoose.Types.ObjectId(userId),
                "usage.appId": new mongoose.Types.ObjectId(appId)
            }
        },
        {
            $unwind: "$usage"
        },
        {
            $match: {
                "usage.userId": userId,
                "usage.appId": appId
            }
        },
        {
            $group: {
                _id: "$usage.userId",
                usages: {
                    $push: "$usage"
                }
            }
        }
    ]).exec();
    if (!allUsage) {
        console.log("No usage found!");
        return {
            sucess: false,
            message: 'No usage found!',
            usages: []
        }
    }
    return {
        sucess: true,
        message: 'Usage found!',
        usages: allUsage
    }
}
export async function getAllApps(LIMIT = 5) {

    const [allApps, allPopularApps] = await Promise.allSettled([
        App.find({
            isPublic: true, status: "published"
        }).select(PUBLIC_VIEW_KEYS)
        .exec(),
        App.find({
            enabled: true, state: "published"
        }).sort({ recommended: -1, usage: -1, ratings: -1 })
            .select(PUBLIC_VIEW_KEYS)
            .limit(LIMIT)
        ]);
    
        return {
            apps: allApps.status === "fulfilled" ? allApps.value ?? [] : [],
            popularApps: allPopularApps.status === "fulfilled" ? allPopularApps.value ?? [] : []
        }


}