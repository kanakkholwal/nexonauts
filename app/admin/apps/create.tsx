"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { toast } from "sonner";
import toast from "react-hot-toast";

export function CreateAppButton({ createApp,className, ...props }: {
    createApp: () => Promise<boolean>,
    className?: string,
    props?: any
}) {

    

    return (<Button className={cn("transition transform duration-300 hover:-translate-y-1", className)} {...props} onClick={() => {
        toast.promise(createApp(), {
            loading: 'Creating App...',
            success: (response) => {
                console.log(response)

                return 'App Created!'
            },
            error: 'Error Creating App'
        })
    }}>
        Create App
    </Button>)
}