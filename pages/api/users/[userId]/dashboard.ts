import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import {getUsageData,getMostUsedApp} from "lib/apps/utils";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';
import { checkUser } from 'lib/checkUser';
import User from "models/user";
import Post from "models/post";
import App from "models/app";

export default nextConnect(handler)
.use(hasTokenMiddleware)
.get(async (req, res, next) => {
    try {
        await dbConnect();
        const { userId } = req.query;
      const existingUser = await User.findById(userId);

      if (!existingUser) {
        return res.status(404).json({ message: 'User not found!' });
      }
      const result = await checkUser(req, existingUser);
      if (!result.verified) {
        return res.status(403).json({ verified: result.verified, message: result.message });
      }
        // get all posts created by user
        const posts = await Post.find({author:existingUser._id}).select('author').exec();
        // comments by the user
        const comments = await Post.find({comments:{$elemMatch:{author:existingUser._id}}}).select('comments').exec();

        const apps = await App.find({}).select("+usage").exec();

        const usage =  getUsageData(apps,userId);
        const mostUsed =  getMostUsedApp(apps,userId);
        // format usage data on each app per day basis
     
        return res.status(200).json({message:"Stats fetched successFully",stats:{
            posts:posts.length,
            comments:comments.length,
            usage:usage,
            mostUsed:mostUsed
        }});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }
})