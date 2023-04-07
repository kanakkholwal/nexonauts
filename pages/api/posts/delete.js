import handler from 'lib/handler';
import Post from "models/post";
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler).use(hasTokenMiddleware)
    .delete(async (req, res) => {
        try {
            await dbConnect();

            const { userId, postId } = req.body;

            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found!' })
            }
            const existingPost = await Post.findById(postId);
            if (!existingPost)
                return res.status(404).json({ message: 'Post not found!' })


            await existingUser.posts.pull(existingPost.id);
            await existingUser.save();
            await existingPost.deleteOne();

            return res.status(200).json({ message: 'Post Deleted Successfully!' })

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message || " Something went wrong",
            })
        }


    })

