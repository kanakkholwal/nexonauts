import PublicTool from "models/public-tool";
import type PublicToolType from "types/public-tool";

type SSROutput = {
    tools: {
        success: boolean;
        message: string;
        items: PublicToolType[];
    },
    categories: {
        success: boolean;
        message: string;
        items: {
            name: string;
            slug: string;
        }[]
    },
    pricing_types: {
        success: boolean;
        message: string;
        items: string[];
    }
}

export async function SsrTools(limit: number) {


    return new Promise<SSROutput>(async (resolve, reject) => {
        let output: SSROutput = {
            tools: {
                success: false,
                message: "",
                items: []
            },
            categories: {
                success: false,
                message: "",
                items: []
            },
            pricing_types: {
                success: false,
                message: "",
                items: []
            }
        }
        try {
            const [
                tools,
                categories,
                pricingTypes
            ] = await Promise.allSettled([
                PublicTool.find({ status: "published" || "approved" }).
                    sort({ createdAt: -1 }).limit(limit || 10),
                PublicTool.aggregate([
                    { $unwind: "$categories" },
                    {
                        $group: {
                            _id: "$categories.slug",
                            name: { $first: "$categories.name" },
                            slug: { $first: "$categories.slug" },
                        },
                    },
                    { $project: { _id: 0, name: 1, slug: 1 } },
                ]),
                PublicTool.distinct("pricing_type")
            ]);
            if (tools.status === "rejected") {
                output.tools.success = false;
                output.tools.message = tools.reason;
            }
            if (categories.status === "rejected") {
                output.categories.success = false;
                output.categories.message = categories.reason;
            }
            if (pricingTypes.status === "rejected") {
                output.pricing_types.success = false;
                output.pricing_types.message = pricingTypes.reason;
            }
            if (tools.status === "fulfilled") {
                output.tools.success = true;
                output.tools.message = "Tools fetched successfully";
                output.tools.items = tools.value as PublicToolType[];
            }
            if (categories.status === "fulfilled") {
                output.categories.success = true;
                output.categories.message = "Categories fetched successfully";
                output.categories.items = categories.value;
            }
            if (pricingTypes.status === "fulfilled") {
                output.pricing_types.success = true;
                output.pricing_types.message = "Pricing types fetched successfully";
                output.pricing_types.items = pricingTypes.value;
            }
            resolve(output);



        }
        catch (err) {
            reject(err);


        }
    })

}