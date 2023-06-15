import handler from 'lib/handler';
import PublicTool,{Category} from "models/public-tool";
import dbConnect from "lib/dbConnect";

import nextConnect from 'next-connect';

export default nextConnect(handler)
.get(async (req, res) => {
    try{
        await dbConnect();
        const { slug } = req.query;
        const tools = await PublicTool.find({slug:slug});
   
        return res.status(200).json({isUnique:tools.length === 0  ? true : false});



    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
})
    .post(async (req, res) => {
    try {
        await dbConnect();
        const tools = await PublicTool.find({state:'published'}).populate("category");
        const categories = await Category.find({});
        return res.status(200).json({ tools, categories });
      
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message || "Something went wrong" });
    }
})