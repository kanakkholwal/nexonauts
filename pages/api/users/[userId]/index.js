import handler from 'lib/handler';
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import { getToken } from "next-auth/jwt";
import nextConnect from 'next-connect';

export default nextConnect(handler)
.use(hasTokenMiddleware)

  .get(async (req, res,next) => {
      try {
      await dbConnect();
      console.log("Connected to db")

      const { userId } = req.query;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
     

      return res.status(200).json({ message: 'User fetched successfully!',success:true, user: user });
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        message: err.message || "Something went wrong",
      });
    }
  })
.put(async (req, res) => {
    await dbConnect();

    const { userId } = req.query;
    const { user } = req.body;

    if (!user) {
      return res.status(401).json({
        message: 'User is required',
      });
    }

    if (!user.id) {
      return res.status(401).json({
        message: 'User ID is required',
      });
    }

    if (user.id !== userId) {
      return res.status(401).json({
        message: 'User ID is not valid',
      });
    }

    try {
      const currentUser = await User.findById(user.id);

      if (!currentUser) {
        return res.status(401).json({
          message: 'User not found',
        });
      }

      const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

      if (!(token.user.id === userId && token.user.id === currentUser._id.toString() && token.user.id === user.id)) {
        return res.status(401).json({
          message: 'You are not authorized to access this resource',
        });
      }

      currentUser.profileURL = user.profileURL;
      currentUser.name = user.name;
      
      if(currentUser.username !== user.username){
        const usernameExists = await User.findOne({ username: user.username });
        if (usernameExists) {
            return res.status(401).json({
                message: 'Username already exists',
            });
            }
        else {
            currentUser.username = user.username;
        }
      }
      await currentUser.save();

      return res.json({
        message: 'User updated successfully',
        user: {
            id: currentUser._id,
            name: currentUser.name,
            username: currentUser.username,
            profileURL: currentUser.profileURL,
            email: currentUser.email,
        },
      });
    } catch (error) {
      return res.status(401).json({
        message: error.message || "Something went wrong",
      });
    }
  });
