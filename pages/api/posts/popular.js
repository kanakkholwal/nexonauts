import handler from 'lib/handler';
import User from "models/user";
import Page from "models/page";
import Post from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler)
.post(async (req, res) => {
    try {
      await dbConnect();
      const {noOfPost} = req.query;

      const posts = await Post.find({ state: 'published' })
        .sort({ createdAt: -1 })
        .populate('author.user', 'name profileURl')
        .select('title description slug labels image author createdAt publishedAt comments');
    let popularPosts = posts.map(async(post) =>{
            const data = await Page.findOne({slug:post.slug})
            if(data){
                return {
                    ...post._doc,
                    views:data.views,
                    shares:data.shares
                }
            }
            else{
                return {
                    ...post._doc,
                    views:0,
                    shares:0
                }
            }


    })
    popularPosts = await Promise.all(popularPosts)
    popularPosts = popularPosts.sort((a,b) => (a.views + a.shares) < (b.views + b.shares) ? 1 : -1)
    popularPosts = popularPosts.slice(0,noOfPost ?? 5)
    return res.status(200).json({ message: "Posts fetched successfully", posts:popularPosts });

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message || "Something went wrong",
      });
    }
  });
