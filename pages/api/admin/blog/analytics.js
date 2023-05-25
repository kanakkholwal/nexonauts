import handler from 'lib/handler';
import Page from "models/page";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler)
.use(isAdminMiddleware)
.get(async (req, res, next) => {
    try {
        await dbConnect();
        // get all pages from db that has type "article"
        const pages = await Page.find({ type: "article" }).sort({ createdAt: -1 })

        // get total views of all pages
        const totalViews = pages.reduce((page) =>{
            return page.analytics.filter((analytic) => analytic.action === "view")
        })
        
        return res.status(200).json({pages,totalViews});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }
})