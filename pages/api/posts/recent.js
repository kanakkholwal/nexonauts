import handler from 'lib/handler';
import Post from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler)
.post(async (req, res) => {
    try {
      await dbConnect();
      const {noOfPost} = req.query;
      // get recent posts
      const posts = await Post.find({ state: 'published' })
       .sort({ createdAt: -1 })
       .populate('author.user', 'name profileURl')
       .limit(noOfPost ?? 5)
       .select('title description slug labels image author createdAt publishedAt comments');

      return res.status(200).json({ message: "Posts fetched successfully", posts });



    

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message || "Something went wrong",
      });
    }
  });
