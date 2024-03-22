"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { FaRegCircleCheck } from "react-icons/fa6";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";




export function Authorisor({ options, saveAccessToken, platform }: {
    options: Record<string, any>,
    platform: string,
    saveAccessToken: (options: Record<string, any>, platform: string) => Promise<any>
}) {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {

        saveAccessToken({ ...options }, platform)
            .then((data) => {
                setData(data);
                router.push("?", { scroll: false });
            }).catch((e) => {
                setError(e);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [])

    return (<>
        {loading && <Alert>
            <CgSpinner className="h-6 w-6 text-primary animate-spin" />
            <AlertTitle>
                Authorizing and saving token...
            </AlertTitle>
            <AlertDescription>
                Please wait while we authorize and save the token.
            </AlertDescription>
        </Alert>}
        {error && <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <AlertTitle>
                Error authorizing token
            </AlertTitle>
            <AlertDescription>
                {error.message}
            </AlertDescription>
        </Alert>}
        {data && <Alert variant="success">
            <FaRegCircleCheck className="h-6 w-6" />
            <AlertTitle>
                Success
            </AlertTitle>
            <AlertDescription>
                Integration connected successfully
            </AlertDescription>
        </Alert>}
        


    </>)
}

export function RevokeTokenButton({ revokeToken, platform }: { revokeToken: (platform: string) => Promise<boolean>, platform: string }) {
    const router = useRouter();

    return <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="destructive_light" size="sm">Revoke Token</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    Your account will be disconnected from the platform.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={(e) => {
                    e.preventDefault();
                    toast.promise(revokeToken(platform), {
                        loading: "Revoking token...",
                        success: "Token revoked",
                        error: "Failed to revoke token"
                    }).finally(() => {
                        router.push("?", { scroll: false });
                    })

                }}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

}

export function StatusBadge({ status }: {
    status: "connected" | "disconnected";
}) {
    return <Badge variant={status === "connected" ? "success" : "secondary"}>
        {status === "connected" ? "Connected" : "Disconnected"}
    </Badge>
}