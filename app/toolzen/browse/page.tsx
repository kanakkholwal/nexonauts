import Navbar from "app/layouts/navbar";
import dbConnect from "lib/dbConnect";
import { Metadata } from "next";
import PublicTool from 'src/models/tool';
import AiDirectory from "./comp";

export const metadata: Metadata = {
    title: "ToolZen - AI Tools, Services, and Resources",
    description: "ToolZen is a curated list of AI tools, services, and resources. Find the best AI tools for your business.",
}




export default async function Page() {
    await dbConnect();

    const tools = await PublicTool.find({ status: "published" || "approved" }).
        sort({ createdAt: -1 }).limit(10);
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
    ]);

    // PublicTool.distinct("pricing_type")
    const pricingTypes = await PublicTool.aggregate([
        { $match: { status: "published" || "approved" } },
        { $group: { _id: "$pricing_type" } },
        { $project: { _id: 0, name: "$_id" } },
    ]);


    return (<>
        <header>
            <Navbar />
        </header>
        <AiDirectory tools={JSON.parse(JSON.stringify(tools))} categories={JSON.parse(JSON.stringify(categories))} pricing_types={JSON.parse(JSON.stringify(pricingTypes))} />

    </>)

}
