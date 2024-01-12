import { checkUser } from 'lib/checkUser';
import dbConnect from "lib/dbConnect";
import handler from 'lib/handler';
import { hasTokenMiddleware } from 'middleware/checkUser';
import App from "models/app";
import User from "models/user";
import nextConnect from 'next-connect';

import type { NextApiRequest, NextApiResponse } from 'next';


export default nextConnect(handler)
    .use(hasTokenMiddleware)
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            await dbConnect();
            const { userId} = req.body;
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({ message: 'User not found!' });
            }

            const result = await checkUser(req, existingUser);
            if (!result.verified) {
                return res.status(401).json({ verified: result.verified, message: result.message });
            }
            const newApp = await App.create({
                appId:"app_"+ Date.now(),
                developer:{
                    userId:existingUser._id.toString(),
                    username:existingUser.username,
                    name:existingUser.name
                },
                status:"draft",
                version:"0.0.1",
                name:"New App",
                path:"/apps/app_" + Date.now(),
                shortDescription:"Short description",
                description:"Description",
                config : null,
                formFlow:{
                    menuType:"text_input_to_text_output",
                    inputs:[],
                    controls:[],
                    outputs:[]
                }
            });
            await newApp.save();
            // return application
            return res.status(200).json({
                result: "success",
                message: "Application created successfully",
                data: newApp
             });


        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ 
                result: "fail",
                data:null,
                message: error.message,
             });
        }
    })
