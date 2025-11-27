import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "src/models/product";
import { decodeHTMLEntities } from "src/utils/string";

export function ProductCard({ product, className }: { product: ProductType, className?: string }) {
  return (
    <Link
      key={product._id}
      href={`/marketplace/products/${product.slug!}`}
      className={cn(
        "flex flex-col rounded-xl overflow-hidden border border-border/50",
        "bg-card shadow-sm transition-all duration-300 group",
        "hover:shadow-md hover:border-primary/30",
        className
      )}
    >
      <div className="relative w-full aspect-video">
        <Image
          fill
          src={product.preview_url!}
          alt={decodeHTMLEntities(product.name)}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start gap-2 ">
          <h3 className="font-semibold line-clamp-1 text-base">
            {decodeHTMLEntities(product.name)}
          </h3>
          <ArrowUpRight className="size-4 shrink-0 mt-1 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:-translate-y-1 transition-transform duration-500" />
        </div>

        <div className="flex justify-between items-center">
          <div>
            {product.price ? (
              <Badge variant="info_light" size="sm" className="font-medium">
                ${product.price}
              </Badge>
            ) : (
              <Badge variant="default" size="sm" className="font-medium">
                Free
              </Badge>
            )}
          </div>

          <div>
            {product.categories!.length > 0 ? (
              <Badge variant="default_light" className="font-medium">
                {product.categories![0]}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
    </Link>);
}
