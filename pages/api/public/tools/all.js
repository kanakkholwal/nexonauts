import handler from 'lib/handler';
import PublicTool from "models/public-tool";
import dbConnect from "lib/dbConnect";

import nextConnect from 'next-connect';

export default nextConnect(handler)
    .post(async (req, res) => {

    try {
        await dbConnect();
        const tools = await PublicTool.find({state:'published'}).populate("category");

        return res.status(200).json({ tools });
      
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
})