import handler from 'lib/handler';
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler)
.use(hasTokenMiddleware)
.put(async (req, res) => {
    try {
        await dbConnect();

        const { userId } = req.query;
        const { currentPassword,newPassword } = req.body;
        const user = await User.findById(userId).select('+password');

        if (!user) { throw new Error('No user with a matching email was found.') }

        // Use the comparePassword method we defined in our user.js Model file to authenticate
        const pwValid = await user.comparePassword(currentPassword);
        if (pwValid !== true) { throw new Error("current password is invalid") }
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated Successfully!', user: user })

    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            message: err.message || " Something went wrong",
        })
    }

})