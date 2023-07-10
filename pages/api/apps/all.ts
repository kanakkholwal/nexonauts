import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import nextConnect from 'next-connect';
import App from "models/app";
import type { App as AppType } from "types/app";
import { isAdminMiddleware } from 'middleware/checkUser';

export default nextConnect(handler)
    .post(async (req, res) => {
        try {
            await dbConnect();
            // find all enabled apps
            const apps = await App.find({ enabled: true }) as AppType[];
            if (!apps) {
                return res.status(403).json({ message: `No apps found!` });
            }
            // return application
            return res.status(200).json({ apps });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })
    .use(isAdminMiddleware)
    .get(async (req, res) => {
        try{
            await dbConnect();
            // find all enabled apps
            const apps = await App.find({ }) as AppType[] | null;
            if (!apps) {
                return res.status(403).json({ message: `No apps found!`,apps: [] });
            }
            // return application
            return res.status(200).json({ apps });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })