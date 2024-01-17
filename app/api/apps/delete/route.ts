import { authOptions } from "app/api/auth/[...nextauth]/options";
import dbConnect from "lib/dbConnect";
import AppModel from "models/app";
import User from "models/user";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const appId = request.nextUrl.searchParams.get('appId')

        const session = await getServerSession({ req: request, ...authOptions });
        if (!session) {
            return NextResponse.json({
                result: "fail",
                message: 'Unauthorized',
            },{
                status:401
            })
        }
        console.log(session)
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
        const isExistingApp  = await AppModel.findOne({
            appId: appId,
            "developer.userId": session.user._id,
        })
        if(!isExistingApp){
            return NextResponse.json({
                result: "fail",
                message: `App doesn't  exist!`,
            },{
                status:404
            })
        }
        const deletedApp = await AppModel.findByIdAndDelete(isExistingApp._id);
        if(!deletedApp){
            return NextResponse.json({
                result: "fail",
                message: `App doesn't  exist!`,
            },{
                status:404
            })
        }
        revalidatePath(`/dashboard/apps`,'page')

        return NextResponse.json({
            result: "success",
            message: 'App deleted successfully',
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
