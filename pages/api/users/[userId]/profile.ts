import handler from 'lib/handler';
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasSsrMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';

export default nextConnect(handler)
    .get(async (req, res, next) => {
        try {
            await hasSsrMiddleware(req, res, next);
            await dbConnect();

            const { userId: username } = req.query;
            const user = await User.findOne({ username: username });

            if (!user) {
                return res.status(404).json({ message: 'User not found!', success: false });
            }


            return res.status(200).json({ message: 'User fetched successfully!', success: true, user: user });
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || "Something went wrong", success: false
            });
        }
    })