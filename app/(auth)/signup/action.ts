"use server";
import { customAlphabet } from "nanoid";

import { generateToken } from "emails/helper";
import dbConnect from "src/lib/dbConnect";
import { mailFetch } from "src/lib/server-fetch";
import UserModel from "src/models/user";

const dbcache = new Map<string, boolean>();

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    if (dbcache.has(data.email)) {
      return Promise.reject({
        success: false,
        message: "email already exists",
      });
    }
    await dbConnect();
    const userExit = await UserModel.exists({ email: data.email });
    if (userExit) {
      dbcache.set(data.email, true);

      return Promise.reject({
        success: false,
        message: "email already exists",
      });
    }
    const newUser = new UserModel({
      name: data.name,
      email: data.email,
      password: data.password,
      username: customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        10
      )(),
      verificationToken: generateToken({ email: data.email }),
    });
    await newUser.save();
    const response = await mailFetch<{
      data: string[] | null;
      error?: string | null | object;
    }>("/api/send", {
      method: "POST",
      body: JSON.stringify({
        template_key: "welcome_verify",
        targets: [newUser.email],
        subject: "🌟 Welcome to Nexonauts - Verify Your Account! 🌟",
        payload: {
          name: newUser.name,
          email: newUser.email,
          verifyUrl: `${process.env.NEXTAUTH_URL}/verify-user?token=${newUser.verificationToken}`,
          platform_name: "Nexonauts",
        },
      }),
    });
    if (response.error) {
      return Promise.resolve({
        success: true,
        message: "User created successfully but Error sending email",
      });
    }
    console.log("Mail sent");

    return Promise.resolve({
      success: true,
      message: "User created successfully and verification email sent",
    });
  } catch (e) {
    console.log(e);
    return Promise.reject({
      success: false,
      message: "An error occurred while creating user",
    });
  }
}
