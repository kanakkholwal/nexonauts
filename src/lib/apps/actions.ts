"use server";
import mongoose from "mongoose";
import dbConnect from "src/lib/dbConnect";
import AppModel, {
    AppTypeWithId
} from "src/models/app";


export async function getAppByAppId(appId: string, developerId: string): Promise<AppTypeWithId | null> {
    await dbConnect();
    const app = await AppModel.findOne({
        appId: appId,
        "developer.userId": new mongoose.Types.ObjectId(developerId)
    }).exec();
    return JSON.parse(JSON.stringify(app));
}