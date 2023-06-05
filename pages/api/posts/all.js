import handler from 'lib/handler';
import User from "models/user";
import Post from "models/post";
import Page from "models/page";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler)
  .get(async (req, res) => {
    try {
      await dbConnect();

      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page

      const skip = (page - 1) * limit;

      const postsPromise = await Post.find({ state: 'published' })
      .populate('author.user', 'name profileURl')
      .select('title description slug labels image author createdAt publishedAt comments')
      .populate('author.user', 'name profileURl')
      .populate('analytics').exec()
      .skip(skip)
      .limit(limit)

      // .sort({ createdAt: -1 }) // Sort posts by creation date (descending)

      const countPromise = await Post.countDocuments({ state: 'published' });

      const [posts, count] = await Promise.all([postsPromise, countPromise]);

      const totalPages = Math.ceil(count / limit);

      return res.status(200).json({
        message: 'Posts Fetched Successfully!',
        currentPage: page,
        totalPages: totalPages,
        posts: posts,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message || "Something went wrong",
      });
    }
  })
  .post(async (req, res) => {
    try {
      await dbConnect();

      const posts = await Post.find({ state: 'published' })
        .sort({ createdAt: -1 })
        .populate('author.user', 'name profileURl')
        .select('content title description slug labels image author createdAt publishedAt comments')
        .populate('analytics').exec();

      return res.status(200).json({
        message: 'Posts Fetched Successfully!',
        noOfPosts: posts.length,
        posts: posts,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message || "Something went wrong",
      });
    }
  });
