import { Separator } from "@/components/ui/separator";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import { Icon } from "src/components/integrations";
import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";
import { sessionType } from "src/types/session";

export const metadata: Metadata = {
    title: "Integrations",
    description: "Integrations Settings page"
}


export default async function IntegrationPage() {
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();
    const user = await User.findById(session.user._id).select('-_id integrations').exec();
    const integrations = JSON.parse(JSON.stringify(user.integrations))


    return (<div className="space-y-6 p-4 md:p-10 pb-16 w-full rounded-3xl mt-5">
        <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
                Integrations
            </h2>
            <p className="text-muted-foreground">
                Manage your integrations settings
            </p>
        </div>
        <Separator className="my-6" />
        <div className="mt-5">
            <Suspense fallback={<div>Loading...</div>}>
                {Object.keys(integrations).filter((key) => key !== "_id").map((integration) => {
                    return <div key={integration}>
                        <div className="flex items-center glassmorphism_light p-4 rounded-xl flex-col justify-center">
                            <Icon icon={integration} className="h-24 w-24" />
                            <h2 className="text-lg font-bold tracking-tight">
                                {integration}
                            </h2>
                        </div>
                        <div className="mt-2">
                            <p className="text-muted-foreground">
                                {/* {user.integrations[integration].enabled ? "Enabled" : "Disabled"} */}
                            </p>
                        </div>
                    </div>
                })}
        </Suspense>
        </div>

    </div>)
}