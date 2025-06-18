import ConditionalRender from "@/components/utils/conditional-render";
import { ErrorBoundaryWithSuspense } from "@/components/utils/error-boundary";
import InfoArea from "@/components/utils/info-area";
import { getMoreProductsByCreator } from "./actions";

import { ProductCard } from "./product-card";

export default async function MoreFromCreator({ slug }: { slug: string }) {
  const products = await getMoreProductsByCreator(slug);

  return (
    <ErrorBoundaryWithSuspense
      loadingFallback={<div>Loading...</div>}
      fallback={<div>Error</div>}
    >
      <ConditionalRender condition={products.length > 0}>
        <div className="grid gap-4 px-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </ConditionalRender>

      <ConditionalRender condition={products.length === 0}>
        <InfoArea
          title="No products found"
          description="There are no more products from this creator"
        />
      </ConditionalRender>
    </ErrorBoundaryWithSuspense>
  );
}
