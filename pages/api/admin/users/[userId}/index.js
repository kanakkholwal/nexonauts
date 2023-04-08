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
            const { userId } = req.query;
            const adminUser = await User.findById(adminId);

            if (!adminUser) {
                return res.status(404).json({ message: 'User not found in Database!' })
            }
            if (!(adminUser.role === "admin"))
                return res.status(401).json({
                    message: 'You are not admin',
                });

            const user = await User.findById(userId);

            return res.status(200).json({ message: 'User fetched Successfully!', user })

        }
        catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || " Something went wrong",
            })
        }

    })
    .put(async (req, res) => {
        try {
            await dbConnect();

            const { adminId } = req.body;
            const { userId, user } = req.query;
            const adminUser = await User.findById(adminId);

            if (!adminUser) {
                return res.status(404).json({ message: 'User not found in Database!' })
            }
            if (!(adminUser.role === "admin"))
                return res.status(401).json({
                    message: 'You are not admin',
                });

            const updatedUser = await User.findOneAndUpdate({
                _id: userId
            }, {
                $set: {
                    name: user.name,
                    email: user.email,
                    profileURl: user.profileURl
                }
            });

            return res.status(200).json({ message: 'User updated Successfully!', data: updatedUser })

        }
        catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || " Something went wrong",
            })
        }

    })
    .delete(async (req, res) => {
        try {
            await dbConnect();

            const { adminId } = req.body;
            const { userId } = req.query;
            const adminUser = await User.findById(adminId);

            if (!adminUser) {
                return res.status(404).json({ message: 'User not found in Database!' })
            }
            if (!(adminUser.role === "admin"))
                return res.status(401).json({
                    message: 'You are not admin',
                });

            const data = await User.findByIdAndRemove(userId);

            return res.status(200).json({ message: 'User deleted Successfully!', data })


        }
        catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || " Something went wrong",
            })
        }

    })