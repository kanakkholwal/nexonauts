import handler from 'lib/handler';
// import Post from "models/post";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler)
.post(async (req, res) => {
    try {
        // await dbConnect();

        console.log(req.body.id);
        
        // const posts = await Post.find({})
        //     .populate('author', 'name profileURL user')
        //     .select('author')
        //     .exec();
        // // redefine author as user
        // console.log(posts);
        // posts.forEach(post => {
        //     post.author = post.author.user;
        //     post.save();
        // });
      
        
        // console.log(posts);

        
        
        res.status(200).json({ update:"done" });
      
     
    } catch (err) {
        console.error('Error retrieving comments:', err);
        res.status(500).json({ message: err.message ?? 'Server error' });
    }
});
// path : 
