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

            // Fetch related posts based on labels
            const relatedPosts = await Post.find({
                _id: { $ne: postId }, // Exclude the current post
                labels: { $in: post.labels }, // Find posts with overlapping labels
                state: 'published', // Fetch only published posts
            })
                .populate('analytics') // Select only the title and slug
                .limit(5) // Limit the number of related posts
                .sort({ createdAt: -1 }) // Sort by creation date in descending order
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
