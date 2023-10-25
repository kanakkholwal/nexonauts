import { getMostUsedApp, getUsageData } from "lib/apps/utils";
import { checkUser } from 'lib/checkUser';
import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import { hasTokenMiddleware } from 'middleware/checkUser';
import App from "models/app";
import Post from "models/post";
import User from "models/user";
import nextConnect from 'next-connect';
import { getUsageByUser } from "src/utils/app";

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
      const posts = await Post.find({ author: existingUser._id }).select('author').exec();
      // comments by the user
      const comments = await Post.find({ comments: { $elemMatch: { author: existingUser._id } } }).select('comments').exec();

      // get app usage data of user
      const total_app_usage = await getUsageByUser(userId);
      // reduce usage data to get total usage
      // const totalUsage = total_app_usage.usages;
      console.log(total_app_usage);

      const apps = await App.find({}).select("+usage").exec();

      const usage = await getUsageData(apps, userId);
      const mostUsed = await getMostUsedApp(apps, userId);
      // format usage data on each app per day basis

      return res.status(200).json({
        message: "Stats fetched successFully",
        stats: {
          posts: posts.length,
          comments: comments.length,
          usage: usage,
          mostUsed: mostUsed
        }
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error", message: error.message });
    }
  })