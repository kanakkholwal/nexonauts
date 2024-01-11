import {
    Card,
    CardDescription,
    CardTitle
} from "@/components/ui/card";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { PlusCircle } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import dbConnect from "src/lib/dbConnect";
import AppModel from "src/models/app";
import { sessionType } from "src/types/session";
import { CreateAppButton } from "./create";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions) as sessionType;

    await dbConnect();
    const apps = await AppModel.find({
        developer: {
            userId: session.user.id
        }
    });
    console.log(apps)



    return (<div className="space-y-6 my-5">
        <h2 className="text-3xl font-semibold">
            Your Apps
        </h2>
        <div className="w-full gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {/* <Link href={"/dashboard/apps/new"}> */}
                <Card className='bg-gradient-to-b from-[#DEE4EA] to-[#F9FCFF] dark:from-[#12100E] dark:to[#1B2845] transition transform duration-300 hover:translate-x-1 hover:-translate-y-1 hover:shadow-lg cursor-pointer border p-10 h-full flex content-center flex-wrap'>
                    <div className='h-fit w-full'>
                        <div className='flex justify-center w-full'>
                            <PlusCircle  className='h-10 w-10' />
                        </div>
                        <CardTitle className='text-center mt-2'>
                            Create New App
                        </CardTitle>
                        <CardDescription className='text-center mt-4'>
                            Create a new AI application
                        </CardDescription>
                        <CreateAppButton user={session.user}/>
                    </div>
                </Card>
            {/* </Link> */}
        </div>


    </div>)
}