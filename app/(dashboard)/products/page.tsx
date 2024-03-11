import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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
    const products = await getProducts();

    const getAuthorizeUrl = (scope: string) => {
        const GUMROAD_CLIENT_ID = process.env.NEXT_PUBLIC_GUMROAD_APP_ID;
        if (!GUMROAD_CLIENT_ID) {
            throw new Error("GUMROAD_CLIENT_ID is not set");
        }
        const redirect_uri = process.env.NEXT_PUBLIC_WEBSITE_URL + "/products/import-from-gumroad?scope=" + scope;
        // https://gumroad.com/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=SCOPE
        const url = new URL("https://gumroad.com/oauth/authorize");
        url.searchParams.append("client_id", GUMROAD_CLIENT_ID);
        url.searchParams.append("scope", scope);
        url.searchParams.append("redirect_uri", redirect_uri);
        return url.toString();
    }


    return (<div className="space-y-6 p-10 pb-16 w-full mt-5">

        <div className="flex justify-between items-center flex-wrap">
            <h1 className="text-3xl font-bold">My Products</h1>
            <div className="flex gap-2">
                <Button variant="link" size="sm" asChild>
                    <Link href={`/products/new`} >
                        <Plus className="w-4 h-4 mr-2" />
                        New Product
                    </Link>
                </Button>
                <ProductSyncButton syncProducts={syncWithGumroad} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            Import from Gumroad
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href={getAuthorizeUrl("edit_products")} className="cursor-pointer">
                                View & Edit access
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={getAuthorizeUrl("view_profile")} className="cursor-pointer">
                                View Only access
                            </Link>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 divide-y">
            <Suspense fallback={<div>Loading...</div>}>
                {products.map((product) => {
                    return <div key={product._id} className="flex flex-col space-y-4">
                        <Image width={256} height={160} src={product.preview_url!} alt={product.name} className="w-full h-auto aspect-video object-cover rounded-lg" />
                        <div className="p-2">
                            <h2 className="text-xl font-semibold truncate">{product.name}</h2>
                            <div className="flex justify-end gap-2 p-2">
                                <DeleteProductButton/>
                                <Button variant="link" size="sm" asChild>
                                    <Link href={`/marketplace/products/${product.slug}/edit`} className="text-primary">Edit</Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/marketplace/products/${product.slug}`}>View</Link>
                                </Button>
                            </div>

                        </div>
                    </div>
                })}
            </Suspense>
        </div>



    </div>)
}