import AdUnit from "@/components/common/adsense";
import { ParamsFilter } from "@/components/extended/params-filter";
import { Button } from "@/components/ui/button";
import ConditionalRender from "@/components/utils/conditional-render";
import { CATEGORIES } from "data/marketplace";
import { Filter, Search, Sparkles, X } from "lucide-react";
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

  const hasActiveFilters = category || initialTags || initialPrice || initialQuery;

  return (
    <div className="min-h-screen bg-background selection:text-primary">
      {/* Subtle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-20">
        
        {/* Compact Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                Explore Assets
              </h1>
              <p className="text-sm text-muted-foreground">
                {decodedProducts.length} premium digital assets
              </p>
            </div>
            
            {/* Mobile Filter Toggle */}
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

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <SearchBar initialQuery={initialQuery} />
          </div>

          {/* Active Filters Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-xs font-medium text-muted-foreground">Active:</span>
              {category && (
                <Link
                  href={`/marketplace/explore?${new URLSearchParams({ ...params, category: "" }).toString()}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  {category}
                  <X className="w-3 h-3" />
                </Link>
              )}
              {initialPrice && (
                <Link
                  href={`/marketplace/explore?${new URLSearchParams({ ...params, price: "" }).toString()}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  {initialPrice}
                  <X className="w-3 h-3" />
                </Link>
              )}
              {initialTags && (
                <Link
                  href={`/marketplace/explore?${new URLSearchParams({ ...params, tags: "" }).toString()}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  Tags
                  <X className="w-3 h-3" />
                </Link>
              )}
              <Link
                href="/marketplace/explore"
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
              >
                Clear all
              </Link>
            </div>
          )}
        </div>

        {/* TOP AD UNIT */}
        <div className="mb-12">
          <div className="w-full min-h-[100px] rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] bg-size-[16px_16px]" />
            <div className="absolute top-2 left-4 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Sponsored
            </div>
            <div className="relative z-10">
              <AdUnit adSlot="display-horizontal" />
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Streamlined Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 h-fit">
            
            {/* Categories */}
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold">Categories</h3>
              </div>
              <ParamsFilter
                keyName="category"
                initialValue={category}
                options={CATEGORIES as unknown as string[]}
                title="Category"
                variant="minimal"
              />
            </div>

            {/* Price */}
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4">
              <h3 className="text-sm font-semibold mb-3">Price Range</h3>
              <ParamsFilter
                keyName="price"
                initialValue={initialPrice}
                options={["free", "paid", "under-$20", "premium"]}
                title="Price"
                variant="pills"
              />
            </div>

            {/* Trending Tags */}
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <h3 className="text-sm font-semibold">Trending</h3>
              </div>
              <ParamsFilter
                keyName="tags"
                initialValue={initialTags}
                options={tags.slice(0, 8).map((t) => t.tag)}
                title="Tags"
                allowMultiple={true}
                variant="pills"
              />
            </div>

            {/* SIDEBAR AD (300x250) */}
            <div className="w-full min-h-[280px] rounded-xl bg-card/40 backdrop-blur-sm border border-border/40 flex flex-col overflow-hidden">
              <div className="w-full py-2 bg-muted/50 border-b border-border/40 text-center">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                  Sponsored
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center p-4">
                <AdUnit adSlot="display-square" />
              </div>
            </div>

          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <ConditionalRender condition={decodedProducts.length === 0}>
                <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border border-dashed border-border/60 bg-card/20">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-5">
                    <Search className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    No results found
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/marketplace/explore">Reset Filters</Link>
                  </Button>
                </div>
              </ConditionalRender>

              <ConditionalRender condition={decodedProducts.length > 0}>
                <div className="space-y-12">
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {decodedProducts.slice(0, 6).map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>

                  {/* MID-CONTENT AD */}
                  {decodedProducts.length > 6 && (
                    <div className="w-full min-h-[250px] rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden relative">
                      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-size-[20px_20px]" />
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-muted/70 backdrop-blur-sm">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                          Featured Content
                        </span>
                      </div>
                      <div className="relative z-10 w-full flex items-center justify-center py-8">
                        <AdUnit adSlot="in_feed" />
                      </div>
                    </div>
                  )}

                  {/* Remaining Products */}
                  {decodedProducts.length > 6 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {decodedProducts.slice(6).map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </div>
                  )}

                  {/* BOTTOM MULTIPLEX AD */}
                  <div className="mt-16">
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        You Might Also Like
                      </span>
                      <div className="h-px flex-1 bg-border/50" />
                    </div>
                    <div className="min-h-[280px] w-full bg-card/40 backdrop-blur-sm rounded-2xl border border-border/40 flex items-center justify-center p-4 overflow-hidden relative">
                      <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] bg-size-[16px_16px]" />
                      <div className="relative z-10">
                        <AdUnit adSlot="multiplex_horizontal" />
                      </div>
                    </div>
                  </div>
                </div>
              </ConditionalRender>
            </Suspense>
          </main>

        </div>
      </div>
    </div>
  );
}