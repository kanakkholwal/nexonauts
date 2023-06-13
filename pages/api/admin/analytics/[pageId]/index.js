import handler from 'lib/handler';
import Page from "models/page";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler)
    .use(isAdminMiddleware)
    .get(async (req, res) => {
        try {
            await dbConnect();
            const {pageId} = req.query;
            
            console.log(pageId);
            const page = await Page.findById(pageId);
            if(!page) return res.status(404).json({message:"Page not found"});

            
            return res.status(200).json({message:"Page fetched successFully",page});
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }

    })
 