import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";
import { sessionType } from "src/types/session";
import { AccountForm } from './account';

export const metadata: Metadata = {
    title: "Account",
    description: "Account Settings page"
}


export default async function AccountPage() {
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();
    async function handleUpdateName(newName: string):Promise<{
        result: string,
        message: string
    }>{
        "use server";
        return new Promise(async (resolve, reject) => {
            try{
                const user = await User.findById(session.user._id);
                if (!user) {
                    return reject({
                        result: "fail",
                        message: 'User not found'
                    })
                }
                user.name = newName;
                await user.save();

                return resolve({
                    result: "success",
                    message: 'Name updated successfully'
                })
            } catch (err) {
                return reject({
                    result: "fail",
                    message: err.message
                })
            }
        })
        

    }


    return (<div className="space-y-6 p-10 pb-16 w-full bg-white dark:bg-slate-800 rounded-3xl mt-5">
        <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Account</h2>
            <p className="text-muted-foreground">
                Manage your account settings.
            </p>
        </div>
        <Separator className="my-6" />
        <div className="mt-5">
            <AccountForm user={session.user} serverActions={{handleUpdateName}} />
        </div>

    </div>)
}