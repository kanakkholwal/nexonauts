import handler from 'lib/handler';
import Post, { Comment } from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler).post(async (req, res) => {
  try {
    await dbConnect();
    const { slug } = req.query;
    const postId = slug; // Assign the slug to postId
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const getReplies = async (comment) => {
      const replies = await Comment.find({ parentComment: comment._id }).populate('replies');
      if (replies && replies.length > 0) {
        for (const reply of replies) {
          await getReplies(reply);
        }
        comment.replies = replies;
      }
    };
    
    

    // Find all top-level comments
    const topLevelComments = await Comment.find({ post: postId, parentComment: null });

    // Query replies for each top-level comment recursively
    for (const comment of topLevelComments) {
      await getReplies(comment);
    }

    // console.log(topLevelComments)
    // const AllComments =  await Promise.all

    return res.status(200).json(topLevelComments);
  } catch (err) {
    console.error('Error retrieving comments:', err);
    return res.status(500).json({ message: err.message ?? 'Server error' });
  }
});
