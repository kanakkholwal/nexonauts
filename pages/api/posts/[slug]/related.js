import handler from 'lib/handler';
import Post from "models/post";
import Page from "models/page";

import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';


export default nextConnect(handler)
    .get(async (req, res) => {
        try {
            await dbConnect();


            const { slug: postId } = req.query;
            // Find the post by postId
            const post = await Post.findById(postId)

            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const relatedPosts = await Post.find({
                _id: { $ne: postId },
                labels: {
                    $in: post.labels.map(label => new RegExp(label, 'i'))
                },
                state: 'published',
            })
                .populate('analytics', 'title slug')
                .populate('author')
                .limit(5)
                .sort({ createdAt: -1 })
                .exec();
            
            res.json(relatedPosts);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message || " Something went wrong",
            })
        }

    })
