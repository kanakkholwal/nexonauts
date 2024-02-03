"use server";
import PublicTool, { PublicToolTypeWithId } from 'src/models/tool';
import dbConnect from "lib/dbConnect";

export async function getPublicToolBySlug(slug: string): Promise<PublicToolTypeWithId> {
    await dbConnect();
    const tool = await PublicTool.findOne({ slug, status: "published" || "approved" });
    return JSON.parse(JSON.stringify(tool));
}
export async function getSimilarTools(categories: PublicToolTypeWithId["categories"]): Promise<PublicToolTypeWithId[]> {
    await dbConnect();
    const tools = await PublicTool.find({
        'categories.slug': { $in: categories.map(category => category.slug) },
        status: { $in: ["published", "approved"] }
    }).limit(6);
    return JSON.parse(JSON.stringify(tools));
}