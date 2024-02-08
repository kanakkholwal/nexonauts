"use server";
// import mongoose from "mongoose";
import dbConnect from "src/lib/dbConnect";
import Message from "src/models/message";


export async function getMessages(query: string, currentPage: number, filter: {
    [key: string]: any
}) {

    const resultsPerPage = 32;
    const skip = currentPage * resultsPerPage - resultsPerPage;
    const filterQuery = {
        $or: [
            { "name": { $regex: query, $options: "i" } },
            { "email": { $regex: query, $options: "i" } },
            { "message": { $regex: query, $options: "i" } },
            { "type": { $regex: query, $options: "i" } },
        ],
    } as unknown as any;
    await dbConnect();
    const messages = await Message.find({
    }).sort({ createdAt: -1 })
    .skip(skip)
        .limit(resultsPerPage)
        .select("name email message type read createdAt")
        .exec();
    const totalPages = Math.ceil((await Message.countDocuments(filterQuery)) / resultsPerPage);

    return { messages: JSON.parse(JSON.stringify(messages)), totalPages }
}