import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import PublicTool from "src/models/tool";
import UserModel from "src/models/user";
import { getSession } from "src/lib/auth";

export async function DELETE(request: NextRequest) {
  try {
    const toolId = request.nextUrl.searchParams.get("toolId");

    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        {
          result: "fail",
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await dbConnect();
    const adminUser = await UserModel.findById(session.user._id);
    if (!adminUser) {
      return NextResponse.json(
        {
          result: "fail",
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    // must be admin
    if (adminUser.role !== "admin") {
      return NextResponse.json(
        {
          result: "fail",
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await PublicTool.findById(toolId).deleteOne();
    revalidatePath("/admin/tools", "page");

    return NextResponse.json(
      {
        result: "success",
        message: "User deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        result: "fail",
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
