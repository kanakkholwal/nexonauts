import handler from 'lib/handler';
import User from "models/user";
import Post,{Comment} from "models/post";
import Page from "models/page";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import { checkUser } from 'lib/checkUser';
import nextConnect from 'next-connect';
import mongoose from 'mongoose';
export default nextConnect(handler)
    .use(hasTokenMiddleware)
    .get(async (req, res) => {


        try {
            await dbConnect();
          
            const { userId } = req.query;
          
            const existingUser = await User.findById(userId);
            if (!existingUser) {
              return res.status(402).json({
                 message: 'User not found!',
                 success: false,
                 });
            }
            
            const result = await checkUser(req, existingUser);
            if (!result.verified) {
              return res.status(402).json({ verified: result.verified, message: result.message,
                success: false,
            });
            }
            console.log("User verified",userId);


            const posts = await Post.find({ author: mongoose.Types.ObjectId(userId) })
            .populate('analytics')
            .populate('author')
            .populate('comments')
            .exec();
                        
          
            // const {posts} = await existingUser.populate('posts')
            // const posts = await Promise.all(existingUser.posts.map(async (post) => {
            //     return await getMoreFromPost(post.toString())
            // }))
            console.log(posts);
          
            return res.status(200).json({ message: 'Posts fetched successfully!', posts,
            success: true,
        });
          } catch (err) {
            console.error(err);
            return res.status(500).json({ message: err.message || 'Something went wrong'
            ,success: false,
        });
          }


    })

async function getMoreFromPost(postId){

    const post  = await Post.findOne({ _id: postId })
    .populate('analytics')
    .populate('author')
    .populate('comments')
    .exec();
    const _comments = await Comment.find({ post: postId });
 
    
    return {
            _id:post._id,
            slug:post.slug,
            title:post.title,
            description:post.description,
            image:post.image,
            createdAt:post.createdAt,
            author:post.author,
            analytics:post.analytics,
            comments:post.comments,
            state:post.state,
            publishedAt:post.publishedAt,
            labels:post.labels,
            noOfComments: _comments.length,

        }
        




    }