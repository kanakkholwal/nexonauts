import { verifyToken } from "emails/helper";
import dbConnect from "lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from 'src/models/user';

export async function GET(request: NextRequest) {
    try {
        // get token from request

        const token = request.nextUrl.searchParams.get('token');

        if (!token) {
            return NextResponse.json({
                result: "fail",
                message: "token is required",
            }, {
                status: 400
            })
        }
        const payload = verifyToken(token);
        console.log(`payload`, payload);
        if (!payload) {
            return NextResponse.json({
                result: "fail",
                message: "invalid token",
            }, {
                status: 400
            })
        }
        //  check if token is expired
        if (payload && payload?.exp && Date.now() >= payload.exp * 1000) {
            return NextResponse.json({
                result: "fail",
                message: "token expired",
            }, {
                status: 400
            })
        }
        console.log('Token is valid. payload:', payload);

        // verify user
        await dbConnect();
        const user = await UserModel
            .findOneAndUpdate({ email: payload.email }, { verified: true, verificationToken: null })
            .exec();
        if (!user) {
            return NextResponse.json({
                result: "fail",
                message: "user not found",
            }, {
                status: 400
            })
        }
        console.log("User verified successfully");

        return NextResponse.json({
            result: "success",
            message: 'User verified successfully',
        }, {
            status: 200
        })

    }
    catch (error) {
        return NextResponse.json({
            result: "fail",
            message: error.message,
        }, {
            status: 500
        })
    }


}
