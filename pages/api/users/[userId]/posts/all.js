import handler from 'lib/handler';
import User from "models/user";
import Post from "models/post";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';
import { getToken } from "next-auth/jwt"


export default nextConnect(handler)
    // .use(hasTokenMiddleware)
    .get(async (req, res) => {

        await hasTokenMiddleware(req, res)
        try {
            await dbConnect();

            const { userId } = req.query;

            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found!' })
            }
            const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET })

            if (!(token.user.id === userId && token.user.id === existingUser._id.toString()))
                return res.status(401).json({
                    message: 'You are not authorized to access this resource',
                });
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
