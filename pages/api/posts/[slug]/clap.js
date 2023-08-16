import handler from 'lib/handler';
import User from 'models/user';
import Page from 'models/page';
import Post from 'models/post';
import dbConnect from 'lib/dbConnect';
import nextConnect from 'next-connect';

export default nextConnect(handler)
    .post(async (req, res) => {
        try {
            await dbConnect();

            const { slug: postId } = req.query;

            const existingPost = await Post.findById(postId);

            if (!existingPost) {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found!'
                });
            }
            if (existingPost.claps)
                existingPost.claps += 1;
            else
                existingPost.claps = 1;
            await existingPost.save();

            return res.status(200).json({
                success: true,
                message: 'Post Clapped Successfully!', post: existingPost
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: true,
                message: err.message || 'Something went wrong',
            });
        }
    });
