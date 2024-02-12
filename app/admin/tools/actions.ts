"use server";
// import mongoose from "mongoose";
import dbConnect from "src/lib/dbConnect";
import PublicTool from "src/models/tool";


export async function getTools(query: string, currentPage: number, filter: {
    [key: string]: any
}) {
    const resultsPerPage = 50;
    const skip = currentPage * resultsPerPage - resultsPerPage;
    const filterQuery = {
        $or: [
            { "name": { $regex: query, $options: "i" } },
            { "slug": { $regex: query, $options: "i" } },
            { "description": { $regex: query, $options: "i" } },
            { "categories": { $regex: query, $options: "i" } },
        ],
    } as unknown as any;
    await dbConnect();
    const tools = await PublicTool.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(resultsPerPage)
        .select("name slug coverImage link updatedAt status verified pricing_type")
        .exec();
    const totalPages = Math.ceil((await PublicTool.countDocuments({})) / resultsPerPage);

    return { tools: JSON.parse(JSON.stringify(tools)), totalPages }

    // const resultsPerPage = 32;
    // const skip = currentPage * resultsPerPage - resultsPerPage;
    // const filterQuery = {
    //     $or: [
    //         { "name": { $regex: query, $options: "i" } },
    //         { "slug": { $regex: query, $options: "i" } },
    //         { "description": { $regex: query, $options: "i" } },
    //         { "categories": { $regex: query, $options: "i" } },
    //     ],
    // } as unknown as any;
    // await dbConnect();
    // const tools = await PublicTool.find({
    // }).skip(skip)
    //     .limit(resultsPerPage)
    //     .select("name slug coverImage link createdAt status verified pricing_type")
    //     .exec();
    // const totalPages = Math.ceil((await PublicTool.countDocuments(filterQuery)) / resultsPerPage);

    // return { tools: JSON.parse(JSON.stringify(tools)), totalPages }
}
