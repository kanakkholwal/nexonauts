import { generateToken } from "emails/helper";
import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "src/lib/db";
import UserModel from "src/models/user";

import { mailFetch } from "src/lib/server-fetch";
import { getSession } from "~/auth/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        {
          result: "fail",
          message: "User is not authenticated",
        },
        {
          status: 401,
        }
      );
    }

    await dbConnect();
    const user = await UserModel.findOne({ email: session.user.email }).select(
      "name email verificationToken"
    );

    user.verificationToken = generateToken(user.email);
    await user.save();
    const response = await mailFetch<{
      data: string[] | null;
      error?: string | null | object;
    }>("/api/send", {
      method: "POST",
      body: JSON.stringify({
        template_key: "reset-password",
        targets: [user.email],
        subject: "Reset Password",
        payload: {
          name: user.name,
          email: user.email,
          resetUrl: `${process.env.NEXTAUTH_URL}/verify-user?token=${user.verificationToken}`,
        },
      }),
    });
    if (response.error) {
      return NextResponse.json({
        result: "fail",
        message: "Error sending email",
      },{
        status: 500,
      });
    }

    console.log("Mail sent");

    return NextResponse.json(
      {
        result: "success",
        message: "Please check your Email Now!!!",
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
