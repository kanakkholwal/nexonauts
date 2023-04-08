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
            const { user } = req.query;

            // Verify admin account from database
            const adminUser = await User.findById(adminId);
            if (!adminUser) {
                return res.status(404).json({ message: 'User not found in Database!' })
            }
            if (!(adminUser.role === "admin"))
                return res.status(401).json({
                    message: 'You are not admin',
                });

            // Create new user
            const newUser = await User.create({
                name: user.name,
                email: user.email,
                password: user.password,
                role: 'user',
                account_type: user.role,
            });
            // return the new user
            return res.status(200).json({ message: 'User created Successfully!', user: newUser })

        }
        catch (err) {
            console.log(err);
            return res.status(401).json({
                message: err.message || " Something went wrong",
            })
        }

    })