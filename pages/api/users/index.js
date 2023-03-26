import handler from 'lib/handler';
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';


export default handler.use(isAdminMiddleware).get(async (req, res) => {
    try {
        await dbConnect();

        const { userId } = req.body;
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' })
        }
        return res.status(200).json({ message: 'User fetched Successfully!', user: user })


    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            message: err.message || " Something went wrong",
        })
    }

}).put(async (req, res) => {

    await dbConnect();

    const { userId } = req.query;
    const { user } = req.body;

    if (!user)
        return res.status(401).json({
            message: 'User is required',
        })

    if (!user.id)
        return res.status(401).json({
            message: 'User Id is required',
        })
    if (user.id !== userId)
        return res.status(401).json({
            message: 'User Id is not valid',
        })

    try {
        const currentUser = await User.findById(user.id);

        if (!currentUser) {
            return res.status(401).json({
                message: 'User not found',
            })
        }
        currentUser.profileURl = user.profileURl;
        currentUser.name = user.name;
        currentUser.save();

        return res.json({
            message: 'User updated successfully ',
            user: user
        })



    } catch (error) {
        return res.status(401).json({
            message: error.message || " Something went wrong",
        })
    }

})

