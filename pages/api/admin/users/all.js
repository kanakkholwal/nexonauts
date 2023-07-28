import handler from 'lib/handler';
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasSsrMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler)
    // .use()
    .post(async (req, res,next) => {
        try {
            await hasSsrMiddleware(req, res,next);
            await dbConnect();

            const { adminId } = req.body;
            const user = await User.findById(adminId);

            if (!user) {
                return res.status(402).json({
                    message: 'User not found in Database!', success: false
                })
            }
            if (!(user.role === "admin"))
                return res.status(401).json({
                    message: 'You are not admin',
                    success: false
                });

            const allUsers = await User.find({})
            return res.status(200).json({ message: 'All Users fetched Successfully!', users: allUsers, success: true })


        }
        catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || " Something went wrong",
                success: false

            })
        }

    })