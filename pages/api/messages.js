import handler from 'lib/handler';
import Message from "models/message";
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';


export default nextConnect(handler)
    .post(async (req, res, next) => {
        try {
            await dbConnect();
            const message = new Message({
                name: req.body.name,
                message: req.body.message,
                email: req.body.email,
                category: req.body.category || "General",
                companyName:req.body.companyName || "Personal",
                phoneNumber:req.body.phoneNumber || "Not Provided",
                type:req.body.type || "NORMAL",
            });
            await message.save();
        
            return res.status(200).json({ message: "Message sent successfully" });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    })

