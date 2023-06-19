import handler from 'lib/handler';
import Page from "models/page";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler).use(isAdminMiddleware)
.get(async (req, res, next) => {
    try{
        await dbConnect();
        const pages = await Page.find({type:"unnecessary"});
        if(!pages)
        {
            return res.status(404).json({error:"Pages not found"});
        }
        else
        {
            return res.status(200).json({pages});
        }

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }

})
.post(async (req, res, next) => {
    try{
        await dbConnect();
        const {IDS} = req.body;
        if(!IDS)
        {
            return res.status(400).json({error:"Missing IDS in request body"});
        }
        // find pages with the given IDS and update their type to unnecessary
        const pages = await Page.find({_id:{$in:IDS}});
        if(!pages)
        {
            return res.status(404).json({error:"Pages not found"});
        }
        const updatedPages = await Page.updateMany({_id:{$in:IDS}},{
            type:"unnecessary"
        });
        if(!updatedPages)
        {
            return res.status(500).json({error:"Couldn't update pages"});
        }
        else
        {
            return res.status(200).json({message:"Pages updated successfully",updatedPages});
        }

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }
})
.put(async (req, res, next) => {
    try{
        await dbConnect();
        console.log(req);
        const {IDS} = req.body;
        if(!IDS)
        {
            return res.status(400).json({error:"Missing IDS in request body"});
        }
        const pages = await Page.find({_id:{$in:IDS}});
        if(!pages)
        {
            return res.status(404).json({error:"Pages not found"});
        }
        const deletedPages = await Page.deleteMany({_id:{$in:IDS}});
        if(!deletedPages)
        {
            return res.status(500).json({error:"Internal server error"});
        }
        else
        {
            return res.status(200).json({message:"Pages deleted successfully",deletedPages});
        }

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }
})