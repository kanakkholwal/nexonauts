import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "app/layouts/navbar";
import { getPublicToolBySlug,getSimilarTools } from "app/toolzen/lib/actions";
import { ExternalLink, Heart, HeartOff, Star, Zap } from 'lucide-react';
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
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
    // console.log(tool);

    const similarTools = await getSimilarTools(tool.categories);

    return (<>
        <Navbar />
        <main className="w-full mx-auto xl:max-w-7xl xl:px-0 rounded-lg overflow-hidden pt-20">
            <section id="tool-header" className="border-t border-x-border border-x rounded-t-lg  overflow-hidden mt-8">
                <div id="tool-banner" className="w-full h-40 bg-gray-200">
                    <img src={tool.bannerImage || tool.coverImage} alt={tool.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-full border-t py-4 px-6 flex flex-col md:flex-row justify-start items-start gap-4">
                    <div className="lg:-mt-16 z-30" id="tool-logo">
                        <img src={tool.coverImage} alt={tool.name} className="w-40 h-40 rounded-lg shadow-xl border border-slate-500/20  backdrop-blur-lg object-cover" />
                    </div>
                    <div id="tool-basic-info" className="flex flex-col items-start">
                        <h3 className="text-3xl font-bold">{tool.name}</h3>
                        <div id="tool-ratings">

                        </div>
                        <div className="mt-4">
                            <Badge variant="default_light" size="md" className="mr-2">{tool.pricing_type}</Badge>
                        </div>
                        {/* <div className="flex flex-row gap-4 justify-start items-stretch mt-5">
                            <Link href="#overview" className="text-base font-medium active:text-primary">Overview</Link>
                            <Link href="#pricing" className="text-base font-medium active:text-primary">Pricing</Link>
                            <Link href="#reviews" className="text-base font-medium active:text-primary">Features</Link>
                        </div> */}
                    </div>
                    <div id="tool-goto" className="lg:ml-auto flex items-center gap-2">
                        <Button size="sm" variant="destructive_light"
                        //  onClick={() =>{
                        //     toast.success("Added to favorites")
                        // }} 
                        >
                            {tool.verified ? <Heart className="inline-block w-5 h-5" /> : <HeartOff className="inline-block w-5 h-5" />}
                        </Button>

                        <Button asChild>
                            <Link href={tool.link + "?ref=nexonnauts.com/toolzen"} target="_blank">
                                <span >
                                    Check it out
                                </span>
                                <ExternalLink className="inline-block ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
            <section id="overview" className="py-4 px-6 border-t border-x-border border-x">
                <h3 className="text-2xl font-bold mb-4">
                    <Zap className="inline-block mr-2 w-5 h-5" /> Overview
                </h3>
                <p className="text-base font-medium text-muted-foreground">{tool.description}</p>
            </section>

            <section id="reviews" className="py-4 px-6 border-t border-x-border border-x border-b border-b-border mb-5">
                <h3 className="text-2xl font-bold mb-4">
                    <Star className="inline-block mr-2 w-5 h-5" />Ratings & Reviews
                </h3>
            </section>
            <section id="similar-tools">
                    <Suspense fallback={<div>Loading...</div>}>
                        <SimilarTools tools={similarTools} />
                    </Suspense>
            </section>
        </main>
    </>)
}