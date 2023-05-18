import handler from 'lib/handler';
import Post from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';


export default nextConnect(handler)
    .get(async (req, res) => {

        try {
            await dbConnect();

            const posts = await await Post.find({ state: 'published' })
            .sort({ createdAt: -1 })
            .populate('author.user', 'name profileURl')
            .select('title description slug labels image author createdAt publishedAt comments');
            return res.status(200).json({
                message: 'Post Fetched Successfully!',
                noOfPosts: posts.length,
                posts: posts
            })


        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message || " Something went wrong",
            })
        }

    })
    .post(async (req, res) => {

        try {
            await dbConnect();

            const posts = await await Post.find({ state: 'published' })
            .sort({ createdAt: -1 })
            .populate('author.user', 'name profileURl')
            .select('content title description slug labels image author createdAt publishedAt comments');
            return res.status(200).json({
                message: 'Post Fetched Successfully!',
                noOfPosts: posts.length,
                posts: posts
            })


        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message || " Something went wrong",
            })
        }

    })