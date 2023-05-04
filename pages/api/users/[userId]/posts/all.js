import handler from 'lib/handler';
import User from "models/user";
import Post from "models/post";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import { checkUser } from 'lib/checkUser';
import nextConnect from 'next-connect';

export default nextConnect(handler)
    .use(hasTokenMiddleware)
    .get(async (req, res) => {


        try {
            await dbConnect();

            const { userId } = req.query;

            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found!' })
            }
            const result = checkUser(req, existingUser);

            if (result.verified === false)
                return res.status(404).json({ verified: result.verified, message: result.message })



            let posts = []

            for await (const element of existingUser.posts) {
                let post = await Post.findById(element)
                posts.push(post)
            }



            return res.status(200).json({ message: 'Posts Fetched Successfully!', posts })


        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message || " Something went wrong",
            })
        }

    })
