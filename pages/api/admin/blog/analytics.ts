import handler from 'lib/handler';
import Page from "models/page";
import Post,{Comment} from "models/post";
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
            return page.analytics.filter((analytic :any) => analytic.action === "view")
        });
  
        // get no. of posts and comments
        const posts = await Promise.all([Post.countDocuments({
            status: "published"
        }),
        Post.countDocuments({
            status: "draft"
        })]);
        const comments = await Comment.countDocuments();
        
        
        
        return res.status(200).json({
            data:{
                totalViews,
                posts,
                comments,
            },
            success: true,
            message: "Successfully fetched analytics"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({  message: error.message ?? "Internal server error", success: false });
    }
})