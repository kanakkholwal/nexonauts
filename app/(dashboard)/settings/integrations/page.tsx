import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { Suspense } from "react";
import { Icon, INTEGRATION_DESCRIPTIONS, INTEGRATIONS } from "src/components/integrations";
import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";
import { sessionType } from "src/types/session";
import { generateSlug } from "src/utils/string";

export const metadata: Metadata = {
    title: "Integrations",
    description: "Integrations Settings page"
}


export default async function IntegrationPage() {
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();
    const user = await User.findById(session.user._id).select('-_id integrations').exec();
    const integrations = JSON.parse(JSON.stringify(user.integrations))
    console.log(integrations);

    const GITHUB_CLIENT_ID = process.env.GITHUB_ID;
    const GITHUB_REDIRECT_URI = process.env.NEXTAUTH_URL + "settings/integrations/github";
    const GITHUB_SCOPE = "user%20repo";
    const GITHUB_STATE = generateSlug(10)


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
        <div className="mt-5 ">
            <Suspense fallback={<div>Loading...</div>}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {INTEGRATIONS.map((integration) => {
                    return <div key={integration} className="flex items-center border text-card-foreground  backdrop-blur bg-white dark:bg-gray-600/30 shadow p-4 rounded-xl flex-col justify-center">
                        <div className="flex items-center justify-between w-full flex-auto">
                            <div className="flex-auto">
                                <Icon icon={integration} className="h-20 max-h-20 w-max" />
                            </div>
                            <div className="flex items-center">
                                <Badge 
                                    variant={integrations[integration].integrated ? "success" : "secondary"}>
                                    {integrations[integration].integrated ? "Connected" : "Connect"}
                                </Badge>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h3 className="text-lg font-bold capitalize">
                                {integration}
                            </h3>
                            <p className="text-muted-foreground">
                                {INTEGRATION_DESCRIPTIONS[integration]}
                            </p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3" asChild>
                            <Link
                                href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=${GITHUB_SCOPE}&state=${GITHUB_STATE}`}
                            >
                            Manage
                            </Link>
                        </Button>
                    </div>
                })}
                </div>
        </Suspense>
        </div>

    </div>)
}