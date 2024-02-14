"use server";
import dbConnect from "lib/dbConnect";
import PublicTool, { PublicToolTypeWithId } from 'src/models/tool';
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
    const ratings = await ToolRating.find({ toolId: id });
    return JSON.parse(JSON.stringify(ratings));
}
export async function postRatingAndReview(data: rawRatingType):Promise<RatingTypeWithId> {
    await dbConnect();
    const rating = new ToolRating(data);
    await rating.save();

    return JSON.parse(JSON.stringify(rating));
}