import handler from 'lib/handler';
import Notification from "models/notification";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler).use(isAdminMiddleware)
    .get(async (req, res, next) => {
        try {
            await dbConnect();
            const notifications = await Notification.find({}).populate('user');
            return res.status(200).json({message:"Notification fetched SuccessFully",notifications});

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    })

