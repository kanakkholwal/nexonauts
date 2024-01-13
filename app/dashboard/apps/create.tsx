"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from 'axios';
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import toast from "react-hot-toast";
import { SessionUserType } from "src/types/user";

export function CreateAppButton({ user, className, ...props }: {
    user: SessionUserType,
    className?: string,
    props?: any
}) {
    const router = useRouter();

    async function CreateApp(): Promise<{
        result: string,
        message: string,
        data: any | null
    }> {
        // console.log(user);
        return new Promise(async (resolve, reject) => {
            try{
                const response =  await axios.post('/api/apps/create', {
                    userId: user._id
                });
                // console.log(response.data);
                if(response.data.result === 'fail') return reject(response.data.message)
                return resolve(response.data)

            }catch(error){
                console.log(error);
                return reject(error)
            }
        })
    }

    return (<Button className={cn("transition transform duration-300 hover:-translate-y-1", className)} {...props} onClick={() => {
        toast.promise(CreateApp(), {
            loading: 'Creating App...',
            success: (response) => {
                console.log(response)
                revalidatePath(`/dashboard/apps`)
                // router.push(`/dashboard/apps/${response?.data?.appId}`)
                return 'App Created!'
            },
            error: 'Error Creating App'
        })
    }}>
        Create App
    </Button>)
}