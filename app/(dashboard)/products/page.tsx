import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, ArrowUpRight, Import, LoaderCircle, Plus } from 'lucide-react';
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "src/lib/integrations/index";
import { deleteProduct, fetchFromIntegration, getProducts, importProduct } from "./actions";
import DeleteProductButton from "./components/delete-btn";
import { FilterAndSort, ImportedProductCard } from "./components/products";

export const metadata: Metadata = {
    title: "My Products",
    description: "My Products page"
}
type PageProps = {
    searchParams: {
        importFrom?: string;
        filter?: string;
        sort?: string;
    }
}
const availableIntegrations = ["gumroad"]

export default async function MyProducts({ searchParams }: PageProps) {
    const { products, integrated } = await getProducts(searchParams.filter ?? "all", searchParams.sort ?? "latest");

    const importFrom = availableIntegrations.includes(searchParams?.importFrom ?? "none") ? searchParams.importFrom : null;

    const getFromIntegrations = async () => {
        "use server";
        if (importFrom === null) return Promise.resolve([]);

        if (!availableIntegrations.includes(importFrom as string)) {
            return Promise.resolve([])
        }
        const data = await fetchFromIntegration(importFrom as string);
        return data;
    }
    const productsFromIntegrations = await getFromIntegrations();
    // filter out third-party products that are already in the database
    const productsIds = products.filter((product) => product.third_party !== null).map((product) => product.third_party.product_id);


    return (<div className="space-y-6 p-4 md:p-10 pb-16 w-full @container">

        <div className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold">My Products</h1>
            <div className="flex gap-2 flex-wrap">
                <Button variant="link" size="sm" asChild>
                    <Link href={`/products/new`} >
                        <Plus className="h-4 w-4" />
                        New Product
                    </Link>
                </Button>
                <FilterAndSort />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Import className="h-4 w-4" />
                            Import Products
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Import Products</SheetTitle>
                            <SheetDescription>
                                From third party platforms like Gumroad.This will help you to sync your products with the platform.
                            </SheetDescription>
                        </SheetHeader>
                        {importFrom !== null ?
                            <>
                                <h2 className="text-xl font-bold tracking-tight capitalize mt-5 mb-3">
                                    {importFrom} Products
                                </h2>
                                <Suspense fallback={<div className="p-4 flex justify-center flex-col items-center gap-4 h-64"><LoaderCircle className="h-24 w-24 m-auto animate-spin text-primary" /></div>}>
                                    <ScrollArea className="h-[42rem] md:h-[50rem] border-b">
                                        <div className="grid grid-cols-1 divide-y">
                                            {productsFromIntegrations
                                                .filter((product) => !productsIds.includes(product.third_party.product_id))
                                                .map((product) => <ImportedProductCard key={product.third_party.product_id} product={product} importProduct={importProduct.bind(null, product)} />)}
                                        </div>
                                    </ScrollArea>
                                </Suspense>
                            </> :
                            <div className="space-y-4">
                                {availableIntegrations.map((integration) => {
                                    return <div key={integration} className="p-4 flex justify-center flex-col items-center gap-4 h-64 rounded-lg bg-slate-100 dark:bg-neutral-800/40 mt-5">
                                        <Icon icon={integration} className="h-16 w-16" />
                                        {integrated ? <Button asChild>
                                            <Link href={`?importFrom=${integration}`} shallow>
                                                Import Products
                                                <ArrowRight className="h-5 w-5" />
                                            </Link>
                                        </Button> : <Button asChild>
                                            <Link href={`/settings/integrations/${integration}?next=${encodeURI("/products?importFrom=" + integration)}`} >
                                                Connect {integration}
                                                <ArrowUpRight className="h-5 w-5" />
                                            </Link>
                                        </Button>}
                                    </div>
                                })}
                            </div>}

                    </SheetContent>
                </Sheet>
            </div>
        </div>
        <Separator />
        <div className="grid gap-4 grid-cols-1 @4xl:grid-cols-4 @2xl:grid-cols-3 @sm:grid-cols-2">
            <Suspense fallback={<div>Loading...</div>}>
                {products.map((product) => {
                    return <div key={product._id} className="flex flex-col space-y-2 glassmorphism p-4 rounded-xl">
                        <Image width={256} height={160} src={product.preview_url!} alt={product.name} className="w-full h-auto aspect-video object-cover rounded-lg" />
                        <h2 className="text-xl font-semibold truncate">{product.name}</h2>
                        <div className="flex justify-end gap-2 p-2">
                            <DeleteProductButton deleteProduct={deleteProduct.bind(null, product._id)} />
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/products/${product.slug}/edit`} className="text-primary">Edit</Link>
                            </Button>
                            <Button variant="link" size="sm" asChild>
                                <Link href={`/marketplace/products/${product.slug}`} target="_blank" rel="noopener noreferrer">
                                    View <ArrowUpRight />
                                </Link>
                            </Button>
                        </div>
                    </div>
                })}
            </Suspense>
        </div>



    </div>)
}