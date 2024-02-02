import { render } from "@react-email/render";
import { generateToken, handleEmailFire } from 'emails/helper';
import ResetPasswordEmail from "emails/templates/reset-password";
import dbConnect from "lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from 'src/models/user';

import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function POST(request: NextRequest) {
    try {

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                result: "fail",
                message: 'User is not authenticated',
            }, {
                status: 401
            })

        }

        await dbConnect();
        const user = await UserModel.findOne({ email: session.user.email }).select('name email verificationToken');

        user.verificationToken = generateToken(user.email);
        await user.save();


        // send verification email
        await handleEmailFire(`Nexonauts <no_reply@nexonauts.com>`, {
            to: user.email,
            subject: `🌟 Reset Your NexonautsPassword 🛠️ `,
            html: render(ResetPasswordEmail({
                payload: {
                    name: user.name,
                    email: user.email,
                    resetUrl: `${process.env.NEXTAUTH_URL}/verify-user?token=${user.verificationToken}`
                },
            })),
        })
        console.log("Mail sent");




        return NextResponse.json({
            result: "success",
            message: 'Please check your Email Now!!!',
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
