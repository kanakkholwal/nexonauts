"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import mongoose from "mongoose";
import dbConnect from "src/lib/dbConnect";
import PublicTool from "src/models/tool";

export async function getToolBySlug(slug: string) {
  await dbConnect();
  const tool = await PublicTool.findOne({ slug }).exec();
  if (!tool)
    return {
      tool: null,
      available_categories: [],
    };
  const categories = await PublicTool.aggregate([
    { $unwind: "$categories" },
    {
      $group: {
        _id: "$categories.slug",
        name: { $first: "$categories.name" },
        slug: { $first: "$categories.slug" },
      },
    },
    { $project: { _id: 0, name: 1, slug: 1 } },
    //  sort by name
    { $sort: { name: 1 } },
  ]);
  return {
    tool: JSON.parse(JSON.stringify(tool)),
    available_categories: JSON.parse(JSON.stringify(categories)),
  };
}

export async function updateTool(id: string, data: Record<string, any>) {
  try {
    await dbConnect();
    const tool = await PublicTool.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).exec();
    revalidatePath("/admin/tools/" + id + "/edit");
    revalidatePath("/admin/tools/" + id);
    return Promise.resolve(true);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
export async function deleteTool(id: string) {
  try {
    await dbConnect();
    await PublicTool.findByIdAndDelete(id).exec();
    return redirect("/admin/tools");
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  } finally {
    revalidatePath("/admin/tools");
  }
}
