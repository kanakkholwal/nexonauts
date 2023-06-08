import handler from 'lib/handler';
import User from "models/user";
import Post,{Comment} from "models/post";
import Page from "models/page";
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
          
            // const {posts} = await existingUser.populate('posts')
            const posts = await Promise.all(existingUser.posts.map(async (post) => {
                return await getMoreFromPost(post.toString())
            }))
            // console.log(posts);
          
            return res.status(200).json({ message: 'Posts fetched successfully!', posts });
          } catch (err) {
            console.error(err);
            return res.status(500).json({ message: err.message || 'Something went wrong' });
          }


    })

   async function getMoreFromPost(postId){

    const post  = await Post.findOne({ _id: postId })
    .populate('analytics')
    .exec();
    const _comments = await Comment.find({ post: postId });
 
    
    return {
            _id:post._id,
            title:post.title,
            description:post.description,
            image:post.image,
            createdAt:post.createdAt,
            analytics:post.analytics,
            comments:post.comments,
            state:post.state,
            publishedAt:post.publishedAt,
            labels:post.labels,
            noOfComments: _comments.length,

        }
        




    }