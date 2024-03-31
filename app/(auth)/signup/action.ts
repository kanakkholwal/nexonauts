"use server";
import { customAlphabet } from 'nanoid';

import { render } from "@react-email/render";
import { generateToken, handleEmailFire } from 'emails/helper';
import WelcomeVerify from "emails/templates/welcome-verify";
import dbConnect from "src/lib/dbConnect";
import UserModel from 'src/models/user';

const dbcache = new Map<string, boolean>();



export async function registerUser(data: {
    name: string,
    email: string,
    password: string
}) {
    try {
        if (dbcache.has(data.email)) {
            return Promise.reject({
                success: false,
                message: "email already exists",
            })
        }
        await dbConnect();
        const userExit = await UserModel.exists({ email: data.email });
        if (userExit) {
            dbcache.set(data.email, true);

            return Promise.reject({
                success: false,
                message: "email already exists",
            })
        }
        const newUser = new UserModel({
            name: data.name,
            email: data.email,
            password: data.password,
            username: customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 10)(),
            verificationToken: generateToken({ email: data.email }),
        });
        await newUser.save();
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
        });
        console.log("Mail sent");

        return Promise.resolve({
            success: true,
            message: "User created successfully and verification email sent",
        })


    } catch (e) {
        console.log(e);
        return Promise.reject({
            success: false,
            message: "An error occurred while creating user"
        })

    }

}