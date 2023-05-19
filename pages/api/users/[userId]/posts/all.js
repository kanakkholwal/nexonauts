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
              return res.status(402).json({ message: 'User not found!' });
            }
            
            const result = await checkUser(req, existingUser);
            if (!result.verified) {
              return res.status(402).json({ verified: result.verified, message: result.message });
            }
          
            const {posts} = await existingUser.populate('posts');
            console.log(posts)
          
            return res.status(200).json({ message: 'Posts fetched successfully!', posts });
          } catch (err) {
            console.error(err);
            return res.status(500).json({ message: err.message || 'Something went wrong' });
          }
          

    })
