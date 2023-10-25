import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import { isAdminMiddleware } from 'middleware/checkUser';
import App from "models/app";
import nextConnect from 'next-connect';


const LIMIT = 5;

export default nextConnect(handler)
    .post(async (req, res) => {
        try {
            await dbConnect();
            // find all enabled apps
            const apps = await App.find({
                isPublic: true, status: "published"
            }).select('name shortDescription description appId type path coverImage recommended version ratings membership category tags author createdAt averageRating formFlow')
                .exec();

            if (!apps) {
                return res.status(403).json({ message: `No apps found!` });
            }
            // convert query result to array of objects

            // sort apps on the basis of recommended , usage , rating and reviews and send popular 5-10 (variable) apps
            const popularApps = await App.find({
                enabled: true, state: "published"
            }).sort({ recommended: -1, usage: -1, ratings: -1 })
                .select('name appId type path recommended ratings')
                .limit(LIMIT)


            // return application
            return res.status(200).json({
                apps,
                popularApps,
                success: true,
                message: `Successfully fetched all apps!`
            });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })
    .use(isAdminMiddleware)
    .get(async (req, res) => {
        try {
            await dbConnect();
            // find all enabled apps
            const apps = await App.find({})
            .select('name shortDescription appId path coverImage recommended version membership category tags author createdAt')
            .exec()
            if (!apps) {
                return res.status(403).json({ message: `No apps found!`, apps: [] });
            }
            // return application
            return res.status(200).json({ apps });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })