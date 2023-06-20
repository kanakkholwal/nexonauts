import handler from 'lib/handler';
import User from 'models/user';
import Page from 'models/page';
import Post from 'models/post';
import dbConnect from 'lib/dbConnect';
import nextConnect from 'next-connect';

export default nextConnect(handler).post(async (req, res) => {
  try {
    await dbConnect();

    const { slug } = req.query;

    const existingPost = await Post.findOne({ slug: slug })
      .select('+content')
      .populate('author')
      .populate('analytics')
      .exec();

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    if (existingPost.state !== 'published') {
      return res.status(404).json({ message: 'Post not published!' });
    }

    return res.status(200).json({ message: 'Post Fetched Successfully!', post: existingPost });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Something went wrong',
    });
  }
});
