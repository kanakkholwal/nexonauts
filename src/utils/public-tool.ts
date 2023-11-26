import PublicTool from "models/public-tool";

export async function getAllPublicTools() {
    const tools = await PublicTool.find({
        status: "published",
    }).select("slug createdAt").sort({ createdAt: -1 });
    return tools;
}
