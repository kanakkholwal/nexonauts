import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import axios from 'axios';
import Layout from 'layouts/apps/layout';
import dbConnect from "lib/dbConnect";
import { GetSessionParams, getSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import Link from "next/link";
import toast from "react-hot-toast";
import { AppTypeViewOnly } from "src/types/app";
import { sessionType } from "src/types/session";
import { SessionUserType } from "src/types/user";
import { getAppsOfUser } from 'src/utils/app';

type PageProps = {
    user: SessionUserType
    apps: AppTypeViewOnly[]
}
export default function Dashboard({ user, apps }: PageProps) {

    console.log(apps);
    async function CreateApp() {

        return new Promise(async (resolve, reject) => {
            await axios.post('/api/apps/create', {
                userId: user.id
            }).then((res) => {
                console.log(res.data);
                resolve(res.data.result)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    return (<Layout user={user}>
        <NextSeo
            title="Your Apps | Developer Dashboard"
            description="Create and manage your apps."
        />
        <div className="max-full grow">
            <h1 className="text-3xl font-bold">
                Your Apps
            </h1>
            <p className="text-slate-500 mt-2 line-clamp-3">
                Create and manage your apps.
            </p>
            <section className="mt-8">
                <div className="flex  items-center justify-between w-full">
                    <h2 className="text-2xl font-bold">
                        Apps
                    </h2>
                </div>
                <hr className="mt-5" />

                <div className="mt-4 w-full gap-2 grid sm:grid-cols-2 lg:grid-cols-3 items-stretch justify-start bg-slate-100 rounded-md p-5 py-10">
                    {apps.length === 0 ? <div className="flex flex-col items-center justify-center w-full">
                        <h1 className="text-2xl font-bold">
                            No Apps
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm line-clamp-3">
                            You have no apps. Create one now!
                        </p>
                        <Button variant="gradient" className="mt-4" onClick={async () => {
                            // const app = await CreateApp()
                            // window.location.href = `/dashboard/developer/apps/${app.id}`
                            toast.promise(CreateApp(), {
                                loading: 'Creating App...',
                                success: 'App Created!',
                                error: 'Error Creating App'
                            })
                        }}>
                            Create App
                        </Button>


                    </div> : apps.map((app, index) => {
                        return <Card key={index} className="max-w-[480px] grow flex flex-col justify-between items-start">
                            <CardHeader>
                                <CardTitle>
                                    {app.name}
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {app.shortDescription}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="gap-2">
                                <Link className={buttonVariants({ variant: "outline", size: "sm" })} href={`/dashboard/developer/apps/${app.appId}`}>
                                    Manage App
                                </Link>
                                <Link className={buttonVariants({ variant: "link", size: "sm" })} href={`${app.path}`} target="_blank">
                                    View App
                                </Link>
                            </CardFooter>
                        </Card>
                    })}
                    <Card className="max-w-[480px] transition-duration-300 overflow-hidden grow flex flex-col justify-center items-center border-2 border-dashed border-primary group hover:bg-primary/10">
            
                        <Button variant="outline" className="mt-2 bg-primary/10 group-hover:bg-primary group-hover:text-white hover:text-white transition-duration-300" onClick={async () => {
                            toast.promise(CreateApp(), {
                                loading: 'Creating App...',
                                success: 'App Created!',
                                error: 'Error Creating App'
                            })
                        }}>
                            Create a New App
                        </Button>
                    </Card>
                </div>

            </section>



        </div>
    </Layout>)

}

export async function getServerSideProps(context: GetSessionParams) {


    const session = (await getSession(context)) as sessionType | null;

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    await dbConnect();
    const { apps } = await getAppsOfUser(session.user.id);
    // console.log(apps);




    return {
        props: {
            user: session.user,
            apps: JSON.parse(JSON.stringify(apps))
        }
    }







}