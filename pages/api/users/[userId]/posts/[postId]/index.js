import handler from 'lib/handler';
import Post from "models/post";
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler)
    .use(hasTokenMiddleware)
    .post(async (req, res) => {

        try {
            await dbConnect();

            const { postId } = req.query;

            const existingPost = await Post.findById(postId).select('+content')
            if (!existingPost)
                return res.status(404).json({ message: 'Post not found!' })

            return res.status(200).json({ message: 'Post Fetched Successfully!', post: existingPost })


        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message || " Something went wrong",
            })
        }

    })
    .put(async (req, res) => {

        try {
            await dbConnect();

            const { postId } = req.query;
            const { userId, post } = req.body;


            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found!' })
            }
            const existingPost = await Post.findById(postId);
            if (!existingPost)
                return res.status(404).json({ message: 'Post not found!' });

            // if (!(existingUser.posts.includes(existingPost._id) && existingPost.author.toString() === existingUser._id.toString()))
            //     return res.status(403).json({ message: 'You are not authorized to edit this post!' })
            const existingPostWithSlug = await Post.findOne({slug:post.slug});

            if(existingPostWithSlug)
                return res.status(409).json({ message: 'Post with this slug already exists!' })



            await Post.findOneAndUpdate(
                {
                    _id: postId
                }, {
                $set: {
                    title: post.title,
                    slug: post.slug,
                    description: post.description,
                    content: post.content,
                    labels: post.labels,
                    image: post.image,
                    state: post.state,
                    author: {
                        name: existingUser.name,
                        profileURl: existingUser.profileURl,
                        user: existingUser.id
                    },
                    comments: post.comments,
                    publishedAt: post.state === 'published' ? Date.now() : null

                }
            }).select("+content").exec(function (err, post) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: err.message || " Something went wrong",
                    })
                }
                console.log(post);
                return res.status(200).json({ message: 'Post Updated Successfully!', post })

            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                message: err.message || " Something went wrong",
            })
        }

    })