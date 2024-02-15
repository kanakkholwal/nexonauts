"use server";
import dbConnect from "lib/dbConnect";
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import PublicTool, { IPublicTool, PublicToolTypeWithId } from 'src/models/tool';
import ToolRating, { RatingTypeWithId, rawRatingType } from 'src/models/tool-rating';



export async function getPublicToolBySlug(slug: string): Promise<PublicToolTypeWithId> {
    await dbConnect();
    const tool = await PublicTool.findOne({ slug, status: "published" || "approved" });
    return JSON.parse(JSON.stringify(tool));
}
export async function getSimilarTools(categories: PublicToolTypeWithId["categories"]): Promise<Partial<PublicToolTypeWithId>[]> {
    await dbConnect();
    const tools = await PublicTool.find({
        'categories.slug': { $in: categories.map(category => category.slug) },
        status: { $in: ["published", "approved"] }
    })
    .sort({ createdAt: -1 })
    .select('name slug coverImage categories pricing_type')
    .limit(6);
    return JSON.parse(JSON.stringify(tools));
}
export async function getRatingsAndReviews(id: string) {
    await dbConnect();
    const ratings = await ToolRating.find({ toolId: id })
    .sort({ createdAt: -1 })
    .select('rating comment createdAt')
    .populate('userId', 'name username profilePicture')
    .limit(5);
    return JSON.parse(JSON.stringify(ratings));
}
export async function postRatingAndReview(data: rawRatingType):Promise<RatingTypeWithId> {
    await dbConnect();
    const rating = new ToolRating(data);
    await rating.save();
    return JSON.parse(JSON.stringify(rating));
}
export async function toggleBookmark(toolId: string, userId: string) {
    if (!userId || !toolId) {
        return Promise.reject("Invalid user or tool");
    }
    await dbConnect();
    const tool = await PublicTool.findById(toolId) as IPublicTool;
    if (!tool) {
        return Promise.reject("Invalid tool");
    } 
    // Ensure tool.bookmarks is initialized as an empty array
    if (!tool.bookmarks) {
        tool.bookmarks = [];
    }

    const userIdObj = new mongoose.Types.ObjectId(userId);
    if (tool.bookmarks.includes(userIdObj)) {
        tool.bookmarks = tool.bookmarks.filter((id) => id !== userIdObj);
        await tool.save();
        revalidatePath(`/toolzen/tools/${tool.slug}`,"page");
        return Promise.resolve(false);
    } else {
        tool.bookmarks.push(userIdObj);
        await tool.save();
        revalidatePath(`/toolzen/tools/${tool.slug}`,"page");
        return Promise.resolve(true);
    }
}