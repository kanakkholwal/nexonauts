"use server";
// import mongoose from "mongoose";
import dbConnect from "src/lib/dbConnect";
import PublicTool from "src/models/tool";


export async function getToolById(id: string) {
    
    await dbConnect();
    const tool = await PublicTool.findById(id).exec();
    return JSON.parse(JSON.stringify(tool));
}
