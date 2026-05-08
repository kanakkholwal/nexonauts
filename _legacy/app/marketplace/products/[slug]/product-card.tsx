import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { decodeHTMLEntities } from "src/utils/string";
import { Product } from "./types";

export function ProductCard({ product, className }: { product: Product, className?: string }) {
  const displayPrice = product.price ? `$${product.price}` : "Free";

  return (
    <Link
      href={`/marketplace/products/${product.slug}`}
      className={cn(
        "group flex flex-col gap-3 w-full cursor-pointer rounded-xl transition-all duration-300",
        className
      )}
    >
      {/* Visual */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted border border-border/40 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30">
        <Image
          fill
          src={product.preview_url}
          alt={decodeHTMLEntities(product.name)}
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Price Tag (Floating) */}
        <div className="absolute top-3 right-3 z-10">
          <Badge
            variant="secondary"
            className={cn(
              "backdrop-blur-md shadow-sm border-white/10 font-semibold",
              product.price
                ? "bg-white/90 text-black dark:bg-black/80 dark:text-white"
                : "bg-emerald-500/90 text-white"
            )}
          >
            {displayPrice}
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {decodeHTMLEntities(product.name)}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
        </div>

        {product.categories && product.categories.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {product.categories[0]}
          </p>
        )}
      </div>
    </Link>
  );
}