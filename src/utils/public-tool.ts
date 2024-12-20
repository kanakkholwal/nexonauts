import PublicTool from "src/models/tool";

export async function getAllPublicTools() {
  const tools = await PublicTool.find({
    status: "published",
  })
    .select("slug createdAt")
    .sort({ createdAt: -1 })
    .lean();
  return tools;
}
