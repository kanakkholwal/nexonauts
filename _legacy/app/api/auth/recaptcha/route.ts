import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const { data } = await axios.post(verificationUrl);

    return NextResponse.json(
      {
        result: data.success ? "success" : "fail",
        message: data.success
          ? "recaptcha verification successful"
          : "recaptcha verification failed",
        ...data,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        result: "fail",
        message: error?.message,
      },
      {
        status: 500,
      }
    );
  }
}
