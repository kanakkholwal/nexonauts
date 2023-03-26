import User from 'models/user';
import dbConnect from 'lib/dbConnect';
import handler from 'lib/handler';
import { isAdminMiddleware } from 'middleware/checkUser';


handler
    .post(createUser)

async function createUser(req, res) {


    try {
        await dbConnect();

        if (req.body.role.includes("admin") && !isAdminMiddleware(req, res)) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const user = await User.create(req.body);

        res.status(201).json({ message: 'Created user!', user });

    }
    catch (error) {
        res.status(400).json({ message: 'Something went wrong' });
    }


}

export default handler;