import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasSsrMiddleware } from 'middleware/checkUser';
import PublicTool from 'models/public-tool';

export default nextConnect(handler)
    .post(async (req: NextApiRequest, res: NextApiResponse,next) => {
        try{
            await hasSsrMiddleware(req,res,next);
            await dbConnect();
            
     
    

            // Perform the search with pagination and sorting
            const tools = await PublicTool.find({status:"published" || "approved"}).
            sort({ createdAt: -1 }). limit(10);
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
           return  res.json({
                success: true,
                message: "Tools fetched successfully",
                tools,
                categories: categories
            });



        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }


    })
 
