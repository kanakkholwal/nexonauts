import ConditionalRender from "@/components/utils/conditional-render";
import { ErrorBoundaryWithSuspense } from "@/components/utils/error-boundary";
import InfoArea from "@/components/utils/info-area";
import { getMoreProductsByCreator } from "./actions";
import { ProductCard } from "./product-card";
import { Product } from "./types";

export default async function MoreFromCreator({ slug }: { slug: string }) {
  // Ensure return type casting if action isn't strictly typed yet
  const products = (await getMoreProductsByCreator(slug)) as Product[];

  return (
    <ErrorBoundaryWithSuspense
      loadingFallback={<div className="h-40 w-full animate-pulse bg-muted rounded-xl" />}
      fallback={<div className="text-muted-foreground text-sm">Unable to load products.</div>}
    >
      <ConditionalRender condition={products.length > 0}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </ConditionalRender>

      <ConditionalRender condition={products.length === 0}>
        <InfoArea
          title="No other products"
          description="This creator hasn't published anything else yet."
          className="border-none bg-muted/20"
        />
      </ConditionalRender>
    </ErrorBoundaryWithSuspense>
  );
}