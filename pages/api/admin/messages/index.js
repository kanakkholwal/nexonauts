import handler from 'lib/handler';
import Message from "models/message";
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';


export default nextConnect(handler).use(isAdminMiddleware)
    .get(async (req, res, next) => {
        try {
            await dbConnect();
            const messages = await Message.find({});
            return res.status(200).json({ message: "Messages fetched SuccessFully", messages });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    })
    .put(async (req, res, next) => {
        try {
            await dbConnect();
            const { messageId, read, type } = req.body;
            const message = await Message.findById(messageId);
            if (!message) {
                return res.status(404).json({ error: "Message not found" });
            }
            message.read = read;
            if (type)
                message.type = type;
            await message.save();
            return res.status(200).json({ message: "Messages updated SuccessFully" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    })
    .delete(async (req, res, next) => {
        try {
            await dbConnect();
            const { messageId } = req.body;
            const message = await Message.findById(messageId);
            if (!message) {
                return res.status(404).json({ error: "Message not found" });
            }
            await message.remove();
            return res.status(200).json({ message: "Messages deleted SuccessFully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    })

