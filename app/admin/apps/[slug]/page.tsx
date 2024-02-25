import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { ChevronLeft, Eye, Pencil } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "src/lib/dbConnect";
import AppModel from "src/models/app";
import User from "src/models/user";

import { revalidatePath } from "next/cache";
import { sessionType } from "src/types/session";
import { DeleteAppButton } from "./delete-btn";
export default async function EditApplicationPage({ params }: {
    params: {
        slug: string
    }
}) {
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();

    const app = await AppModel.findOne({
        appId: params.slug,
        "developer.userId": session.user._id
    }).lean();
    // console.log(app);
    if (!app) return notFound();

    async function deleteApp(appId:string): Promise<boolean> {
        "use server"
        const session = await getServerSession(authOptions) as sessionType;

        return new Promise(async (resolve, reject) => {
            try{
                await dbConnect();
                const existingUser = await User.findById(session.user._id);
                if (!existingUser) {
                    return reject("User not found")
                }
                const isExistingApp  = await AppModel.findOne({
                    appId: appId,
                    "developer.userId": session.user._id,
                })
                if(!isExistingApp){
                    return reject("App not found")
                }
                const deletedApp = await AppModel.findByIdAndDelete(isExistingApp._id);
                if(!deletedApp){
                    return reject("App not found")
                }
                revalidatePath(`/dashboard/apps`,'page')
                return resolve(true)

            }catch(error){
                console.log(error);
                return reject(error)
            }
        })
    }





    return (
        <div className="space-y-4 mt-5">
            <div className="flex justify-between items-center p-3 flex-wrap">
                <Button variant="outline" asChild>
                    <Link href={`/dashboard/apps`}>
                        <ChevronLeft className="w-6 h-6" />
                        Back to apps
                    </Link>
                </Button>
                <div className="flex gap-2">
                <Button asChild>
                    <Link href={`/apps/${app.slug}`}  target="_blank">
                        <Eye className="w-5 h-5" />
                    </Link>
                </Button>
                <Button variant="default_light" asChild>
                    <Link href={`/dashboard/apps/${app.appId}/edit` }>
                        <Pencil className="w-5 h-5" />
                    </Link>
                </Button>
                <DeleteAppButton appId={app.appId} deleteApp={deleteApp}  />
                </div>
            </div>
            <h2 className="text-3xl font-semibold">
                {app.name}
            </h2>
            <p className="pl-2 text-sm">
                <Badge variant={(app.status === "published" ? "success_light" : app.status === "declined" ? "destructive_light" : app.status === "pending" ? "warning_light" : "default_light")} className="uppercase">
                    {app.status}
                </Badge>
            </p>

        </div>
    );
}