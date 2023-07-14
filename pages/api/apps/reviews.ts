import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';

import { checkUser } from 'lib/checkUser';
import User from "models/user";
import App from "models/app";
import type {App as AppType } from "types/app";

export default nextConnect(handler)
    .use(hasTokenMiddleware)
    .post(async (req, res) => {
        try {
            await dbConnect();
            const { userId ,appId } = req.body;
            const existingUser = await User.findById(userId);
            if (!existingUser) {
              return res.status(404).json({ message: 'User not found!' });
            }
          
            const result = await checkUser(req, existingUser);
            if (!result.verified) {
              return res.status(403).json({ verified: result.verified, message: result.message });
            }
   
            // user is verified
            const existingApp  = await App.findOne({appId:appId}).select("+reviews").exec();
            if(!existingApp){
                return res.status(403).json({ message: `App doesn't  exist!` });
            }
            const output = {
                appId:existingApp.appId,
                reviews:existingApp.reviews,
                count:existingApp.reviews.length,
                _id:existingApp._id
            }

            // return application
            return res.status(200).json({ message:"Reviews fetched successfully" ,result:output,success:true});


        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })