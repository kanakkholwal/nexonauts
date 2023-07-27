import handler from 'lib/handler';
import User from 'models/user';
import Page from 'models/page';
import Post from 'models/post';
import dbConnect from 'lib/dbConnect';
import nextConnect from 'next-connect';
import { hasSsrMiddleware } from 'middleware/checkUser';

export default nextConnect(handler).post(async (req, res,next) => {
    try {
        await hasSsrMiddleware(req, res,next);

        await dbConnect();

        const { slug } = req.query;

        const existingPost = await Post.findOne({ slug: slug })
            .select('+content')
            .populate('author')
            .populate('analytics')
            .exec();

        if (!existingPost) {
            return res.status(404).json({
                message: 'Post not found!',
                success: false,
            });
        }

        if (existingPost.state !== 'published') {
            return res.status(404).json({
                message: 'Post not published!',
                success: false,
            });
        }
        const relatedPosts = await Post.find({
            _id: { $ne: existingPost._id.toString() },
            labels: {
                $in: existingPost.labels.map(label => new RegExp(label, 'i'))
            },
            state: 'published',
        })
            .populate('analytics', 'title slug')
            .populate('author')
            .limit(6)
            .sort({ createdAt: -1 })
            .exec();

        return res.status(200).json({
            message: 'Post Fetched Successfully!',
            success: true,
            post: existingPost,
            related: relatedPosts,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message || 'Something went wrong',
            success: false,
        });
    }
});
