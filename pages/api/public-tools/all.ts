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
            // return all public tools that are approved
            const tools = await PublicTool.find({status:"published"}).sort({createdAt:-1});
            
            return res.status(200).json({ success: true, message: "Tools fetched successfully",tools:tools });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }


    })
 
