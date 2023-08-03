import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

import PublicTool from 'models/public-tool';

export default nextConnect(handler)
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try{
            await dbConnect();
            const { name, slug, coverImage, description, categories, link, tags,  pricing_type } = req.body;
            
            // validate inputs 
            if (!name || !slug || !coverImage || !description || !categories || !link || !tags  || !pricing_type) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }
            // check if tool already exists
            const oldSlug = await PublicTool.find({
                slug: slug
            });
            if (oldSlug.length > 0) {
                return res.status(400).json({ success: false, message: "Tool already exists with this slug" });
            }
            // create new tool
            const newTool = new PublicTool({
                name,
                slug,
                coverImage,
                description,
                categories,
                link,
                tags,
                status:"pending",
                createdAt: new Date(),
                verified :false,
                pricing_type
            });
            await newTool.save();
            return res.status(200).json({ success: true, message: "Tool submitted successfully" });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }


    })
 
