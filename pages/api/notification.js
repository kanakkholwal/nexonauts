import handler from 'lib/handler';
import { isAdminMiddleware } from 'middleware/checkUser';
import Notification from "models/notification";
import dbConnect from "lib/dbConnect";



handler
    .use(isAdminMiddleware)
    .get(getNotifications)

async function getNotifications(req, res, next) {
    await dbConnect();

    try {
        const notifications = await Notification.find({});

        // sort by date
        notifications.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return res.status(200).json({ notifications, message: "Notifications fetched successfully" });

    } catch (error) {

        console.log(error);
        return res.status(500).json({ error: "Internal server error", message: error.message });
    }

}

export default handler