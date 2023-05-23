import handler from 'lib/handler';
import Post from 'models/post';
import dbConnect from 'lib/dbConnect';
import nextConnect from 'next-connect';

export default nextConnect(handler).post(async (req, res) => {
  try {
    await dbConnect();

    const { slug: postId } = req.query;

    // Find the post by ID
    const post = await Post.findById(postId).populate('comments.items');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Extract the comments from the post
    const comments = post.comments.items;

    return res.status(200).json(comments);
  } catch (err) {
    console.error('Error retrieving comments:', err);
    res.status(500).json({ message: err.message ?? 'Server error' });
  }
});
