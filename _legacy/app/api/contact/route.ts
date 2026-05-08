import { NextRequest, NextResponse } from "next/server";
import dbConnect from "src/lib/db";
import Message from "src/models/message";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    await dbConnect();

    const message = new Message({
      name: data.name,
      email: data.email,
      message: data.message,
      type: "contact",
      aditional_info: {
        ...data.aditional_info,
      },
    });
    await message.save();

    return NextResponse.json(
      {
        result: "success",
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
