import handler from 'lib/handler';
import Post from "models/post";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler)
.use(isAdminMiddleware)
.get(async (req, res, next) => {
    try {
        await dbConnect();
        // get all pages from db that has type "article"
        const posts = await Post.find({}).sort({ createdAt: -1 });
        
        return res.status(200).json({noOfPosts:posts.length});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }
})