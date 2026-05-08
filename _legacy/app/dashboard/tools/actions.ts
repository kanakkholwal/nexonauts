"use server";
import { getSession } from "~/auth/server";
// import mongoose from "mongoose";
import dbConnect from "src/lib/db";
import PublicTool, { PublicToolTypeWithId } from "src/models/tool";
import { Session } from "src/auth";


export async function getToolsByUser(offset: number, limit: number) {
  const session = (await getSession()) as Session;

  await dbConnect();
  const tools = await PublicTool.find({
    author: session.user.id,
  })
    .select("name slug status coverImage verified author updatedAt")
    .skip(offset)
    .limit(limit)
    .sort({ updatedAt: -1 })
    .lean<Partial<PublicToolTypeWithId>[]>();

  return JSON.parse(JSON.stringify(tools));
}
