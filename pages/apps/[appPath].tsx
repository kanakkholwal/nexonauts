import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from 'layouts/apps/layout';
import dbConnect from "lib/dbConnect";
import AppModel from "models/app";
import { GetSessionParams, getSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import AppplicationLayout from 'src/layouts/apps';
import { AppType } from 'src/types/app';
import { sessionType } from "src/types/session";
import { SessionUserType } from 'src/types/user';

import { PostReview } from "layouts/apps/view/review";
import { FiLock } from "react-icons/fi";

import workingApp from "src/assets/animation/app-working.gif";

export default function App({ app, user }: {
    app: AppType,
    user: SessionUserType | null
}) {


    console.log(app);
    if (!app) return null;


    return (
        <Layout user={user}>
            <NextSeo
                title={app.name}
                description={app.shortDescription}
                canonical={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${app.path}`}
                openGraph={{
                    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${app.path}`,
                    title: app.name,
                    description: app.shortDescription,
                    images: [
                        {
                            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/logo.png`,
                            width: 800,
                            height: 600,
                            alt: app.name,
                        },
                    ],
                }}
            />
            <div className="max-w-5xl">
                <h1 className="text-3xl font-bold">
                    {app.name}
                </h1>
                <p className="text-slate-500 mt-2 line-clamp-3">
                    {app.description}
                </p>
                <div className='mt-2 text-sm font-medium w-full rounded-lg text-slate-500 bg-slate-100 p-2'>
                    Created by <span className="text-accent-foreground font-semibold cursor-pointer hover:underline">{app.author.name}</span>
                    {" "} in <Link className="text-primary font-semibold px-2 py-1 rounded-md bg-primary/10 hover:bg-primary/20 capitalize ml-1" href={`/apps?category=${app.category}`}>{app.category.replaceAll("_", " ")}</Link>
                </div>
                {user ? <AppplicationLayout app={app} user={user} /> : <div className="relative w-full aspect-video flex justify-center items-center bg-slate-100 my-5">
                    <Image src={workingApp}
                        height={500}
                        width={500}
                        alt="Working App"
                        className="z-1"
                    />

                    <div className="absolute inset-0  backdrop-blur-sm flex justify-center items-center z-10">
                        <Link  href={"/login?continue=" + encodeURI(app.path)} className="w-full max-w-xs flex items-center justify-center border border-solid border-primary rounded-md p-2 bg-slate-100">
                            <FiLock className="w-4 h-4 mr-2 text-primary inline-block" /> Please login to use this app
                        </Link>
                    </div>
                </div>}
            </div>
            <div className="grow">
                <Tabs defaultValue="my_review" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="my_review" className="grow">
                            Your Review
                        </TabsTrigger>
                        <TabsTrigger value="others_review" className="grow">
                            Others Reviews
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="my_review">
                        {user ? <PostReview app={app} user={user} /> : <Link href={"/login?continue=" + encodeURI(app.path)} className="w-full flex items-center justify-center border border-solid border-primary rounded-md p-2 bg-slate-100">
                            <FiLock className="w-4 h-4 mr-2 text-primary inline-block" /> Please login to Post a Review
                        </Link>}
                    </TabsContent>
                    <TabsContent value="others_review">
                        No reviews yet
                    </TabsContent>
                </Tabs>

            </div>

        </Layout>
    )
}

export async function getServerSideProps(context: GetSessionParams & { params: { appPath: string } }) {
    const session = (await getSession(context)) as sessionType | null;


    const appPath = context.params.appPath;
    if (!appPath) {
        return {
            notFound: true,
        }
    }
    await dbConnect();
    const app = await AppModel.findOne({ path: "/apps/" + appPath }).populate("author").select("-config")

    if (!app) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            app: JSON.parse(JSON.stringify(app)),
            user: session?.user || null
        }
    }
}
