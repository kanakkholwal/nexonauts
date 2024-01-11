"use client";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SessionUserType } from "src/types/user";

export function CreateAppButton({user}:{
    user: SessionUserType
}){
    const router = useRouter();
    async function CreateApp() {

        console.log(user);
        return new Promise(async (resolve, reject) => {
            await axios.post('/api/apps/create', {
                userId: user._id
            }).then((res) => {
                console.log(res.data);
                revalidatePath(`/dashboard/apps`)
                router.push(`/dashboard/apps/${res.data.result.appId}/edit`)
                resolve(res.data.result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    return (<Button className="mt-4 mx-auto" onClick={() =>{
        toast.promise(CreateApp(), {
            loading: 'Creating App...',
            success: 'App Created!',
            error: 'Error Creating App'
        })
    }}>
        Create App
    </Button>)
}