import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CatgeoryNavigation from "src/components/navigation/tabs";
import CatgeoryNavigationMobile from "src/components/navigation/tabs-mobile";
import { CATEGORIES } from "src/constants/marketplace";
import { getProducts } from "./actions";

export default async function Page() {
    const products = await getProducts();
    console.log(products);



    return (
        <>
        <div className="min-h-96 mx-auto flex flex-col items-center space-y-5 mt-20 mb-32">
            <h1 className="text-[clamp(2.75rem,4.25vw,4.5rem)] max-w-[20ch] text-center font-bold text-gray-800 dark:text-gray-200 leading-none">
                Marketplace 
                <span className="text-gray-600 dark:text-gray-400 ml-3">for frontend developers and web designers.</span>
            </h1>
            <p className="text-base mx-auto text-center xl:text-lg 2xl:text-xl pt-5 max-w-[50ch] font-medium leading-6 text-gray-700 dark:text-gray-500">
            Dive into a world of beautifully crafted themes, templates, and assets curated for your next project. 
            </p>
        </div>
        <section className="mx-auto flex gap-2 items-center justify-center flex-col">
            <CatgeoryNavigationMobile categories={CATEGORIES} />
            <CatgeoryNavigation categories={CATEGORIES} />
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <Suspense fallback={<div>Loading...</div>}>
                    {products.map((product) => {
                        return <Link key={product._id}
                            href={`/marketplace/products/${product.slug!}`}
                            className={cn(
                                "flex flex-col justify-between gap-2 rounded-xl p-3 transition-all duration-300 ease-in-out transform hover:scale-103 shadow-sm hover:shadow-xl hover:translate-y-1 hover:translate-x",
                                "group  dark:bg-transparent bg-white/30 dark:hover:bg-slate-100/5 backdrop-blur-lg"
                            )}>
                            <Image width={512} height={320} src={product.preview_url!} alt={product.name!} className="w-full h-auto aspect-video object-cover rounded-lg" />
                            <div className="flex items-start justify-between flex-nowrap gap-3 mt-2">
                                <h3 className="text-base font-semibold">{product.name}</h3>
                                <ArrowUpRight className={cn(
                                    "w-6 h-6",
                                    "duration-300 ease-in-out translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0",
                                )} />
                            </div>
                            <div className="flex items-start justify-between flex-nowrap gap-3">
                                {product.price  ? <Badge variant="info_light">${product.price}</Badge> : <Badge>Free</Badge>}
                                {product.categories!.length > 0  ? <Badge variant="secondary">{product.categories![0]}</Badge> : null}
                            </div>
                        </Link>
                    })}
                </Suspense>
            </div>
        </section>
        </>
    )
}