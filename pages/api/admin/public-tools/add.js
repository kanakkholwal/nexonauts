import handler from 'lib/handler';
import PublicTool,{Category} from "models/public-tool";
import dbConnect from "lib/dbConnect";

import nextConnect from 'next-connect';

export default nextConnect(handler)
    .post(async (req, res) => {

    try {
        await dbConnect();
        //  add new tool and add new category 
        const {name,slug,description,link,categories,coverImage,state} = req.body;
        // make sure categories are unique in Tool and Category collection

        const tool = await PublicTool.create({name,slug,description,link,coverImage,categories,state});

        return res.status(200).json({ message: "Tool added successfully" ,tool});
      
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
})