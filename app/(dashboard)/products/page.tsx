import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getProducts, syncWithGumroad } from "./actions";
import DeleteProductButton from "./delete-btn";
import ProductSyncButton from "./sync-btn";

export const metadata: Metadata = {
    title: "My Products",
    description: "My Products page"
}


export default async function MyProducts() {
    const {products,integrated} = await getProducts();


    return (<div className="space-y-6 p-4 md:p-10 pb-16 w-full mt-5">

        <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold">My Products</h1>
            <div className="flex gap-2 flex-wrap">
                <Button variant="link" size="sm" asChild>
                    <Link href={`/products/new`} >
                        <Plus className="w-4 h-4 mr-2" />
                        New Product
                    </Link>
                </Button>
                {integrated && <ProductSyncButton syncProducts={syncWithGumroad} />}
                {!integrated && (<Button variant="outline" size="sm" asChild>
                    <Link href={`/settings/integrations/gumroad`} >
                        Connect Gumroad
                    </Link>
                </Button>)}

            </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-y">
            <Suspense fallback={<div>Loading...</div>}>
                {products.map((product) => {
                    return <div key={product._id} className="flex flex-col space-y-2 glassmorphism p-4 rounded-xl">
                        <Image width={256} height={160} src={product.preview_url!} alt={product.name} className="w-full h-auto aspect-video object-cover rounded-lg" />
                        <h2 className="text-xl font-semibold truncate">{product.name}</h2>
                        <div className="flex justify-end gap-2 p-2">
                            <DeleteProductButton />
                            <Button variant="link" size="sm" asChild>
                                <Link href={`/products/${product.slug}/edit`} className="text-primary">Edit</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/marketplace/products/${product.slug}`} target="_blank"
                                    rel="noopener noreferrer"
                                >View</Link>
                            </Button>
                        </div>
                    </div>
                })}
            </Suspense>
        </div>



    </div>)
}