import User from 'models/user';
import dbConnect from 'lib/dbConnect';
import handler from 'lib/handler';


handler
    .use(hasTokenMiddleware)
    .put(async (req, res) => {
        const { user } = req.body;


        if (!user.id)
            return res.status(401).json({
                message: 'User Id is required',
            })

        try {
            await dbConnect();
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

export default handler