import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

import PublicTool from 'models/public-tool';
import { v4 as UuID } from 'uuid';
function generateRandomUsername() {
    // Generate a random UUID
    const uuid = UuID();
  
    // Take the first 10 characters of the UUID and remove any non-alphanumeric characters
    const alphanumericUsername = uuid.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6);
  
    // Add a prefix (e.g., 'user_') to the alphanumeric username
    return `public-tool_${alphanumericUsername}`;
  }
export default nextConnect(handler)
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try{
            await dbConnect();
            const { name, description, link, pricing_type,author } = req.body;
            
            // validate inputs 
            if (!name || !description  || !link || !pricing_type || !author) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }
            // check if tool already exists
 
            // create new tool
            const newTool = new PublicTool({
                name,
                slug:generateRandomUsername(),
                // coverImage,
                description,
                categories:[],
                link,
                tags:[],
                status:"pending",
                createdAt: new Date(),
                verified :false,
                pricing_type,
                author
            });
            await newTool.save();
            return res.status(200).json({ success: true, message: "Tool submitted successfully" });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }


    })
 
