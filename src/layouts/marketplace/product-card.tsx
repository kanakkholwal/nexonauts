import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {

    return (<Card className="rounded-3xl border-0 shadow-md shadow-slate-200">
        <CardHeader>
            <Image src={product.coverImage} className=" w-96 h-64 object-cover rounded-xl" width={600} height={400} alt={product.title} />
        </CardHeader>
        <CardContent>
            <div className="flex justify-between w-full gap-2 items-center">
                <CardTitle>
                    {product.title}
                </CardTitle>
            </div>
            <CardDescription>
                {product.short_description}
            </CardDescription>
        </CardContent>
        <CardFooter className="justify-between">
            <span className="text-primary uppercase font-semibold">
                {product.price.currency} {product.price.amount}
            </span>
            <Link href={`/marketplace/products/${product.slug}`} className="text-primary font-semibold bg-primary/20 uppercase px-4 py-2 rounded-md">
                Get it now
            </Link>
        </CardFooter>
    </Card>
    )
}
export function ProductCardOnDashboard({ product }) {

    return (<Card className="rounded-2xl border-0 shadow-md shadow-slate-200">
        <CardHeader>
            <Image src={product.coverImage} className="w-96 h-64 object-cover rounded-xl" width={600} height={400} alt={product.title} />
        </CardHeader>
        <CardContent>
            <CardTitle>
                {product.title}
            </CardTitle>
        </CardContent>
        <CardFooter className="justify-between">
            <span className="text-primary uppercase font-semibold">
                {product.price.currency} {product.price.amount}
            </span>
            <span className="text-primary font-semibold bg-primary/20 uppercase px-3 py-1 text-sm rounded-md" title={product.price.amount === 0 ? "Free" : "Paid"}>
                    {product.price.amount === 0 ? "Free" : "Paid"}
            </span>
        </CardFooter>
    </Card>
    )

}
export function ProductCardSkeleton() {
    return (<Card className="rounded-3xl border-0 shadow-md shadow-slate-200">
        <CardHeader>
            <Skeleton className="w-full h-48 rounded-xl" />
        </CardHeader>
        <CardContent>
            <CardTitle className="mb-4 flex w-full justify-between">
                <Skeleton className="w-1/2 h-6" />
                <Skeleton className="w-10 h-6" />
            </CardTitle>
            <CardDescription>
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-3/4 h-4" />
            </CardDescription>
        </CardContent>
        <CardFooter className="justify-between">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-28 h-8" />
        </CardFooter>
    </Card>
    )
}