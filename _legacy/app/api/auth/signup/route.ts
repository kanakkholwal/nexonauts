import { generateToken } from "emails/helper";
import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "src/lib/db";
import { mailFetch } from "src/lib/server-fetch";
import UserModel from "src/models/user";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    // get request body
    const { name, email, password } = await request.json();

    //  validate name , email and password
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          result: "fail",
          message: "name, email and password are required",
        },
        {
          status: 400,
        }
      );
    }
    // validate email and password
    if (!z.string().email().safeParse(email).success) {
      return NextResponse.json(
        {
          result: "fail",
          message: "invalid email",
        },
        {
          status: 400,
        }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        {
          result: "fail",
          message: "password must be at least 6 characters long",
        },
        {
          status: 400,
        }
      );
    }

    await dbConnect();
    //  check if user already exists
    const user = await UserModel.findOne({ email: email }).exec();
    if (user) {
      return NextResponse.json(
        {
          result: "fail",
          message: "user already exists",
        },
        {
          status: 400,
        }
      );
    }
    // create new user
    const newUser = new UserModel({
      name,
      email,
      password,
      username: email.split("@")[0],
      providers: ["email"],
      verificationToken: generateToken({ email }),
    });
    // save user
    await newUser.save();
    const response = await mailFetch<{
      data: string[] | null;
      error?: string | null | object;
    }>("/api/send", {
      method: "POST",
      body: JSON.stringify({
        template_key: "welcome_verify",
        targets: [user.email],
        subject: "🌟 Welcome to Nexonauts - Verify Your Account! 🌟",
        payload: {
          platform_name: "Nexonauts",
          name: user.name,
          email: user.email,
          verifyUrl: `${process.env.NEXTAUTH_URL}/verify-user?token=${newUser.verificationToken}`,
        },
      }),
    });
    if (response.error) {
      return NextResponse.json({
        result: "fail",
        message: "User is registered successfully but Error sending email",
      },{
        status: 500,
      });
    }
    console.log("Mail sent");

    return NextResponse.json(
      {
        result: "success",
        message:
          "User is registered Successfully, Please verify your Email Now!!!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        result: "fail",
        message: error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
