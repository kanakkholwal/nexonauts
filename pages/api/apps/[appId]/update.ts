import { checkUser } from 'lib/checkUser';
import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import { hasTokenMiddleware } from 'middleware/checkUser';
import App from "models/app";
import User from "models/user";
import nextConnect from 'next-connect';

export default nextConnect(handler)
    .use(hasTokenMiddleware)
    .put(async (req, res) => {
        try {
            await dbConnect();
            const { appId } = req.query;
            const { userId, appData } = req.body;
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found!' });
            }

            const result = await checkUser(req, existingUser);
            if (!result.verified) {
                return res.status(403).json({ verified: result.verified, message: result.message });
            }
            // check if user is admin of not 
            // if (result.isAdmin !== true) {
            //     return res.status(403).json({ message: 'You are not authorized to create app!' });
            // }

            // user is verified
            const existingApp = await App.findById(appId);
            if (!existingApp) {
                return res.status(403).json({ message: `App doesn't  exist!` });
            }
            // update existingApp with appData with only those fields which are present in appData
            const updatedApp = await App.updateOne({ _id: existingApp._id }, appData)

            // return application
            return res.status(200).json({ message: "App updated successfully", app: updatedApp });


        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })