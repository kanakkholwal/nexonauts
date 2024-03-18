import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Heart, MoveLeft } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownView, { defaultOptions } from "src/components/markdown/view";
import { getProductBySlug } from "./actions";

import { Metadata } from 'next';


export async function generateMetadata({ params }: {
    params: { slug: string }
}): Promise<Metadata> {
    const product = await getProductBySlug(params.slug);

    if (!product) return notFound();

    return {
        title: `${product.name}`,
        description: product.description.substring(0, 160) + "...",
        openGraph: {
            type: 'website',
            title: `${product.name}`,
            description: product.description.substring(0, 160) + "...",
            siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/marketplace/products/${product.slug}`,
            images: [{ url: product.preview_url, alt: product.name }],
        }
    };
}


export default async function ProductPage({ params }: {
    params: {
        slug: string;
    }
}) {
    const product = await getProductBySlug(params.slug);
    if (!product) {
        return notFound();
    }




    return (
        <>

            <div className="w-full max-w-7xl my-10 mx-auto">
                <Button size="sm" variant="link"  asChild>
                    <Link href="/marketplace">
                        <MoveLeft className="w-4 h-4 mr-2" />
                        Back 
                    </Link>
                </Button>
                <h1 className="text-5xl font-bold mb-4 text-center tracking-wider">{product.name}</h1>
                <div className="flex items-center mx-auto w-full justify-center gap-2 divide-x">
                    <Badge variant="info" className="gap-1">
                        {product.price === 0 ? "Free" : `$ ${product.price}`}
                    </Badge>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-300">
                        Published on {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                </div>
                <div className="mt-14 p-3">
                    <Image src={product.preview_url} width={968} height={580} alt={product.name} className="w-full h-auto aspect-video object-cover rounded-lg max-w-5xl mx-auto" />
                </div>
                {/* <div className="mt-4 p-3 w-full flex justify-center items-center gap-2">
                    <Button size="lg" variant="outline" className="rounded-full ">
                        <Heart className="w-6 h-6" />
                    </Button>
                    <Button size="lg" className="rounded-full " asChild>
                        <Link href={product.url} target="_blank" rel="noopener noreferrer">
                            Get it now
                            <ArrowUpRight className="w-6 h-6 ml-2" />
                        </Link>
                    </Button>
                </div> */}

                <div className="mt-5 p-3 flex justify-center items-center flex-wrap mx-auto gap-2">
                    {product.tags!.map((tag) => {
                        return <Badge key={tag} variant="info_light">{tag}</Badge>
                    })}
                </div>
                <div className="relative w-full gap-4 flex justify-around items-start flex-col lg:flex-row max-w-7xl mx-auto p-3">
                    
                    <div className="w-full lg:w-2/3 rounded-lg border text-card-foreground shadow-sm backdrop-blur-sm bg-card dark:bg-[#30353c] dark:border-slate-700 p-6">
                    <MarkdownView className="mt-4 prose dark:prose-invert" options={defaultOptions}>
                        {product.description}
                    </MarkdownView>
                    </div>
                    <div className="flex flex-col gap-4 w-full lg:w-1/3 lg:sticky lg:top-0">
                        <Button size="lg" className="rounded-full uppercase tracking-wider" asChild>
                            <Link href={product.url} target="_blank" rel="noopener noreferrer">
                                Get it Now
                                <ArrowUpRight className="w-6 h-6 ml-2" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full ">
                            <Heart className="w-6 h-6 mr-2" />
                            Add to favorites
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}