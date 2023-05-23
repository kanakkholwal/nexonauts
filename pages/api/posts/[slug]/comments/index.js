import handler from 'lib/handler';
import User from "models/user";
import Post, { Comment } from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';


export default nextConnect(handler)
    .post(async (req, res) => {
        try {
            await dbConnect();


            const { slug: postId } = req.query;

            const { name, email, comment: commentBody } = req.body;

            // Find the post by ID
            const post = await Post.findById(postId).populate('comments.items')
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            const newComment = {
                name,
                email,
                comment: commentBody,
                children: [],
                post: postId,
            };
            const comment = await Comment.create(newComment)
            if (!comment) {
                return res.status(500).json({ message: 'Unable to create a new comment!' });
            }
            // Update the post
            post.comments.items.push(comment);
            post.comments.numberOfComments = post.comments.items.length;
            await post.save();
            return res.status(200).json({ message: 'Comment created successfully!', comment: newComment })
        }
        catch (err) {
            console.error('Error adding comment:', err);
            res.status(500).json({ message: err.message ?? 'Server error' });
        }

    })
