"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "src/lib/auth";
import dbConnect from "src/lib/dbConnect";
import ProfileModel from "src/models/profile";
import UserModel from "src/models/user";

// Function to count users and calculate percent growth
export async function getUsers(query: string, currentPage: number, filter: {
    [key: string]: any
}) {

    const resultsPerPage = 32;
    const skip = currentPage * resultsPerPage - resultsPerPage;
    const filterQuery = {
        $or: [
            { "name": { $regex: query, $options: "i" } },
            { "email": { $regex: query, $options: "i" } },
            { "username": { $regex: query, $options: "i" } },
            { "role": { $regex: query, $options: "i" } },
        ],
    } as unknown as any;
    await dbConnect();
    const users = await UserModel.find({
    }).skip(skip)
        .limit(resultsPerPage)
        .select("name email username role createdAt verified")
        .exec();
    const totalPages = Math.ceil((await UserModel.countDocuments(filterQuery)) / resultsPerPage);

    return { users: JSON.parse(JSON.stringify(users)), totalPages }
}


export async function deleteUser(userId: string) {
    try {


        const session = await getSession();
        if (!session) {
            return {
                success: false,
                message: 'Unauthorized',
            }

        }

        await dbConnect();
        const adminUser = await UserModel.findById(session.user._id);
        if (!adminUser) {
            return {
                success: false,
                message: 'User not found',
            }
        }
        // must be admin
        if (adminUser.role !== 'admin') {
            return {
                success: false,
                message: 'Unauthorized',
            }
        }
        //  cannot delete user if it is the only admin
        if (adminUser.role === 'admin') {
            const user = await UserModel.findById(userId);
            if (user.role === 'admin') {
                const adminCount = await UserModel.countDocuments({ role: 'admin' });
                if (adminCount === 1) {
                    return {
                        success: false,
                        message: 'Cannot delete the only admin',
                    }
                }
            }
        }
        await UserModel.findById(userId).deleteOne();
        await ProfileModel.findOneAndDelete({ user: userId });
        revalidatePath("/admin/users", "page");

        return {
            success: true,
            message: 'User deleted',
        }
    }
    catch (error) {
        console.log(error);
        return {
            success: false,
            message: "An error occurred",
        }

    }
}
