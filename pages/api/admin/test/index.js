import handler from 'lib/handler';
import Page from "models/page";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';

export default nextConnect(handler)
.delete(async (req, res) => {
    try {
        await dbConnect();

     
        // const post = await Post.findById("646495ff20ff6aa2c44f1452")
        // .populate("comments");
        // post.comments.items = [];
        // post.comments.numberOfComments = 0;
        // await post.save();
        // res.status(200).json({ message: 'Comment deleted' });
        await Page.deleteMany({});
        res.status(200).json({ message: 'All pages deleted' });
     
    } catch (err) {
        console.error('Error retrieving comments:', err);
        res.status(500).json({ message: err.message ?? 'Server error' });
    }
});
// path : 
