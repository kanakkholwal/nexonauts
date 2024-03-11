import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getProducts } from "./actions";

export default async function Page() {
    const products = await getProducts();
    console.log(products);



    return (
        <>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <Suspense fallback={<div>Loading...</div>}>
                    {products.map((product) => {
                        return <Link href={`/marketplace/products/${product.slug!}`} key={product._id}

                            className={cn(
                                "flex flex-col gap-2 rounded-xl p-3 transition-all duration-300 ease-in-out transform hover:scale-103 hover:shadow-xl hover:translate-y-1 hover:translate-x",
                                "group bg-transparent dark:bg-transparent hover:bg-white/30 dark:hover:bg-slate-100/5 backdrop-blur-lg"
                            )}>
                            <Image width={512} height={320} src={product.preview_url!} alt={product.name!} className="w-full h-auto aspect-video object-cover rounded-lg" />
                            <div className="flex items-start justify-between flex-nowrap gap-3 mt-2">
                                <h3 className="text-base font-semibold">{product.name}</h3>
                                <ArrowUpRight className={cn(
                                    "w-6 h-6",
                                    "duration-300 ease-in-out translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0",
                                )} />
                            </div>
                            <div className="flex items-start justify-between flex-nowrap gap-3 divide-x">
                                {product.categories!.map((category) => {
                                    return <span key={category} className="text-sm font-semibold text-primary">{category}</span>
                                })}
                            </div>
                            <div className="flex items-start justify-between flex-nowrap gap-3">
                                {product.price  ? <Badge variant="info_light">${product.price}</Badge> : <Badge>Free</Badge>}
                            </div>
                        </Link>
                    })}
                </Suspense>
            </div>
        </>
    )
}