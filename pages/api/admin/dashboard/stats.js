import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';

import Page from "models/page";
import User from "models/user";
import Post from "models/post";
import App from "models/app";

export default nextConnect(handler).use(isAdminMiddleware)
.get(async (req, res, next) => {
    try {
        await dbConnect();
        // get all pages from db in paginated way and sorted by type
     
        const pages = await Page.find({});
        const users = await User.find({});
        const posts = await Post.find({}).sort({ createdAt: -1 });
        const apps = await App.find({});
        const stats = {
            pages: pages.length,
            users: users.length,
            posts: posts.length,
            apps: apps.length,
            tools:pages.filter((page) => page.type === "tool").length
        }
        
        return res.status(200).json({message:"Stats fetched successFully",stats});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }
})