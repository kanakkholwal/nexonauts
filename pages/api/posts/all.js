import handler from 'lib/handler';
import User from 'models/user';
import Post from 'models/post';
import Page from 'models/page';
import dbConnect from 'lib/dbConnect';
import nextConnect from 'next-connect';
import { hasSsrMiddleware } from 'middleware/checkUser';

export default nextConnect(handler).get(async (req, res,next) => {
  try {
    await hasSsrMiddleware(req, res,next);
    await dbConnect();

    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page
    const skip = (page - 1) * limit;

    const [posts, count] = await Promise.all([
      Post.find({ state: 'published' })
        .populate('author')
        .select('title description slug labels image author createdAt publishedAt comments')
        .populate('analytics')
        .skip(skip)
        .limit(limit)
        .exec(),
      Post.countDocuments({ state: 'published' })
    ]);

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      message: 'Posts Fetched Successfully!',
      currentPage: page,
      totalPages: totalPages,
      posts: posts,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Something went wrong',
      success: false,
    });
  }
}).post(async (req, res) => {
  try {
    await dbConnect();

    const posts = await Post.find({ state: 'published' })
      .sort({ createdAt: -1 })
      .populate('author.user', 'name profileURL')
      .select('content title description slug labels image author createdAt publishedAt comments')
      .populate('analytics')
      .exec();

    return res.status(200).json({
      message: 'Posts Fetched Successfully!',
      noOfPosts: posts.length,
      posts: posts,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Something went wrong',
        success: false,
    });
  }
});
