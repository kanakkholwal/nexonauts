import handler from 'lib/handler';
import User from "models/user";
import Post, { Comment } from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler)
    .post(async (req, res) => {
        try {
            
            await dbConnect();
            const { slug:postId,commentId } = req.query;
            const { userId } = req.body;
            console.log("post",postId)
            console.log("comment",commentId)
            console.log("user",userId)

            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found!' });
            }
            console.log("user Found")

            // let result = await checkUser(req, existingUser);
            // if (!result.verified) {
            //     return res.status(404).json({ verified: result.verified, message: result.message });
            // }
            let result = {
                isAdmin: false,
                isUser: true,
                isPro: false,
                verified: true,
                message: "User Verified"
            }
            const existingPost = await Post.findById(postId).populate("author.user")
            if (!existingPost) {
                return res.status(404).json({ message: 'Post not found!' });
            }
            console.log("Post Found")

            if (!(existingUser._id.toString() === existingPost.author.user._id.toString() || result.isAdmin === true))
                return res.status(402).json({ message: 'You are not authorized to delete the comment' });

            // Step 1: Find the comment using its ID
            const existingComment = await Comment.findById(commentId);
            if (!existingComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            console.log("Comment Found")
            if (!(existingComment.post.toString() === existingPost._id.toString())){
                return res.status(404).json({ message: 'Comment not found in the post' });
            }
            console.log("Comment found in the post")
            let totalCommentsDeleted = 0;


            // Step 2: Delete reply comments and their nested replies (recursive promise function)
            const deleteReplies = async (comment) => {
                const replies = await Comment.find({ parentComment: comment._id });

                if (replies && replies.length > 0) {
                    for await (const reply of replies) {
                        totalCommentsDeleted += 1;
                        await deleteReplies(reply);
                        await reply.remove();
                        console.log(`Comment ${totalCommentsDeleted} deleted`);
                    }
                }
            };

       
            await deleteReplies(existingComment);
            console.log("All replies deleted")

            // Step 3: Remove the comment from its parent comment (if any)
            if (existingComment.parentComment) {
                const parentComment = await Comment.findById(existingComment.parentComment);

                if (parentComment) {
                    parentComment.replies = parentComment.replies.filter((reply) => reply.toString() !== commentId);
                    await parentComment.save();
                }
            }

            // Step 4: Decrement the numberOfComments count in the post by the total number of comments deleted
            totalCommentsDeleted += 1;
            // Step 5: Delete the comment
            await existingComment.remove();
            existingPost.comments.numberOfComments -= totalCommentsDeleted;
            await existingPost.save();
            return res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (err) {
            console.error('Error deleting comment:', err);
            return res.status(500).json({ message: err.message ?? 'Server error' });
        }
    });