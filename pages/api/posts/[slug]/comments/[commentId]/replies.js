import handler from 'lib/handler';
import User from "models/user";
import Post, { Comment } from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler).post(async (req, res) => {
  try {
    await dbConnect();

    const { slug: postId, commentId } = req.query;
    const { name, email, comment } = req.body;

    // Find the post by ID
    const post = await Post.findById(postId)
    

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Find the parent comment by ID
    const parentComment = await Comment.findById(commentId);

    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }

    // Create a new reply
    const newReply = new Comment({
      name,
      email,
      comment,
      post: postId,
      parentComment: commentId,
    });

    // Save the reply
    await newReply.save();

    // Add the reply to the parent comment's replies array
    parentComment.replies.push(newReply);

    // Save the updated parent comment
    await parentComment.save();

    // Update the post's comments count
    post.comments.numberOfComments += 1;

    // Save the updated post
    await post.save();

    return res.status(201).json({ message: 'Comment reply created successfully!', comment: newReply });
  } catch (err) {
    console.error('Error adding comment reply:', err);
    return res.status(500).json({ message: err.message ?? 'Server error' });
  }
});
