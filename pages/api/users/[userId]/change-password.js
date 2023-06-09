import handler from 'lib/handler';
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';
import { checkUser } from 'lib/checkUser';

export default nextConnect(handler)
    .use(hasTokenMiddleware)
    .put(async (req, res) => {
        try {
            await dbConnect();

            const { userId } = req.query;
            const { currentPassword, newPassword } = req.body;
            const user = await User.findById(userId).select('+password');
            if (!user) {
                throw new Error('No user with a matching email was found.');
            }
            const result = await checkUser(req, user);
            if (!result.verified) {
                return res.status(404).json({ verified: result.verified, message: result.message });
            }

            // Use the comparePassword method we defined in our User model to authenticate
            const isPasswordValid = await user.comparePassword(currentPassword);
            if (!isPasswordValid) {
                throw new Error("Current password is invalid.");
            }

            user.password = newPassword;
            await user.save();

            return res.status(200).json({ message: 'Password updated successfully!', user: user });
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || "Something went wrong",
            });
        }
    });
