"use server";
// import mongoose from "mongoose";
import dbConnect from "src/lib/dbConnect";
import UserModel from "src/models/user";

// Function to count users and calculate percent growth
export async function getUsers(query: string, currentPage: number, filter: {
    [key: string]: any
}) {

    const resultsPerPage = 32;
    const skip = currentPage * resultsPerPage - resultsPerPage;
    const filterQuery = {
        $or: [
            { "name": { $regex: query, $options: "i" } },
            { "email": { $regex: query, $options: "i" } },
            { "username": { $regex: query, $options: "i" } },
            { "role": { $regex: query, $options: "i" } },
        ],
    } as unknown as any;
    await dbConnect();
    const users = await UserModel.find({
    }).skip(skip)
        .limit(resultsPerPage)
        .select("name email username role createdAt verified")
        .exec();
    const totalPages = Math.ceil((await UserModel.countDocuments(filterQuery)) / resultsPerPage);

    return { users: JSON.parse(JSON.stringify(users)), totalPages }
}
