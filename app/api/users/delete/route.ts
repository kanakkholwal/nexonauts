import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "src/lib/dbConnect";
import UserModel from "src/models/user";

export async function DELETE(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get('userId')

        const session = await getServerSession({ req: request, ...authOptions });
        if (!session ) {
            return NextResponse.json({
                result: "fail",
                message: 'Unauthorized',
            },{
                status:401
            })
        }

        await dbConnect();
        const adminUser = await UserModel.findById(session.user._id);
        if (!adminUser ) {
            return NextResponse.json({
                result: "fail",
                message: 'User not found',
            },{
                status:404
            })
        }
        // must be admin
        if(adminUser.role !== 'admin'){
            return NextResponse.json({
                result: "fail",
                message: 'Unauthorized',
            },{
                status:401
            })
        }
        //  cannot delete user if it is the only admin
        if(adminUser.role === 'admin'){
            const user = await UserModel.findById(userId);
            if(user.role === 'admin'){
                const adminCount = await UserModel.countDocuments({role:'admin'});
                if(adminCount === 1){
                    return NextResponse.json({
                        result: "fail",
                        message: 'Cannot delete the only admin',
                    },{
                        status:400
                    })
                }
            }
        }
        await UserModel.findById(userId).deleteOne();
        revalidatePath("/admin/users","page");

        return NextResponse.json({
            result: "success",
            message: 'User deleted',
        },{
            status:200
        })
    }
    catch (error) {
        return NextResponse.json({
            result: "fail",
            message: error.message,
        },{
            status:500
        })
    }


}
