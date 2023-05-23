import handler from 'lib/handler';
import User from "models/user";
import Post,{Comment} from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';


export default nextConnect(handler).post(async (req, res) => {
    try {
      await dbConnect();
  
      const { slug: postId, commentId } = req.query;
      const { name, email, comment:commentBody } = req.body;
  
      // Find the post by ID
      const post = await Post.findById(postId).populate('comments.items')
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Find the parent comment by ID
      const parentComment = await Comment.findById(commentId);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
  
      // Create a new reply comment
      const newReply = {
        name,
        email,
        comment: commentBody,
        children: [],
        post: postId,
      };
  
      const replyComment = await Comment.create(newReply);
      if (!replyComment) {
        return res.status(500).json({ message: 'Unable to create a new comment reply!' });
      }
  
      // Add the reply comment to the parent comment's children array
      parentComment.children.push(replyComment);
      await parentComment.save();
  
      // Update the number of comments
      post.comments.numberOfComments = post.comments.items.length;
      await post.save();
  
      return res.status(200).json({ message: 'Comment reply created successfully!', comment: replyComment });
    } catch (err) {
      console.error('Error adding comment reply:', err);
      res.status(500).json({ message: err.message ?? 'Server error' });
    }
  });