import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

import PublicTool from 'models/public-tool';
import { isAdminMiddleware } from 'middleware/checkUser';

export default nextConnect(handler)
    .use(isAdminMiddleware)
    .put(async (req: NextApiRequest, res: NextApiResponse) => {
        try{
            await dbConnect();
            const { name, slug, coverImage, description, categories, link, tags, status, createdAt, verified, category, pricing_type,_id } = req.body;
            
            const toolsWithSlugs = await PublicTool.find({
                slug: slug
            });
            if (toolsWithSlugs.length > 1 || (toolsWithSlugs.length === 1 && toolsWithSlugs[0]._id.toString() !== _id)) {
                return res.status(400).json({ success: false, message: "Tool already exists with this slug" });
            }
            // update tool using mongo query
            const updatedTool = await PublicTool.findOneAndUpdate({_id:_id},{
                name,
                slug,
                coverImage,
                description,
                categories,
                link,
                tags,
                status,
                createdAt,
                verified,
                category,
                pricing_type
            });
            if(!updatedTool){
                return res.status(400).json({ success: false, message: "Tool not found" });
            }
            return res.status(200).json({ success: true, message: "Tool updated successfully" });


        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }


    })
 
