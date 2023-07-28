import handler from 'lib/handler';
import User from "models/user";
// import App from "models/app";
import Post,{Comment}  from "models/post";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';

export default nextConnect(handler)
.use(isAdminMiddleware)
    .delete(async (req, res, next) => {
        try {
            await dbConnect();

            const { userId } = req.query;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found!', success: false });
            }
            // find comments and delete them
            await Comment.deleteMany({ userId: user._id });
            console.log("comments deleted");
       
            // find posts and delete them
            await Post.deleteMany({ author: user._id,state:"draft"  });
            console.log("draft posts deleted");
            // delete user
            await User.deleteOne({ _id: user._id });
            console.log("user deleted");

            return res.status(200).json({ message: 'User deleted successfully!', success: true });

        
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || "Something went wrong", 
                success: false
            });
        }
    })