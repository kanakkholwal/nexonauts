import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import Navbar from "app/layouts/navbar-static";
import { getPublicToolBySlug, getRatingsAndReviews, getSimilarTools, getToolMetaBySlug, postRatingAndReview, toggleBookmark } from "app/scout/lib/actions";
import { getAverageRating } from "app/scout/lib/utils";
import { ExternalLink, Hash, Lock, MessageCircle, Star, Zap } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MarkdownView from 'src/components/markdown/view';
import { RatingTypeWithId } from 'src/models/tool-rating';
import { formatNumber } from "src/utils/formaters";
import { BookMarkButton } from './bookmark';
import { PostReview } from "./post-review";
import RatingComponent, { RatingSkeletonLoader } from './rating';
import SimilarTools from "./similar-tools";


type Props = {
    params: { slug: string }
}
export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const slug = params.slug

    const tool = await getToolMetaBySlug(slug);
    return {
        title: tool.name,
        description: tool.description.substring(0, 160),
        keywords: tool.tags?.join(", ") || tool.categories.map((category) => category.name).join(", "),
        metadataBase: new URL((process.env.NEXT_PUBLIC_WEBSITE_URL || "https://nexonauts.com") + "/scout/tools/" + tool.slug),
        openGraph: {
            images: [tool.coverImage, tool.bannerImage || tool.coverImage],
            title: tool.name,
            description: tool.description.substring(0, 160),
            url: (process.env.NEXT_PUBLIC_WEBSITE_URL || "https://nexonauts.com") + "/scout/tools/" + tool.slug,
        },
        category: tool.categories.map((category) => category.name).join(", "),
    }
}

