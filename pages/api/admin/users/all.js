import handler from 'lib/handler';
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler)
    .use(isAdminMiddleware)
    .post(async (req, res) => {
        try {
            await dbConnect();

            const { adminId } = req.body;
            const user = await User.findById(adminId);

            if (!user) {
                return res.status(402).json({ message: 'User not found in Database!' })
            }
            if (!(user.role === "admin"))
                return res.status(401).json({
                    message: 'You are not admin',
                });

            const allUsers = await User.find({})
            return res.status(200).json({ message: 'All Users fetched Successfully!', users: allUsers})


        }
        catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || " Something went wrong",
            })
        }

    })