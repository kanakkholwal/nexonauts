import { authOptions } from "app/api/auth/[...nextauth]/options";
import dbConnect from "lib/dbConnect";
import AppModel from "models/app";
import User from "models/user";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {

        const session = await getServerSession({ req: request, ...authOptions });
        if (!session) {
            return NextResponse.json({
                result: "fail",
                message: 'Unauthorized',
            },{
                status:401
            })
        }
        // const res = await request.json();
        // console.log(res)
        await dbConnect();
        const existingUser = await User.findById(session.user._id);
        if (!existingUser) {
            return NextResponse.json({
                result: "fail",
                message: 'User not found',
            },{
                status:404
            })
        }
        const newApp = await AppModel.create({
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
        return NextResponse.json({
            result: "success",
            message: "Application created successfully",
        },{
            status:200
        })
    }
    catch (error) {
        return NextResponse.json({
            result: "fail",
            message: error.message,
        },{
            status:500
        })
    }


}
