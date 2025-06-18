import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "src/models/product";
import { decodeHTMLEntities } from "src/utils/string";

export function ProductCard({ product, className }: { product: ProductType, className?: string }) {
  return (
    <div
      className={cn("flex flex-col gap-4 items-start p-4 rounded-lg border backdrop-blur-md bg-card transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:bg-card/80 border-muted-foreground/20 hover:border-primary/50 group", className)}>
      <Link href={`/marketplace/products/${product.slug}`}>
        <figure className="w-full h-auto relative">
          <Image
            src={product.preview_url}
            width={968}
            height={580}
            alt={decodeHTMLEntities(product.name)}
            className="w-full h-auto aspect-video object-cover rounded-lg"
          />
          <Badge variant="info" className="gap-1 absolute top-4 right-4">
            {product.price === 0 ? "Free" : `$ ${product.price}`}
          </Badge>
          <figcaption className="text-sm mt-2 font-medium line-clamp-2">
            {decodeHTMLEntities(product.name)}
          </figcaption>
        </figure>
      </Link>
    </div>
  );
}
