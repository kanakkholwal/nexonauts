import handler from 'lib/handler';
import Post from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';


export default nextConnect(handler)
    .get(async (req, res) =>{
        try {
            await dbConnect();

        
            const { postSlug } = req.query;

            const existingPost = await Post.findOne({slug:postSlug}).select('+content').populate('author.user', 'name profileURl')
            if (!existingPost)
                return res.status(404).json({ message: 'Post not found!' })
            if(existingPost.state !== "published")
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
