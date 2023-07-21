import handler from 'lib/handler';
import User from "models/user";
import Page from "models/page";
import App from "models/app";
import Post ,{Comment}  from "models/post";
import dbConnect from "lib/dbConnect";
import { hasSsrMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';

export default nextConnect(handler)
    .get(async (req, res, next) => {
        try {
            await hasSsrMiddleware(req, res, next);
            await dbConnect();

            const { userId: username } = req.query;
            const user = await User.findOne({ username: username });

            if (!user) {
                return res.status(404).json({ message: 'User not found!', success: false });
            }
            // find pages where userId is in the array of analytics
            const pages = await Page.find({ analytics: { $in: [user._id] } });
            const apps  = await App.find({ }).select("+usage").select("+review").exec();
            const userApps = apps.filter(app => app.usage.some(usage => usage.userId === user._id.toString()));
            const userReviews = apps.filter(app => app.review.some(review => review.userId === user._id.toString()));
            const userComments = await Comment.find({ userId: user._id.toString() });
            const posts = await Post.find({ author: user._id.toString() }).select("author").exec();





            return res.status(200).json({ message: 'User fetched successfully!', success: true, user: {
                ...user._doc,
                visits: pages.length,
                appsUsage: userApps.length,
                reviews: userReviews.length,
                comments: userComments.length,
            } });
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || "Something went wrong", 
                success: false
            });
        }
    })