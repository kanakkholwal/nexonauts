import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { hasSsrMiddleware } from 'middleware/checkUser';
import PublicTool from 'models/public-tool';

export default nextConnect(handler)
    .get(async (req: NextApiRequest, res: NextApiResponse,next) => {
        try{
            await hasSsrMiddleware(req,res,next);
            await dbConnect();
              
            // Perform the search with pagination and sorting
            const tools = await PublicTool.find({status:"published" || "approved"});
           
           return  res.json({
                success: true,
                message: "Tool fetched successfully",
                tools
            });



        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }


    })
    .post(async (req: NextApiRequest, res: NextApiResponse,next) => {
        try{
            await hasSsrMiddleware(req,res,next);

            await dbConnect();
            const {slug} = req.body;
            const tool = await PublicTool.findOne({slug,status:"published" || "approved"});
            return res.json({
                success: true,
                message: "Tool fetched successfully",
                tool
            });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })
 
