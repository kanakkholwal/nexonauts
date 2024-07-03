import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import PublicTool from "src/models/tool";
import UserModel from "src/models/user";
import { getSession } from "src/lib/auth";

export async function DELETE(request: NextRequest) {
  try {
    const toolId = request.nextUrl.searchParams.get("toolId");

<<<<<<< HEAD
    const session = await getSession();
=======
<<<<<<< HEAD
    const session = await getSession();
=======
    const session = await getServerSession({ req: request, ...authOptions });
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
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
