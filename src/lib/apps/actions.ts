"use server";
import mongoose from "mongoose";
import dbConnect from "src/lib/dbConnect";
import AppModel, {
    AppReview,
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
export async function getPublicApps(query: string, currentPage: number, filter: {
    [key: string]: any
}) {
    const resultsPerPage = 32;
    const skip = currentPage * resultsPerPage - resultsPerPage;
    const filterQuery = {
        $or: [
            { "name": { $regex: query, $options: "i" } },
            { "description": { $regex: query, $options: "i" } },
            { "tags": { $regex: query, $options: "i" } },
            { "categories": { $regex: query, $options: "i" } },
        ],
    } as unknown as any;
    await dbConnect();
    const apps = await AppModel.find({
        status:"published"
    }).skip(skip)
    .limit(resultsPerPage)
    .exec();
    const totalPages = Math.ceil((await AppModel.countDocuments(filterQuery)) / resultsPerPage);

    
    return {apps:JSON.parse(JSON.stringify(apps)),totalPages}
}

export async function getAppBySlug(slug: string): Promise<AppTypeWithId | null> {
    await dbConnect();
    const app = await AppModel.findOne({
        slug: slug
    }).select("-config").exec();
    return JSON.parse(JSON.stringify(app));

}
export async function getAppReviews(appId: string, currentPage: number) {
    const resultsPerPage = 32;
    const skip = currentPage * resultsPerPage - resultsPerPage;
    await dbConnect();
    const reviews = await AppReview.findOne({
        appId: appId,
    })
    .populate('userId', 'name username profilePicture')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(resultsPerPage)
    .exec();
    const totalPages = Math.ceil((await AppReview.countDocuments({appId: appId})) / resultsPerPage);
    return {
        reviews:JSON.parse(JSON.stringify(reviews)),
        currentPage,totalPages
    }
}