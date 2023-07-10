import handler from 'lib/handler';
import dbConnect from "lib/dbConnect";
import { isAdminMiddleware } from 'middleware/checkUser';
import nextConnect from 'next-connect';
import { checkUser } from 'lib/checkUser';
import User from "models/user";
import App from "models/app";
import AllApps from 'lib/apps';

import type {newApp } from "types/app";

export default nextConnect(handler)
    .use(isAdminMiddleware)
    .post(async (req, res) => {
        try {
            await dbConnect();
            const { userId ,appData } = req.body;
            const existingUser = await User.findById(userId);
            if (!existingUser) {
              return res.status(404).json({ message: 'User not found!' });
            }
          
            const result = await checkUser(req, existingUser);
            if (!result.verified) {
              return res.status(401).json({ verified: result.verified, message: result.message });
            }
            // check if user is admin of not 
            if(result.isAdmin !== true)
            {
                return res.status(401).json({ message: 'You are not authorized to create app!' });
            }
            // user is verified
            const newAppData:newApp = {
                name: appData.name,
                description: appData.description,
                shortDescription: appData.description,
                enabled: AllApps.findIndex(app => app.appId === appData.appId) > -1 ? true : false,
                appId: appData.appId,
                type: appData.type,
                path: appData.path,
                coverImage: appData.appImage,
                recommended: appData.recommended,
                usage:[],
                reviews:[],
                ratings:[],
                membership: appData.membership,
                category: appData.category,
                tags: appData.tags,
                author:{
                    name: existingUser.name,
                    userId: existingUser._id,
                    username:existingUser.username,
                },
                createdAt: new Date(),
                average_rating: 0,
                formFlow: appData.formFlow,
            }
            const isExistingApp = await App.findOne({appId:appData.appId});
            if(isExistingApp){
                return res.status(403).json({ message: 'App already exists!' });
            }
            const newApp = await App.create(newAppData);
            if(!newApp){
                return res.status(400).json({ message: 'App creation failed!' });
            }
            // return application
            return res.status(200).json({ result:newApp,message:"App created successfully" });


        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message ?? "Internal Server Error" });
        }
    })