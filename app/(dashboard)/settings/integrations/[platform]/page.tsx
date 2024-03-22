
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { formatDistance } from "date-fns";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { sessionType } from "src/types/session";

import { Icon, INTEGRATION_CONFIG, INTEGRATION_DESCRIPTIONS, INTEGRATION_USAGE_CASES } from "src/lib/integrations";
import { Authorisor, RevokeTokenButton } from "./platform-client";

import { getUserIntegrationData, revokeToken, saveAccessToken } from "./actions";

interface Props {
    searchParams: {
        code?: string;
    },
    params: {
        platform: string;
    }
}
export default async function PlatformPage({ searchParams, params }: Props) {

    if (!INTEGRATION_CONFIG[params.platform]) {
        return <div>Platform not found</div>
    }
    const integrationConfig = INTEGRATION_CONFIG[params.platform];

    const isRedirected = !!searchParams?.code;

    const code = searchParams?.code as string;
    // get the user session
    const session = await getServerSession(authOptions) as sessionType;

    const integrationData = await getUserIntegrationData(params.platform);


    console.log(integrationData)



    return (<div className="space-y-6 p-4 md:p-10 mt-5">
        <div className="w-full flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-0.5 flex gap-4">
                <Icon icon={params.platform} className="h-16 w-16" />
                <div>
                    <h2 className="text-2xl font-bold tracking-wide capitalize">
                        {params.platform}
                    </h2>
                    <p className="text-muted-foreground">
                        {INTEGRATION_DESCRIPTIONS[params.platform]}
                    </p>
                </div>
            </div>
            <div className="flex items-end flex-col gap-2">
                <Badge variant={integrationData.integrated ? "success" : "secondary"}>
                    {integrationData.integrated ? "Connected" : "Connect"}
                </Badge>
                {integrationData.integrated && <small className="text-muted-foreground">
                    {formatDistance(new Date(integrationData.lastAuthorized), new Date(), { addSuffix: true })}
                </small>}
            </div>
        </div>
        <Separator className="my-6" />
        {/* // This is the RevokeTokenButton component */}
        {integrationData.integrated && (<div className="bg-white/50 p-4 rounded-lg dark:bg-gray-800/50 flex justify-between items-center shadow">
            <div>
                <p className="text-muted-foreground font-medium">
                    Your account is connected with <strong>{params.platform}</strong>
                </p>
            </div>
            <RevokeTokenButton revokeToken={revokeToken} platform={params.platform} key={gparams.platform} />
        </div>)}
        {/* // This is the Authorisation component */}
        {(!integrationData.integrated && !isRedirected) && (<>
            <div className="space-y-4 w-full flex flex-col items-center justify-center mx-auto glassmorphism_light mt-10 p-5 py-10 rounded-xl max-w-md shadow-xl">
                <div>
                    <h3 className="text-lg font-bold">
                        Authorisation
                    </h3>
                    <p className="text-muted-foreground">
                        Authorise your account to connect with {params.platform}
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button asChild>
                        <Link href={integrationConfig.getAuthUrl()} >
                            Authorise
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/settings/integrations`}>
                            Go Back
                        </Link>
                    </Button>
                </div>
            </div>
        </>)}
        {/* // This is the Redirected component and not integrated  */}
        {(!integrationData.integrated && isRedirected) && (<>
            <Authorisor options={{ code }} saveAccessToken={saveAccessToken} platform={params.platform} key={params.platform + code} />
        </>)}
        <div className="space-y-4">
            <h3 className="text-lg font-bold">
                Usage Cases
            </h3>
            <div className="space-y-2">
                {INTEGRATION_USAGE_CASES[params.platform].map((useCase) => {
                    return <div key={useCase}>
                        <h6 className="text-base font-medium">
                            {useCase.name}
                        </h6>
                        <p className="text-muted-foreground">
                            {useCase.description}
                        </p>
                    </div>
                })}

            </div>
        </div>

        {/* {Object.keys(searchParams!).map((key) => {
            return <div key={key}>
                {key}: {searchParams[key]}
            </div>
        })} */}

    </div>)
}