import handler from 'lib/handler';
import Post from "models/post";
import Page from "models/page";
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import { checkUser } from 'lib/checkUser';
import nextConnect from 'next-connect';
import { v4 as UuID4 } from 'uuid';


export default nextConnect(handler).use(hasTokenMiddleware)
    .post(async (req, res) => {

        try {
            await dbConnect();
          
            const { userId} = req.query;
          
            const existingUser = await User.findById(userId);
            if (!existingUser) {
              return res.status(404).json({ message: 'User not found!' });
            }
          
            const result = await checkUser(req, existingUser);
            if (!result.verified) {
              return res.status(404).json({ verified: result.verified, message: result.message });
            }
          
            const newPost = await Post.create({
              title:  'Untitled',
              slug:  UuID4(),
              state: 'draft',
              author: {
                name: existingUser.name,
                profileURL: existingUser.profileURL,
                user: existingUser._id
              },
              comments:  { enabled: true, numberOfComments: 0, items: [] }
            });
          
            if (!newPost) {
              return res.status(500).json({ message: 'Unable to create a new post!' });
            }
            const newPage = await Page.create({
              title: newPost.title,
              slug: newPost.slug,
              type: 'article',
            });
            if(!newPage){
              return res.status(500).json({ message: 'Unable to create a new page!' });
            }
            await newPost.updateOne({ analytics: newPage._id });
          
            existingUser.posts.push(newPost.id);
            await existingUser.save();
          
            return res.status(200).json({ message: 'Post created successfully!', post: newPost });
          } catch (err) {
            console.error(err);
            return res.status(500).json({ message: err.message || 'Something went wrong' });
          }
          

    })