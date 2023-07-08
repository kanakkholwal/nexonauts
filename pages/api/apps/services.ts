import handler from 'lib/handler';
import User from "models/user";
import dbConnect from "lib/dbConnect";
import { hasTokenMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';
import { checkUser } from 'lib/checkUser';
import Apps from 'lib/openai';

export default nextConnect(handler)
    .use(hasTokenMiddleware)
    .post(async (req, res) => {
        try {
            await dbConnect();
            const { userId ,appData} = req.body;
            const existingUser = await User.findById(userId);
            if (!existingUser) {
              return res.status(404).json({ message: 'User not found!' });
            }
          
            const result = await checkUser(req, existingUser);
            if (!result.verified) {
              return res.status(404).json({ verified: result.verified, message: result.message });
            }
            // user is verified
            // check for account type and if it is free then check for usage
            if(existingUser.accountType === "free"){
                // check for usage
                if(existingUser.usage.apps >= 5){
                    return res.status(404).json({ message: 'You have reached your limit for free account. Please upgrade your account to use more apps.' });
                }
            }
            // check if app exists
            const app = Apps.find(app => app.appId === appData.appId);
            if(!app){
                return res.status(404).json({ message: 'App not found!' });
            }
            // check if app is enabled
            // if(!appData.enabled){
            //     return res.status(404).json({ message: 'App is not enabled!' });
            // }
        
            // check if app is enabled for user
            // if(!existingUser.apps. (appData.appId)){
            //     return res.status(404).json({ message: 'App is not enabled for you!' });
            // }
            
            // execute app with App Data 
            const resultData = await app.execute(appData);
            // update usage
            return res.status(200).json({ result:resultData,message:"Output generated successfully" });


        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })