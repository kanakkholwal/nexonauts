import { Button } from "@/components/ui/button";
import Navbar from "app/layouts/navbar";
import PublicTool from 'app/toolzen/models/tool';
import dbConnect from "lib/dbConnect";
import { ExternalLink, Gem, Heart, HeartOff, Star, Zap } from 'lucide-react';
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ToolPage({ params }: {
    params: {
        slug: string
    }
}) {
    await dbConnect();
    const slug = params.slug;
    const tool = await PublicTool.findOne({ slug, status: "published" || "approved" });
    if (!tool) {
        notFound();
    }
    console.log(tool);

    return (<>
    <Navbar />
        <main className="w-full mx-auto xl:max-w-6xl xl:px-0 bg-white rounded-lg overflow-hidden pt-20">
            <section id="tool-header" className="border-t border-x-border border-x rounded-t-lg  overflow-hidden">
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
                        <div className="flex flex-row gap-4 justify-start items-stretch mt-5">
                            <Link href="#overview" className="text-base font-medium active:text-primary">Overview</Link>
                            <Link href="#pricing" className="text-base font-medium active:text-primary">Pricing</Link>
                            <Link href="#reviews" className="text-base font-medium active:text-primary">Features</Link>
                        </div>
                    </div>
                    <div id="tool-goto" className="lg:ml-auto flex items-center gap-2">
                        <Button size="sm" className="bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600"
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
                    <Zap className="inline-block mr-2 w-5 h-5" /> {tool.name} Overview
                </h3>
                <p className="text-base font-medium">{tool.description}</p>
            </section>
            <section id="pricing" className="py-4 px-6 border-t border-x-border border-x">
                <h3 className="text-2xl font-bold mb-4">
                    <Gem className="inline-block mr-2 w-5 h-5" /> {tool.name} Pricing
                </h3>
                <div className="flex flex-wrap items-stretch justify-around gap-4">
                    <div className="w-full max-w-sm border rounded-md p-4">
                        <h4 className="text-xl font-bold capitalize">{tool.pricing_type}</h4>
                        <p className="text-base font-medium">
                            {tool.pricing_type === "free" ? "Free forever" : tool.pricing_type === "freemium" ? "Free to start, paid plans available" : "Paid"}
                        </p>
                    </div>
                </div>


            </section>
            <section id="reviews" className="py-4 px-6 border-t border-x-border border-x">
                <h3 className="text-2xl font-bold mb-4">
                    <Star className="inline-block mr-2 w-5 h-5" /> {tool.name} Ratings & Reviews
                </h3>
            </section>
        </main>
    </>)
}