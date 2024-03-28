import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from 'lucide-react';
import { Metadata } from "next";
import Link from 'next/link';
import { Suspense } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { getSession } from "src/lib/auth";
import dbConnect from "src/lib/dbConnect";
import { Icon, INTEGRATION_DESCRIPTIONS, INTEGRATIONS } from "src/lib/integrations";
import User from "src/models/user";
import { sessionType } from "src/types/session";

export const metadata: Metadata = {
    title: "Integrations",
    description: "Integrations Settings page"
}


export default async function IntegrationPage() {
    const session = await getSession() as sessionType;

    await dbConnect();
    const user = await User.findById(session.user._id).select('integrations').exec();
    console.log(user)
    // if (!user.integrations) {
    //     user.integrations = {
    //         gumroad: {
    //             scope: "edit_products",
    //             access_token: null,
    //             integrated: false,
    //             lastAuthorized: null,
    //         },
    //         github: {
    //             scope: "repo",
    //             access_token: null,
    //             integrated: false,
    //             lastAuthorized: null,
    //         },
    //     },
    //     await user.save();
    // }
    const integrations = JSON.parse(JSON.stringify(user.integrations))
    console.log(integrations);




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
        <Suspense fallback={<div className="flex items-center justify-center h-40"><CgSpinnerTwo className="animate-spin h-10 w-10 text-primary" /> </div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {INTEGRATIONS.map((integration) => {
                    return <Link href={`/settings/integrations/${integration}`} key={integration}
                    
                    className="flex items-center border text-card-foreground backdrop-blur bg-white dark:bg-gray-600/30 shadow p-4 rounded-xl flex-col justify-center transition hover:scale-103 active:duration-75 active:scale-97">
                        <div className="flex items-center justify-between w-full flex-auto h-20">
                            <div className="flex-auto max-h-20">
                                <Icon icon={integration} className="h-16 max-h-20 w-max" />
                            </div>
                            <div className="flex items-center">
                                <Badge
                                    variant={integrations[integration].integrated ? "success" : "secondary"}>
                                    {integrations[integration].integrated ? "Connected" : "Connect"}
                                </Badge>
                            </div>
                        </div>
                        <div className="mt-2 text-left w-full flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-bold capitalize">
                                    {integration}
                                </h3>
                                <p className="text-muted-foreground">
                                    {INTEGRATION_DESCRIPTIONS[integration]}
                                </p>
                            </div>
                            <div>
                                <ChevronRight className="h-6 w-6 text-muted-foreground" />
                            </div>
                        </div>
                    </Link>
                })}
            </div>
        </Suspense>
    </div>

</div>)
}