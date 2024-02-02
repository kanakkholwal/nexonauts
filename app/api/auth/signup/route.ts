import { render } from "@react-email/render";
import { generateToken, handleEmailFire } from 'emails/helper';
import WelcomeVerify from "emails/templates/welcome-verify";
import dbConnect from "lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from 'src/models/user';
import validator from 'validator';

export async function POST(request: NextRequest) {
    try {

        // get request body
        const { name, email, password } = await request.json();

        //  validate name , email and password
        if (!name || !email || !password) {
            return NextResponse.json({
                result: "fail",
                message: "name, email and password are required",
            }, {
                status: 400
            })
        }
        // validate email and password
        if (!validator.isEmail(email)) {
            return NextResponse.json({
                result: "fail",
                message: "invalid email",
            }, {
                status: 400
            })
        }
        if (password.length < 6) {
            return NextResponse.json({
                result: "fail",
                message: "password must be at least 6 characters long",
            }, {
                status: 400
            })
        }

        await dbConnect();
        //  check if user already exists
        const user = await UserModel
            .findOne({ email: email })
            .exec();
        if (user) {
            return NextResponse.json({
                result: "fail",
                message: "user already exists",
            }, {
                status: 400
            })
        }
        // create new user
        const newUser = new UserModel({
            name,
            email,
            password,
            username: email.split('@')[0],
            providers: ['email'],
            verificationToken: generateToken({ email }),
        });
        // save user
        await newUser.save();
        // send verification email
        await handleEmailFire(`Nexonauts <no_reply@nexonauts.com>`, {
            to: newUser.email,
            subject: `🌟 Welcome to Nexonauts - Verify Your Account! 🌟`,
            html: render(WelcomeVerify({
                payload: {
                    name: newUser.name,
                    email: newUser.email,
                    verifyUrl: `${process.env.NEXTAUTH_URL}/verify-user?token=${newUser.verificationToken}`
                },
            })),
        })
        console.log("Mail sent");




        return NextResponse.json({
            result: "success",
            message: 'User is registered Successfully, Please verify your Email Now!!!',
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
