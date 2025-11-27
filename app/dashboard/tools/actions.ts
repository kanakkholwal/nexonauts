"use server";
import { getSession } from "src/lib/auth";
// import mongoose from "mongoose";
import dbConnect from "src/lib/db";
import PublicTool, { PublicToolTypeWithId } from "src/models/tool";
import { sessionType } from "src/types/session";

export async function getToolsByUser(offset: number, limit: number) {
  const session = (await getSession()) as sessionType;

  await dbConnect();
  const tools = await PublicTool.find({
    author: session.user._id,
  })
    .select("name slug status coverImage verified author updatedAt")
    .skip(offset)
    .limit(limit)
    .sort({ updatedAt: -1 })
    .lean<Partial<PublicToolTypeWithId>[]>();

  return JSON.parse(JSON.stringify(tools));
}
