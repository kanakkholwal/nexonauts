import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import App from "models/app";
import mongoose from "mongoose";
import nextConnect from 'next-connect';
// import { isAdminMiddleware } from 'middleware/checkUser';

export default nextConnect(handler)
    .get(async (req, res) => {
        try {
            await dbConnect();
            const { appId } = req.query;
            // find app by id
            const currentApp = await App.findById(appId);
            if(!currentApp){
                return res.status(403).json({ message: `App not found!` });
            }

            
            const relatedApps = await App.aggregate([
                {
                  $match: {
                    _id: { $ne: new mongoose.Types.ObjectId(appId) }, // Exclude the current app
                    category: currentApp.category,
                    enabled:true
                  },
                },
                {
                  $sort: { usage: -1 }, // Sort by 'usage' in descending order
                },
                {
                  $project: {
                    _id: 1,
                    appId: 1,
                    name: 1,
                    category: 1,
                    tags: 1,
                    author: 1,
                    path: 1,
                    coverImage: 1,
                    recommended: 1,
                    shortDescription: 1,
                    averageRating: 1,
                  },
                },
              ]);
          

            // return application
            return res.status(200).json({ 
                message:"Apps fetched successfully" ,
                result:relatedApps,
                success:true
            });

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })
  