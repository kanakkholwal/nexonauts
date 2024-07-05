import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "src/models/product";

export function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="rounded-lg bg-card px-3 lg:p-4 border border-border">
      <Link href={`/marketplace/products/${product.slug}`}>
        <figure className="w-full h-auto relative">
          <Image
            src={product.preview_url}
            width={968}
            height={580}
            alt={product.name}
            className="w-full h-auto aspect-video object-cover rounded-lg"
          />
          <Badge variant="info" className="gap-1 absolute top-4 right-4">
            {product.price === 0 ? "Free" : `$ ${product.price}`}
          </Badge>
          <figcaption className="text-lg text-center mt-2 font-semibold">
            {product.name}
          </figcaption>
        </figure>
      </Link>
    </div>
  );
}
