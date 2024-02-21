import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "app/layouts/navbar";
import dbConnect from "lib/dbConnect";
import { ChevronRight, Compass, Search, ShieldCheck, Star } from 'lucide-react';
import { Metadata } from "next";
import Link from 'next/link';
import { Suspense } from "react";
import LazyImage from "src/components/image";
import PublicTool from 'src/models/tool';
import { formatNumber } from "src/utils/formaters";
import { Categorized } from "./categoried";
import { HeroWrapper } from "./hero";
// import Autoplay from "embla-carousel-autoplay"
import { Badge } from "@/components/ui/badge";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
export const metadata: Metadata = {
    title: "Nexo Scout - AI Tools, Services, and Resources",
    description: "Nexo Scout is a curated list of AI tools, services, and resources. Find the best AI tools for your business.",
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
        title: "Submit your own tools to be listed on Nexo Scout",
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
    const noOfTools = await PublicTool.countDocuments({ status: "published" || "approved" });
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
        { $sort: { name: 1 } }
    ]);


    return (<>
        <header className="dark">
            <Navbar />
        </header>

        <HeroWrapper className="dark">

            <h1 className="text-5xl font-bold mb-2 text-center text-white">
                Find the best AI tools for your business.
            </h1>
            <p className="text-gray-400 text-2xl font-semibold text-center mt-3 mb-5 line-clamp-3">
                Nexo Scout is a curated list of AI tools, services, and resources.
            </p>
            <div className="relative w-full rounded-full overflow-hidden flex">
                <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 dark:text-white" />
                <Input placeholder="Search any tool for anything..." variant="fluid" className="border-2 focus:border-primary rounded-full py-4 h-14 pl-12" />
            </div>
            <p className="text-gray-400 text-md font-semibold text-center max-w-4xl break-words mt-8 mb-5 line-clamp-3">
                Now with {formatNumber(noOfTools)}+ tools and growing. <Link href="/toolzen/submit" className="text-primary hover:underline">Submit a tool</Link> to be listed on ToolZen.<br />
                You can also save your favorite tools to your account.
            </p>
            <div className="w-full flex justify-center items-center gap-4">
                <Button className="rounded-full px-5" asChild>
                    <Link href="/tool-scout/browse">Browse Tools <Compass className="w-4 h-4 ml-2" /></Link>
                </Button>
                <Button variant="default_light" className="rounded-full px-5" asChild>
                    <Link href="/signup?ref=tool-scout">Get Started <ChevronRight className="w-4 h-4 ml-2" /></Link>
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
                <h2
                    className="text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-200">
                    Featured Tools
                </h2>
                <Carousel
                    // plugins={[
                    //     Autoplay({
                    //       delay: 2000,
                    //     }),
                    //   ]}
                    className="w-full max-w-5xl mx-auto">
                    <CarouselContent className="-ml-1">
                        {categorized_tools[0].tools.map((tool, index:number) => (
                            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                <Link href={`/tool-scout/tools/${tool.slug}`} className="p-1">
                                    <Card className="rounded-3xl">
                                        <CardHeader>
                                            <div className="flex flex-col w-full h-auto aspect-video overflow-hidden bg-gray-100 dark:bg-slate-800 rounded-xl">
                                                <div className="relative flex items-center justify-center flex-shrink-0 h-full group">
                                                    <LazyImage className=" h-auto rounded-lg shadow-md mx-auto object-cover object-left-top transition ease-in-out duration-300"
                                                        width={350}
                                                        height={200}
                                                        src={tool.coverImage} alt={tool.name} />
                                                    <div className="absolute inset-0 transition duration-200 bg-gray-900 opacity-0 rounded-2xl group-hover:opacity-60"></div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <h4 className="text-xl font-semibold mb-2">{tool.name}</h4>
                                            <Badge variant="default_light" size="sm">{tool.pricing_type}</Badge>

                                        </CardContent>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="h-12 w-12" />
                    <CarouselNext className="h-12 w-12" />
                </Carousel>

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
