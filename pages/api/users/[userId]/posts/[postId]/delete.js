import handler from 'lib/handler';
import Post, { Comment } from "models/post";
import Page from "models/page";
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';
import { checkUser } from 'lib/checkUser';

export default nextConnect(handler)
  .use(hasTokenMiddleware)
  .delete(async (req, res) => {
    try {
      await dbConnect();

      const { userId ,postId} = req.query;

      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found!' });
      }

      const result = await checkUser(req, existingUser);
      if (!result.verified) {
        return res.status(404).json({ verified: result.verified, message: result.message });
      }

      const existingPost = await Post.findById(postId)
      .populate('analytics').exec();
      if (!existingPost) {
        return res.status(404).json({ message: 'Post not found!' });
      }

      await existingUser.posts.pull(existingPost.id);
      await existingUser.save();
      await Page.findByIdAndDelete(existingPost.analytics._id);
      // delete comments from this post 
      await Comment.deleteMany({ post: existingPost.id });
      await existingPost.deleteOne();

      return res.status(200).json({ message: 'Post Deleted Successfully!' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message || "Something went wrong",
      });
    }
  });
