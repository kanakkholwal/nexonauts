"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Trash2 } from 'lucide-react';
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SessionUserType } from "src/types/user";

export function DeleteAppButton({ user,appId, className, ...props }: {
    user?: SessionUserType,
    appId:string,
    className?: string,
    props?: any,
}) {
    const router = useRouter();

    async function DeleteApp():Promise<{
        result: string,
        message: string,
    }> {    
        return new Promise(async (resolve, reject) => {
            await axios.delete('/api/apps/delete?appId=' + appId)
            .then((res) => {
                console.log(res.data);
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    return (<Button className={cn("transition transform duration-300 hover:-translate-y-1", className)} {...props} onClick={() => {
        if(confirm("Are you sure you want to delete this app?") === false) return;

        toast.promise(DeleteApp(), {
            loading: 'Deleting App...',
            success: () =>{
                revalidatePath(`/dashboard/apps`)
                router.push(`/dashboard/apps`)
                return'App Deleted!'
            } ,
            error: 'Error Deleted App'
        })
    }} variant="destructive_light">
        Delete App <Trash2 className="w-5 h-5 ml-2" />
    </Button>
    )
}