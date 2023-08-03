import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { isAdminMiddleware } from 'middleware/checkUser';

import PublicTool from 'models/public-tool';

export default nextConnect(handler)
    .use(isAdminMiddleware)
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        try{
            await dbConnect();
            const toolId = req.headers["tool-id"];

            // delete tool using mongo query
            const deletedTool = await PublicTool.findOneAndDelete({_id:toolId});
            if(!deletedTool){
                return res.status(400).json({ success: false, message: "Tool not found" });
            }
            return res.status(200).json({ success: true, message: "Tool deleted successfully" });


        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }


    })
 
