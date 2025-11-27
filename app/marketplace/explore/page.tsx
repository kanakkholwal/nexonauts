import { ParamsFilter } from "@/components/extended/params-filter";
import { Button } from "@/components/ui/button";
import ConditionalRender from "@/components/utils/conditional-render";
import { CATEGORIES } from "data/marketplace";
import { LayoutGrid, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { decodeHTMLEntities } from "src/utils/string";

// Components
import { FiltersWrapper, ProductCardSkeleton, SearchBar } from "./client";
import { MobileFilters } from "./mobile-filters";
import { ProductCard } from "./product-card";

// Types & Actions
import { getPopularMeta, getProducts } from "./actions";
import { Product, SearchParams, TagMeta } from "./types";

interface ExplorePageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ExplorePage(props: ExplorePageProps) {
  const params = await props.searchParams;

  // Safe default fallbacks
  const category = params.category || "";
  const initialTags = params.tags || "";
  const initialPrice = params.price || "";
  const initialQuery = params.query || "";

  // Mocking types for the action response to ensure type safety
  const { tags }: { tags: TagMeta[] } = await getPopularMeta();
  const { products }: { products: Product[] } = await getProducts(params);

  const decodedProducts: Product[] = products.map((product) => ({
    ...product,
    name: decodeHTMLEntities(product.name),
  }));

  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary pt-20">
      {/* Backgrounds... */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        {/* Header... */}
        <div className="flex flex-col gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
              Marketplace
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Premium digital assets, curated for the modern web stack.
            </p>
          </div>

          {/* Floating Command Bar */}
          <div className="sticky top-6 z-40 w-full">
            <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-card/70 backdrop-blur-xl border border-border/40 shadow-xl shadow-black/5 ring-1 ring-black/5">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <SearchBar initialQuery={initialQuery} />
              </div>

              <div className="h-6 w-px bg-border/50 mx-1" />

              <div className="hidden lg:flex items-center gap-2 pr-2">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-2">
                  <LayoutGrid className="w-4 h-4" />
                  <span>{decodedProducts.length} Results</span>
                </div>
              </div>

              <div className="lg:hidden">
                <FiltersWrapper
                  content={
                    <MobileFilters
                      category={category}
                      price={initialPrice}
                      tags={tags}
                      initialTags={initialTags}
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-32 space-y-10">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 pl-1">
                Categories
              </h3>
              <ParamsFilter
                keyName="category"
                initialValue={category}
                options={CATEGORIES as unknown as string[]}
                title="Category"
                variant="minimal"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 pl-1">
                Price
              </h3>
              <ParamsFilter
                keyName="price"
                initialValue={initialPrice}
                options={["free", "paid", "under-$20", "premium"]}
                title="Price"
                variant="tags"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 pl-1">
                Trending
              </h3>
              <div className="flex flex-wrap gap-2">
                <ParamsFilter
                  keyName="tags"
                  initialValue={initialTags}
                  options={tags.slice(0, 10).map((t) => t.tag)}
                  title="Tags"
                  allowMultiple={true}
                  variant="pills"
                />
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="lg:col-span-9 xl:col-span-10 min-h-[80vh]">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <ConditionalRender condition={decodedProducts.length === 0}>
                <div className="flex flex-col items-center justify-center py-32 text-center rounded-3xl border border-dashed border-border/60 bg-card/20">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    No matches found
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                    We couldn't find any assets matching your criteria.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/marketplace/explore">Clear Filters</Link>
                  </Button>
                </div>
              </ConditionalRender>

              <ConditionalRender condition={decodedProducts.length > 0}>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
                  {decodedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </ConditionalRender>
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}