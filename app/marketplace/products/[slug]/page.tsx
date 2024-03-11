import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Heart } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdOutlineAttachMoney } from "react-icons/md";
import MarkdownView, { defaultOptions } from "src/components/markdown/view";
import { getProductBySlug } from "./actions";


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
                <h1 className="text-5xl font-bold mb-4 text-center tracking-wider">{product.name}</h1>
                <div className="flex items-center mx-auto w-full justify-center gap-2 divide-x">
                    <Badge variant="info" className="gap-1">
                        {product.price === 0 ? "Free" : <>
                            <MdOutlineAttachMoney className="w-4 h-4" />
                            {product.price}
                        </>}
                    </Badge>
                    <span className="text-sm font-semibold text-slate-400 dark:text-slate-300">
                        Published on {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                </div>
                <div className="mt-14 p-3">
                    <Image src={product.preview_url} width={968} height={580} alt={product.name} className="w-full h-auto aspect-video object-cover rounded-lg max-w-5xl mx-auto" />
                </div>
                <div className="mt-4 p-3 w-full flex justify-center items-center gap-2">
                    <Button size="lg" variant="outline" className="rounded-full ">
                        <Heart className="w-6 h-6" />
                    </Button>
                    <Button size="lg" className="rounded-full " asChild>
                        <Link href={product.url} target="_blank" rel="noopener noreferrer">
                            Get it now
                            <ArrowUpRight className="w-6 h-6 ml-2" />
                        </Link>
                    </Button>
                </div>

                <div className="mt-5 p-3 flex justify-center items-center flex-wrap mx-auto gap-2">
                    {product.tags!.map((tag) => {
                        return <Badge key={tag} variant="info_light">{tag}</Badge>
                    })}
                </div>
                <MarkdownView className="mt-4 prose dark:prose-invert" options={defaultOptions}>
                    {product.description}
                </MarkdownView>
            </div>
        </>
    )
}