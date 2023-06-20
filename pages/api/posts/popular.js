import handler from 'lib/handler';
import Page from 'models/page';
import User from 'models/user';
import Post from 'models/post';
import dbConnect from 'lib/dbConnect';
import nextConnect from 'next-connect';

export default nextConnect(handler).post(async (req, res) => {
  try {
    await dbConnect();
    const { noOfPost } = req.query;

    const posts = await Post.find({ state: 'published' })
      .sort({ createdAt: -1 })
      .populate('author')
      .select('title description slug labels image author createdAt publishedAt comments')
      .populate('analytics').exec();

    const popularPosts = await Promise.all(
      posts.map(async (post) => {
        const data = await Page.findOne({ slug: post.slug });

        return {
          ...post.toObject(),
          views: data ? data.analytics.filter((item) => item.type === 'view').length : 0,
          shares: data ? data.analytics.filter((item) => item.type === 'share').length : 0,
        };
      })
    );

    const sortedPosts = popularPosts.sort((a, b) => (a.views + a.shares < b.views + b.shares ? 1 : -1));
    const limitedPosts = sortedPosts.slice(0, noOfPost || 5);

    return res.status(200).json({ message: 'Posts fetched successfully', posts: limitedPosts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Something went wrong',
    });
  }
});
