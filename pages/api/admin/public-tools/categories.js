import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";

import nextConnect from 'next-connect';

export default nextConnect(handler)
    .get(async (req, res) => {
    try {
        await dbConnect();
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
          ]);        return res.status(200).json({ categories });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
})
