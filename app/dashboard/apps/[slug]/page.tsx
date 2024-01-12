import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { ChevronLeft } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "src/lib/dbConnect";
import AppModel from "src/models/app";
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
    console.log(app);
    if (!app) return notFound();





    return (
        <div className="space-y-4 mt-5">
            <div className="flex justify-between items-center p-3 flex-wrap">
                <Button variant="outline" asChild>
                    <Link href={`/dashboard/apps`}>
                        <ChevronLeft className="w-6 h-6 mr-2" />
                        Back to apps
                    </Link>
                </Button>
                <DeleteAppButton appId={app.appId} />
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