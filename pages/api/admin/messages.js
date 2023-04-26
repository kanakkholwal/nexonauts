import handler from 'lib/handler';
import ContactMail from "models/contactMail";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler).use(isAdminMiddleware)
    .get(async (req, res, next) => {
        try {
            await dbConnect();
            const contacts = await ContactMail.find({});
            return res.status(200).json(contacts);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    })

