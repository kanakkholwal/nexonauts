"use server";
import { revalidatePath } from "next/cache";
// import mongoose from "mongoose";
import dbConnect from "src/lib/dbConnect";
import PublicTool from "src/models/tool";


export async function updateTool(id: string, data: Record<string, any>) {

    try {
        await dbConnect();
        const tool = await PublicTool.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        }).exec();
        revalidatePath('/admin/tools/' + id + '/edit');
        revalidatePath('/admin/tools/' + id);
        return Promise.resolve(JSON.parse(JSON.stringify(tool)));
    }
    catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}
