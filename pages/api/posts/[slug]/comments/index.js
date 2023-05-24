import handler from 'lib/handler';
import User from "models/user";
import Post, { Comment } from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler).post(async (req, res) => {
  try {
    await dbConnect();

    const { slug: postId } = req.query;
    const { name, email, comment } = req.body;

    // Find the post by ID
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create a new comment
    const newComment = new Comment({
      name,
      email,
      comment,
      post: postId,
    });

    // Save the comment
    await newComment.save();

    // Add the comment to the post's comments array
    // post.comments.rootItems.push(newComment);
    post.comments.numberOfComments += 1;

    // Save the updated post
    await post.save();

    return res.status(201).json(newComment);
  } catch (err) {
    console.error('Error adding comment:', err);
    return res.status(500).json({ message: err.message ?? 'Server error' });
  }
});
