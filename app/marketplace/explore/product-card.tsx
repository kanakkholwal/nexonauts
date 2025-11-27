"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "./types"; // Import the type

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    // Safe price display logic
    const displayPrice = product.price
        ? `$${product.price}`
        : "Free";

    const category = product.categories?.[0] || "Asset";

    return (
        <Link
            href={`/marketplace/products/${product.slug}`}
            className="group flex flex-col gap-4 w-full cursor-pointer"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted border border-border/40 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                <Image
                    fill
                    src={product.preview_url}
                    alt={product.name}
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                <div className="absolute top-3 left-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Badge
                        variant="secondary"
                        className="backdrop-blur-md bg-white/90 text-black dark:bg-black/80 dark:text-white border-none shadow-lg"
                    >
                        View Details
                    </Badge>
                </div>

                <div className="absolute bottom-3 right-3">
                    <Badge
                        variant="default"
                        className={cn(
                            "shadow-lg backdrop-blur-md border border-white/10",
                            product.price
                                ? "bg-black/80 text-white dark:bg-white/90 dark:text-black"
                                : "bg-emerald-500 text-white"
                        )}
                    >
                        {displayPrice}
                    </Badge>
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex justify-between items-start gap-4">
                    <h3 className="font-semibold text-base text-foreground leading-tight group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="truncate">{category}</span>
                </div>
            </div>
        </Link>
    );
}