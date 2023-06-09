import handler from 'lib/handler';
import Post from "models/post";
import Page from "models/page";
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';
import { checkUser } from 'lib/checkUser';

export default nextConnect(handler)
  .use(hasTokenMiddleware)
  .post(async (req, res) => {
    try {
      await dbConnect();

      const { postId ,userId} = req.query;
      
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found!' });
      }
    
      const result = await checkUser(req, existingUser);
      if (!result.verified) {
        return res.status(404).json({ verified: result.verified, message: result.message });
      }
      if(!postId)
        return res.status(404).json({ message: 'Post not found!' });
        
      const existingPost = await Post.findById(postId).select('+content').populate('analytics').exec();
      if (!existingPost) {
        return res.status(404).json({ message: 'Post not found!' });
      }
    //   console.log(existingPost)

      return res.status(200).json({ message: 'Post Fetched Successfully!', post: existingPost });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message || "Something went wrong",
      });
    }
  })
  .put(async (req, res) => {
    try {
      await dbConnect();

      const { postId ,userId} = req.query;
      const { post } = req.body;
          
      const existingUser = await User.findById(userId); // Find the user
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found!' });
      }
    
      const result = await checkUser(req, existingUser);// Verify user with cookies
      if (!result.verified) {
        return res.status(404).json({ verified: result.verified, message: result.message });
      }
    
      const existingPost = await Post.findById(postId);// Find the post with postId
      if (!existingPost) {
        return res.status(404).json({ message: 'Post not found!' });
      }

      const existingPostWithSlug = await Post.findOne({ slug: post.slug });// Find a post with same slug
      if (existingPostWithSlug) {
        // if found the post with same slug
        if (!(existingPostWithSlug && existingPostWithSlug._id.toString() === existingPost._id.toString()))
        return res.status(402).json({ message: 'Post with this slug already exists!' });
        else
        console.log("updating the same post")
      }
      const updatedPost = await Post.findOneAndUpdate({
          _id: postId
      },
        {
          $set: {
            title: post.title,
            slug: post.slug,
            description: post.description,
            content: post.content,
            labels: post.labels.map((item) => item.trim()),
            image: post.image,
            state: post.state,
            author: {
              name: existingUser.name,
              profileURL: existingUser.profileURL,
              user: existingUser.id
            },
            comments: post.comments,
            publishedAt: post.state === 'published' ? Date.now() : null
          }
        },
        {
           new: true 
          
        }
      ).select("+content").populate('analytics');
      if (!updatedPost) {
        return res.status(500).json({ message: 'Unable to update the post!' });
      }

     const analyticsPage = await Page.findOneAndUpdate({
       _id: updatedPost.analytics._id,
      },
        {
          $set: {
            title: updatedPost.title,
            slug: updatedPost.slug,
          }
        });
      if (!analyticsPage) {
        return res.status(500).json({ message: 'Unable to update the page!' });
      }


      return res.status(200).json({ message: 'Post Updated Successfully!', post: updatedPost });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message || "Something went wrong",
      });
    }
  });
