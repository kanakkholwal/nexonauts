import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from 'layouts/apps/layout';
import dbConnect from "lib/dbConnect";
import AppModel from "models/app";
import { GetSessionParams, getSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import AppplicationLayout from 'src/layouts/apps/view-layout';
import { AppTypeRenderable, AppTypeViewOnly } from 'src/types/app';
import { sessionType } from "src/types/session";
import { SessionUserType } from 'src/types/user';
import { PUBLIC_RUN_KEYS } from "src/utils/app";

import AllReviews, { PostReview } from "layouts/apps/view/review";
import { AiFillStar } from "react-icons/ai";
import { FiLock } from "react-icons/fi";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from 'lib/apps/utils';
import { useEffect, useState } from "react";
import workingApp from "src/assets/animation/app-working.gif";

export default function App({ app, user }: {
    app: AppTypeRenderable,
    user: SessionUserType | null
}) {


    console.log(app);
    const [relatedApps, setRelatedApps] = useState<AppTypeViewOnly[]>([]);

    useEffect(() => {
        fetch("/api/apps/" + app._id + "/related")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setRelatedApps(data.result);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


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
                    Created by <span className="text-accent-foreground font-semibold cursor-pointer hover:underline">{app.developer.name}</span>
                    {" "} in <Link className="text-primary font-semibold px-2 py-1 rounded-md bg-primary/10 hover:bg-primary/20 capitalize ml-1" href={`/apps?category=${app.categories[0]}`}>{app.categories[0].replaceAll("_", " ")}</Link>
                </div>
                {user ? <AppplicationLayout app={app} user={user} /> : <div className="relative w-full aspect-video flex justify-center items-center bg-slate-100 my-5">
                    <Image src={workingApp}
                        height={500}
                        width={500}
                        alt="Working App"
                        className="z-1"
                    />

                    <div className="absolute inset-0  backdrop-blur-sm flex justify-center items-center z-10">
                        <Link href={"/login?continue=" + encodeURI(app.path)} className="w-full max-w-xs flex items-center justify-center border border-solid border-primary rounded-md p-2 bg-slate-100">
                            <FiLock className="w-4 h-4 mr-2 text-primary inline-block" /> Please login to use this app
                        </Link>
                    </div>
                </div>}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Related Apps
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-1">
                        {relatedApps?.map((app: AppTypeViewOnly, index) => {
                            const Category = CATEGORIES.find((category) => category.value === app.categories[0]);


                            return (<Card key={index} className="relative p-2 max-w-[280px] flex flex-col justify-center items-center group py-4" >
                                <span className="absolute top-2 right-2 bg-slate-100 text-primary px-2 py-1 rounded-md text-xs">
                                    {/* {app?.averageRating?.toFixed(1)} */}
                                    <AiFillStar className="inline-block ml-1 h-4 w-4 text-primary" />
                                </span>
                                <CardContent className="flex flex-col items-center gap-2 justify-center ">
                                    <div className='flex gap-2 items-center justify-start'>
                                        <span className='icon-border group-hover:bg-primary/10 relative max-w-[80px] bg-slate-200 w-full h-20 aspect-square rounded-full inline-flex items-center justify-center  ml-3 '>
                                            {Category ? <Category.Icon className="w-6 h-6" /> : null}
                                        </span>
                                    </div>
                                    {/* <p className="flex gap-1"> */}
                                    {/* {app.tags.map((tag, index) => {
                                        if(index > 2) return null;
                                        return <Badge key={index}>{tag?.split(" ")[0]}</Badge>
                                    })}</p> */}
                                </CardContent>
                                <CardHeader className="text-center !p-0">
                                    <CardTitle className="text-[20px] font-semibold">
                                        <Link href={app.path}>
                                            {app.name}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription className="text-[16px] font-medium">{app.shortDescription.length > 40 ? app.shortDescription.trim().slice(0, 40) + " ..." : app.shortDescription.trim()}</CardDescription>
                                </CardHeader>

                            </Card>)
                        })}
                    </CardContent>

                </Card>
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
                        <AllReviews app={app} />
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
    const app = await AppModel.findOne({ path: "/apps/" + appPath }).select(PUBLIC_RUN_KEYS).populate("developer").lean() as AppTypeRenderable | null;

    if (!app) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            app: JSON.parse(JSON.stringify(app)) as AppTypeRenderable,
            user: session?.user || null
        }
    }
}
