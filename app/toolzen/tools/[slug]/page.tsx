import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { authOptions } from "app/api/auth/[...nextauth]/options";
import Navbar from "app/layouts/navbar";
import { getPublicToolBySlug, getRatingsAndReviews, getSimilarTools,postRatingAndReview } from "app/toolzen/lib/actions";
import { ExternalLink, Hash, Heart, HeartOff, Star, Zap } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MarkdownView from 'src/components/markdown/view';
import { PostReviewModal } from "./post-review-modal";
import SimilarTools from "./similar-tools";


export default async function ToolPage({ params }: {
    params: {
        slug: string
    }
}) {

    const tool = await getPublicToolBySlug(params.slug);
    if (!tool) {
        return notFound();
    }
    const session = await getServerSession(authOptions);
    console.log(session)


    const similarTools = await getSimilarTools(tool.categories);
    const ratings = await getRatingsAndReviews(tool._id);

    return (<>
        <Navbar />
        <main className="w-full mx-auto xl:max-w-7xl xl:px-0 rounded-lg overflow-hidden pt-20 space-y-4">

            <Card>
                <CardHeader className="flex flex-row gap-3 items-center ">
                    <div>
                        <Image width={320} height={320} src={tool.coverImage} alt={tool.name}
                            className="rounded-lg backdrop-blur-lg border border-border max-w-40" />
                    </div>
                    <div className="space-y-2">

                        <CardTitle title={tool.name}>{tool.name}</CardTitle>
                        <div className="space-y-2">
                            <Badge variant="default_light" size="sm">{tool.pricing_type}</Badge>
                            <div className="flex items-center">
                                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300 me-1" />
                                <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                                <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                                <a href="#reviews" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</a>
                            </div>

                        </div>
                    </div>
                </CardHeader>
                <CardContent className=" border-y border-y-border pt-5">
                    {tool.bannerImage === "https://via.placeholder.com/920" ? <>
                        <Image width={900} height={384} src={tool.coverImage} alt={tool.name} className="w-full h-auto max-h-96 rounded-lg shadow-xl backdrop-blur-lg object-cover border border-border  mx-auto" />
                    </> : <>
                        <Image width={900} height={384} src={tool.bannerImage || tool.coverImage} alt={tool.name}
                            className="w-full h-auto max-h-96 object-contain rounded-lg shadow-xl backdrop-blur-lg border border-border mx-auto aspect-video" />

                    </>}
                    <h5 className="text-lg font-semibold mt-4">Categories</h5>

                    <div className="flex flex-wrap gap-2 w-full items-center justify-start mt-2">
                        {tool.categories.map((category, index) => {
                            return <Badge key={category.slug + "_" + index} variant="success_light" size="sm" className="font-medium">
                                <Hash className="inline-block w-4 h-4 mr-1" />
                                {category.name}
                            </Badge>
                        })}
                    </div>
                </CardContent>
                <CardFooter className="gap-2 justify-center pt-4">
                    <Button variant="destructive_light">
                        {tool.verified ? <Heart className="inline-block w-5 h-5" /> : <HeartOff className="inline-block w-5 h-5" />}
                    </Button>
                    <Button
                        variant="gradient_blue"
                        asChild>
                        <Link href={tool.link + "?ref=nexonauts.com/toolzen"} target="_blank">
                            <span >
                                Check it out
                            </span>
                            <ExternalLink className="inline-block ml-2 w-4 h-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            <Card id="overview">
                <CardHeader>
                    <CardTitle><Zap className="inline-block mr-2 w-5 h-5 text-teal-600" /> Overview</CardTitle>
                    <CardDescription>
                        Learn about <strong>{tool.name}</strong> and it's pricing model and every basic thing I should know before using it.
                    </CardDescription>
                </CardHeader>
                <CardContent className="prose  dark:prose-invert  prose-slate">
                    <MarkdownView>{tool.description}</MarkdownView>
                </CardContent>
            </Card>
            <Card id="similar-tools">
                <CardHeader>
                    <CardTitle><Star className="inline-block mr-2 w-5 h-5 text-indigo-600" />
                        Similar Tools & Alternatives
                    </CardTitle>
                    <CardDescription>
                        You might also like these tools that are similar to <strong>{tool.name}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SimilarTools tools={similarTools} />
                    </Suspense>
                </CardContent>
            </Card>
            <Card id="reviews">
                <CardHeader>
                    <CardTitle>
                        <Star className="inline-block mr-2 w-5 h-5" />Ratings & Reviews
                    </CardTitle>
                    <CardDescription>
                        See what other users have to say about <strong>{tool.name}</strong>
                    </CardDescription>
                    {session && session.user ? <>
                        <PostReviewModal tool={tool} postRatingAndReview={postRatingAndReview} />
                    </> : <Button variant="gradient_blue" asChild>
                        <Link href="/login">
                            <span>Rate this tool</span>
                        </Link>
                    </Button>}
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="flex items-center mb-2">
                            {/* <Star className="w-4 h-4 fill-yellow-300 text-yellow-300 me-1" />
                            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300 me-1" />
                            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300 me-1" />
                            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300 me-1" />
                            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300 me-1" /> */}
                            <Rating 
                            count={5}
                            value={4.5}
                            readonly={true}
                            />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
                        <div className="flex items-center mt-4">
                            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">5 star</a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '70%' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">4 star</a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '17%' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">3 star</a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '8%' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">2 star</a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '4%' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">1 star</a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '1%' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
                        </div>
                    </div>

                    <Suspense fallback={<div>Loading...</div>}>
                        {ratings.map((rating:any) => {
                            return <div key={rating._id} className="flex flex-row gap-4 items-center justify-start">
                                <div className="flex flex-col items-start justify-start">
                                    <h4 className="text-lg font-semibold">{rating.rating}</h4>
                                    <p className="text-base text-muted-foreground line-clamp-2 text-pretty prose prose-sm  dark:prose-invert  prose-slate">
                                        {rating.comment}
                                    </p>
                                </div>
                            </div>
                        })}
                    </Suspense>
                </CardContent>
            </Card>
        </main>
    </>)
}