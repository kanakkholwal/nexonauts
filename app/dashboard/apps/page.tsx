import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle
} from "@/components/ui/card";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Eye, Pencil } from 'lucide-react';
import AppModel from "models/app";
import User from "models/user";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import Image from 'next/image';
import Link from "next/link";
import { Suspense } from "react";
import dbConnect from "src/lib/dbConnect";
import { sessionType } from "src/types/session";
import { CreateAppButton } from "./create";


export default async function DashboardPage() {
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();
    const apps = await AppModel.find({
        "developer.userId": session.user._id
    });
    console.log(apps);
    async function createApp(): Promise<boolean> {
        "use server"
        const session = await getServerSession(authOptions) as sessionType;

        return new Promise(async (resolve, reject) => {
            try{
                await dbConnect();
                const existingUser = await User.findById(session.user._id);
                if (!existingUser) {
                    return reject("User not found")
                }
                const newApp = await AppModel.create({
                    appId:"app_"+ Date.now(),
                    developer:{
                        userId:existingUser._id.toString(),
                        username:existingUser.username,
                        name:existingUser.name
                    },
                    status:"draft",
                    version:"0.0.1",
                    name:"New App",
                    description:"Description",
                    config : {
                        prompt: "Write a prompt here",
                        model: "gemini-pro",
                    },
                    formFlow:{
                        menuType:"text_input_to_text_output",
                        inputs:[],
                        controls:[],
                        outputs:[]
                    }
                });
                await newApp.save();
                revalidatePath("/dashboard/apps","page")
                return resolve(true)

            }catch(error){
                console.log(error);
                return reject(error)
            }
        })
    }



    return (<div className="space-y-6 my-5">
        <div className="flex justify-between items-center p-3 gap-4 flex-wrap">
            <h2 className="text-3xl font-semibold">
                Your Apps
            </h2>
            <CreateAppButton createApp={createApp} className=" w-full max-w-[200px]" />
        </div>
        <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5">
            <Suspense fallback={<div>Loading...</div>}>
                {apps.map((app) => {
                    return <Card className='w-full max-w-lg hover:border-primary' key={app._id.toString()}>
                        {/* <div className='h-fit w-full'> */}
                        <CardContent className="pt-10">

                            <div className='flex justify-center w-full'>
                                <Image alt={app.name} src={app.icon ? app.icon : "/assets/images/default_app.png"} className='h-16 w-16 aspect-square object-cover' height={512} width={512} draggable={false} />
                            </div>
                            <CardTitle className='text-center mt-2'>
                                {app.name}
                            </CardTitle>
                            <CardDescription className='text-center mt-4'>
                                <Badge variant={(app.status === "published" ? "success_light" : app.status === "declined" ? "destructive_light" : app.status === "pending" ? "warning_light":"default_light")} className="uppercase">
                                    {app.status}
                                </Badge>
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="justify-around items-center gap-2">
                            <Button asChild>
                                <Link href={`/dashboard/apps/${app.appId}`}>
                                    Manage
                                </Link>
                            </Button>
                            <Button variant="default_light" asChild>
                                <Link href={`/dashboard/apps/${app.appId}/edit`}>
                                    <Pencil className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button variant="default_light" asChild>
                                <Link href={`/apps/${app.slug}`} target="_blank">
                                    <Eye className="h-5 w-5" />
                                </Link>
                            </Button>

                        </CardFooter>
                        {/* </div> */}
                    </Card>
                })}
            </Suspense>
            {/* <Link href={"/dashboard/apps/new"}> */}
            <Card className='w-full max-w-lg bg-slate-100 dark:bg-slate-800 border border-dashed border-primary/80 hover:border-primary'>
                {/* <div className='h-fit w-full'> */}
                <CardContent className="pt-10">

                    <div className='flex justify-center w-full'>
                        <Image alt={"Create new application"} src={"/assets/images/create_app.png"} className='h-16 w-16 aspect-square object-cover' height={512} width={512} draggable={false} />
                    </div>
                    <CardTitle className='text-center mt-2'>
                        Create New App
                    </CardTitle>
                    <CardDescription className='text-center mt-4'>
                        Create a new AI application
                    </CardDescription>
                </CardContent>
                <CardFooter className="justify-center">
                    <CreateAppButton createApp={createApp}  className=" w-full max-w-md" />
                </CardFooter>
                {/* </div> */}
            </Card>
            {/* </Link> */}
        </div>


    </div>)
}