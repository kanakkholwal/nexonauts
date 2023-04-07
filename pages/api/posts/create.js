import handler from 'lib/handler';
import Post from "models/post";
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler).use(hasTokenMiddleware)
    .post(async (req, res) => {

        try {
            await dbConnect();

            const { userId, post } = req.body;

            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found!' })
            }
            const existingPostWithSameSlug = await Post.find({ slug: post.slug });
            if (existingPostWithSameSlug.length > 0) {
                return res.status(409).json({ message: 'Post with same slug already exists!' })
            }
            const newPost = await Post.create({
                title: post.title,
                slug: post.slug,
                description: post.description,
                content: post.content,
                labels: post.labels,
                image: post.image,
                state: post.state,
                author: existingUser.id,
                comments: post.comments
            });
            if (!newPost) {
                return res.status(500).json({ message: 'Unable to Create a new Post!' })
            }
            await existingUser.posts.push(newPost.id);
            await existingUser.save();

            return res.status(200).json({ message: 'Post Created Successfully!', post: newPost })


        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message || " Something went wrong",
            })
        }

    })