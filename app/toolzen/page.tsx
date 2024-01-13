import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "app/layouts/navbar";
import dbConnect from "lib/dbConnect";
import { ChevronRight, Compass, Search, ShieldCheck, Star } from 'lucide-react';
import PublicTool from 'models/public-tool';
import { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from "react";
import { Categorized } from "./categoried";
import { HeroWrapper } from "./hero";
export const metadata: Metadata = {
    title: "ToolZen - AI Tools, Services, and Resources",
    description: "ToolZen is a curated list of AI tools, services, and resources. Find the best AI tools for your business.",
}
const features = [
    {
        title: "Search Engine",
        description: "Search for tools with ease using our intuitive search engine.",
        Icon: Search
    },
    {
        title: "Review & Rating System",
        description: "Share your experiences and insights through our review and rating system for each tool.",
        Icon: Star
    },
    {
        title: "Submit your own tools to be listed on ToolZen",
        description: "We will review and approve your submission within 1-3 days.",
        Icon: ShieldCheck
    }
] as {
    title: string,
    description: string,
    Icon: React.ElementType
}[]


export default async function Page() {
    await dbConnect();

    // const tools = await PublicTool.find({ status: "published" || "approved" }).
    //     sort({ createdAt: -1 }).limit(10);
    const categories = await PublicTool.aggregate([
        { $unwind: "$categories" },
        {
            $group: {
                _id: "$categories.slug",
                name: { $first: "$categories.name" },
                slug: { $first: "$categories.slug" },
            },
        },
        { $project: { _id: 0, name: 1, slug: 1 } },
    ]).limit(5);
    const slugs = categories.map((category) => category.slug);
    //  get 6 tools of each category
    const categorized_tools = await PublicTool.aggregate([
        { $unwind: "$categories" },
        {
            $group: {
                _id: "$categories.slug",
                name: { $first: "$categories.name" },
                slug: { $first: "$categories.slug" },
                tools: { $push: "$$ROOT" },
            },
        },
        { $project: { _id: 0, name: 1, slug: 1, tools: { $slice: ["$tools", 6] } } },
        { $match: { slug: { $in: slugs } } },
    ]);
    console.log(categorized_tools);

    return (<>
        <header>
            <Navbar />
        </header>

        <HeroWrapper>

            <h1 className="text-5xl font-bold mb-2 text-center">
                Find the best AI tools for your business.
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-2xl font-semibold text-center mt-3 mb-5 line-clamp-3">
                ToolZen is a curated list of AI tools, services, and resources.
            </p>
            <div className="relative w-full rounded-full overflow-hidden flex">
                <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5" />
                <Input placeholder="Search any tool for anything..." className="border-2 border-primary/15 focus:border-primary rounded-full py-4 h-14 pl-12" />
            </div>
            <p className="text-slate-500 text-md font-semibold text-center max-w-4xl break-words mt-8 mb-5 line-clamp-3">
                Now with 100+ tools and growing. <Link href="/toolzen/submit" className="text-primary">Submit a tool</Link> to be listed on ToolZen.<br />
                You can also save your favorite tools to your account.
            </p>
            <div className="w-full flex justify-center items-center gap-4">
                <Button className="rounded-full px-5" asChild>
                    <Link href="/toolzen/browse">Browse Tools <Compass className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button className="rounded-full bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary px-5" asChild>
                    <Link href="/signup?ref=toolzen">Get Started <ChevronRight className="w-4 h-4 ml-2" /></Link>
                </Button>
            </div>

        </HeroWrapper>
        <Suspense fallback={<section className="w-full  min-h-96  mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0 flex flex-col lg:flex-row gap-4">
            <div className="w-96">
                <h2 className="text-2xl font-bold mb-2">
                    Browse Popular  Categories
                </h2>
                <div className="flex flex-col gap-2 p-4">
                    <Skeleton className="text-slate-600 text-lg font-semibold py-1 px-2 rounded-md hover:bg-slate-200/50 " />
                    <Skeleton className="text-slate-600 text-lg font-semibold py-1 px-2 rounded-md hover:bg-slate-100" />
                </div>
            </div>
            <div className="flex-auto">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold mb-2">
                        <Skeleton />
                    </h2>
                    <div className="flex flex-col gap-4">
                        <Skeleton className="flex flex-row gap-4 items-center" />
                        <Skeleton className="flex flex-row gap-4 items-center" />
                        <Skeleton className="flex flex-row gap-4 items-center" />
                    </div>
                </div>
            </div>
        </section>}>
            <Categorized categorized_tools={JSON.parse(JSON.stringify(categorized_tools))} />
        </Suspense>

        <section className="bg-primary/10 py-32 px-8  min-h-96  w-full" id="features">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-6xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Features
                </h2>
                <div className="flex">

                    <div className="flex flex-col items-start  gap-4 mt-7  w-full lg:w-50%">
                        {features.map((feature, index) => {
                            return <Feature key={index} feature={feature} />
                        })}
                    </div>
                    <div className="flex-auto  justify-center items-center  w-full lg:w-50% hidden lg:flex">
                        <Image src='/assets/images/toolzen_features.svg' width={928} height={720} alt={"ToolZen - NexoNauts"}
                            className="w-full h-full min-h-[28rem] aspect-[4/3] select-none	pointer-events-none"
                            draggable={false} />

                    </div>
                </div>

            </div>
        </section>
    </>)

}

function Feature({ feature }: { feature: { title: string, description: string, Icon: React.ElementType } }) {
    return (
        <div className="flex gap-4 items-center justify-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <feature.Icon className="w-6 h-6" />
            </div>
            <div className="mt-5">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">{feature.title}</h3>
                <p className="mt-2 text-base text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
        </div>
    )
}