export default async function ToolPage({ params }: Props) {

    const tool = await getPublicToolBySlug(params.slug);
    if (!tool) {
        return notFound();
    }
    const session = await getServerSession(authOptions);
    console.log(tool)


    const similarTools = await getSimilarTools(tool.categories);
    const ratings = await getRatingsAndReviews(tool._id);
    // console.log(ratings);

    const bannerURL =  new URL(`https://api.microlink.io/`);
    // ?url=https://codeium.com&screenshot=true&meta=false&embed=screenshot.url
    bannerURL.searchParams.append("url", tool.link);
    bannerURL.searchParams.append("screenshot", "true");
    bannerURL.searchParams.append("meta", "false");
    bannerURL.searchParams.append("embed", "screenshot.url");


    async function publishRating(data: {
        rating: number,
        comment: string
    }) {
        "use server"
        try {
            if (!session || !session?.user) {
                return Promise.reject("You need to be logged in to rate a tool")
            }
            const rating = await postRatingAndReview({
                toolId: tool._id!,
                userId: session?.user?._id!,
                rating: data.rating,
                comment: data.comment
            });
            return Promise.resolve(rating);
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }

    }

    return (<>
        <Navbar />
        <div className="relative" id="home">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
            <div className="max-w-7xl mx-auto relative isolate px-6 md:px-12 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true">
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>
        <main className="w-full mx-auto xl:max-w-7xl xl:px-0 rounded-lg overflow-hidden pt-28 px-2 space-y-4">

            <Card variant="glass">
                <CardHeader className="flex flex-row gap-3 items-center flex-wrap">
                    <div className="flex-1 space-y-4">
                        <div className="flex flex-row gap-3 items-center justify-start">
                            <Image width={320} height={320} src={tool.coverImage} alt={tool.name}
                                className="rounded-lg backdrop-blur-lg border border-border max-w-40 p-2" />
                            <CardTitle title={tool.name} className="text-5xl font-bold">{tool.name}</CardTitle>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 ml-auto">
                        <Suspense fallback={null}>
                            <BookMarkButton tool={tool} toggleBookmark={toggleBookmark} userId={session?.user?._id! || null} />
                        </Suspense>
                        <Button
                            variant="default"
                            transition="damped"
                            className="rounded-full px-6 py-2"
                            asChild>
                            <Link href={tool.link + "?ref=nexonauts.com/scout&utm_source=nexonauts&utm_medium=nexoscout&utm_campaign=" + tool.name} target="_blank">
                                <span>
                                    Check it out
                                </span>
                                <ExternalLink className="inline-block" />
                            </Link>
                        </Button>
                    </div>
                    <div className="w-full space-y-4">
                        <div className="inline-flex flex-wrap gap-2 w-full items-center justify-start">
                            <Badge variant="default_light" size="sm">{tool.pricing_type}</Badge>
                            <div className="inline-flex items-center">
                                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300 me-1" />
                                <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{getAverageRating(ratings || [])}</p>
                                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                                <a href="#reviews" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{formatNumber(ratings.length)} reviews</a>
                            </div>
                        </div>
                        <div className="inline-flex flex-wrap gap-2 w-full items-center justify-start">
                            {tool.categories.map((category, index) => {
                                return <Badge key={category.slug + "_" + index} variant="success_light" className="font-medium">
                                    <Hash className="inline-block w-4 h-4" />
                                    {category.name}
                                </Badge>
                            })}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className=" border-y border-y-border pt-5 flex-col flex items-center justify-center gap-4">
                        <Image width={900} height={384} src={bannerURL.toString()} alt={tool.name}
                            className="w-full h-auto max-w-3xl object-cover rounded-lg shadow-xl backdrop-blur-lg border border-border mx-auto aspect-video" />
                </CardContent>
            </Card>

            <Card id="overview" className="backdrop-blur bg-white dark:bg-gray-600/30">
                <CardHeader>
                    <CardTitle><Zap className="inline-block mr-2 w-5 h-5 text-teal-600" /> Overview</CardTitle>
                    <CardDescription>
                        Learn about <strong>{tool.name}</strong> and it's pricing model and every basic thing I should know before using it.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <MarkdownView className="prose dark:prose-invert prose-slate max-w-full">{tool.description}</MarkdownView>
                </CardContent>
            </Card>
            <Card id="similar-tools" className="backdrop-blur bg-white dark:bg-gray-600/30">
                <Suspense fallback={<div>Loading...</div>}>
                    <SimilarTools tools={similarTools} toolName={tool.name} />
                </Suspense>
            </Card>
            <Card id="reviews" className="backdrop-blur bg-white dark:bg-gray-600/30">
                <CardHeader className="flex items-center w-full gap-2 flex-col md:flex-row">
                    <div>
                        <CardTitle>
                            <Star className="inline-block mr-2 w-6 h-6" />Ratings & Reviews
                        </CardTitle>
                        <CardDescription>
                            See what other users have to say about <strong>{tool.name}</strong>
                        </CardDescription>
                    </div>

                </CardHeader>
                <CardContent>
                    <div className="flex items-center mb-2 gap-2">
                        <span className="text-2xl font-bold text-slate-900 dark:text-white/80">
                            {getAverageRating(ratings || [])} of 5
                        </span>
                        <Rating
                            count={5}
                            value={getAverageRating(ratings || [])}
                            readonly={true}
                        />
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 inline-flex items-center">
                        <span className="font-semibold hover:underline cursor-pointer">
                            {formatNumber(ratings.length)}{" "} ratings
                        </span>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                        We don't verify reviews.
                    </p>

                    <Tabs defaultValue="all-reviews" className="w-full mt-5">
                        <TabsList className="w-full">
                            <TabsTrigger value="all-reviews">
                                All Reviews
                            </TabsTrigger>
                            <TabsTrigger value="your-review">Your Review</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all-reviews" className="py-4 space-y-4">
                            <Suspense fallback={<>
                                <RatingSkeletonLoader />
                                <RatingSkeletonLoader />
                                <RatingSkeletonLoader />
                            </>}>
                                {ratings.map((rating: RatingTypeWithId) => {
                                    return <RatingComponent key={rating._id} rating={rating} />
                                })}
                                {ratings.length === 0 && <div className="flex items-center justify-center flex-col gap-2">
                                    <MessageCircle className="w-24 h-24 text-gray-400" />
                                    <h3 className="text-gray-500 text-xl font-semibold">No reviews yet.</h3>
                                    <p className="text-gray-500 text-base">
                                        Be the first to rate this tool and share your experience with the community.
                                    </p>
                                </div>}
                            </Suspense>
                        </TabsContent>
                        <TabsContent value="your-review">
                            <div className="flex items-center justify-center flex-col gap-2 mx-auto">
                                <Suspense fallback={<>
                                    <RatingSkeletonLoader />
                                </>}>
                                    {(session && session?.user) ? <>
                                        <PostReview tool={tool} postRatingAndReview={publishRating} />
                                    </> : <div className="flex items-center justify-center flex-col gap-2 py-4">
                                        <Lock className="w-24 h-24 text-gray-400" />
                                        <h3 className="text-gray-500 text-xl font-semibold">
                                            You need to be logged in.
                                        </h3>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400  mb-2">
                                            Login to rate this tool and share your experience with the community.
                                        </p>
                                        <Button asChild>
                                            <Link href={"/login?callbackUrl=" + encodeURI(process.env.NEXT_PUBLIC_WEBSITE_URL + "/scout/tools/" + tool.slug)}>
                                                Login
                                            </Link>
                                        </Button>
                                    </div>}
                                </Suspense>
                            </div>
                        </TabsContent>
                    </Tabs>

                </CardContent>
            </Card>
        </main>
    </>)
}