import { ParamsFilter } from "@/components/extended/params-filter";
import { Badge } from "@/components/ui/badge";
import ConditionalRender from "@/components/utils/conditional-render";
import InfoArea from "@/components/utils/info-area";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "data/marketplace";
import { ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { decodeHTMLEntities } from "src/utils/string";
import { getPopularMeta, getProducts, searchParamsType } from "./actions";
import {
  FiltersWrapper,
  ProductCardSkeleton,
  SearchBar
} from "./client";


interface ExplorePageProps {
  searchParams: Promise<searchParamsType>;
}

export default async function ExplorePage(props: ExplorePageProps) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category || "";
  const initialTags = searchParams?.tags || "";
  const initialPrice = searchParams?.price || "";
  const initialQuery = searchParams?.query || "";

  const { tags } = await getPopularMeta();
  const { products } = await getProducts(searchParams);

  // Decode HTML entities in product names
  const decodedProducts = products.map(product => ({
    ...product,
    name: decodeHTMLEntities(product.name)
  }));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filters Sidebar (Desktop) */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-24 h-fit">
          <div className="bg-card rounded-xl p-4 border border-border/50 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-border/75 mb-2">
              <h2 className="text-base font-semibold">Filters</h2>
            </div>
            <div className="space-y-6">
              <ParamsFilter
                keyName="category"
                initialValue={category}
                options={CATEGORIES}
                title="Category"
                key="category"
              />

              <ParamsFilter
                keyName="price"
                initialValue={initialPrice}
                options={["free", "paid", "0-10", "10-50", "50-100"]}
                title="Price Range"
                key="price"
              />
              <ParamsFilter
                keyName="tags"
                initialValue={initialTags}
                options={tags.map((tag) => tag.tag)}
                title="Popular Tags"
                allowMultiple={true}
                key="tags"
              />

            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-6">

          {/* Search and Filters */}
          <section className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between sm:justify-start space-x-2">
                <h1 className="text-lg font-semibold align-baseline">
                  Explore Marketplace
                  <Badge
                    variant="default"
                    size="sm"
                    className="ml-2 font-medium align-baseline"
                  >
                    {decodedProducts.length} Products found
                  </Badge>
                </h1>

              </div>
              <div className="relative flex-1 group inline-flex items-center w-full">
                <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 size-5 z-20 text-muted-foreground group-focus-within:text-primary" />
                <SearchBar initialQuery={initialQuery} />
                <FiltersWrapper
                  key="filters-mobile"
                  content={
                    <div className="space-y-6 p-4">
                      <h3 className="text-lg font-semibold">Filters</h3>
                      <ParamsFilter
                        keyName="category"
                        initialValue={category}
                        options={CATEGORIES}
                        title="Category"
                      />
                      <ParamsFilter
                        keyName="tags"
                        initialValue={initialTags}
                        options={tags.map((tag) => tag.tag)}
                        title="Popular Tags"
                        allowMultiple={true}
                      />
                      <ParamsFilter
                        keyName="price"
                        initialValue={initialPrice}
                        options={["free", "paid", "0-10", "10-50", "50-100"]}
                        title="Price Range"
                      />
                    </div>
                  }
                />
              </div>

            </div>
          </section>

          {/* Results */}
          <section id="results">
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton key={`skeleton_${i}`} />
                  ))}
                </div>
              }
            >
              <ConditionalRender condition={decodedProducts.length === 0}>
                <div className="py-10">
                  <InfoArea
                    title="No results found"
                    description="Try adjusting your search or filters"
                  />
                </div>
              </ConditionalRender>

              <ConditionalRender condition={decodedProducts.length > 0}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {decodedProducts.map((product) => (
                    <Link
                      key={product._id}
                      href={`/marketplace/products/${product.slug!}`}
                      className={cn(
                        "flex flex-col rounded-xl overflow-hidden border border-border/50",
                        "bg-card shadow-sm transition-all duration-300 group",
                        "hover:shadow-md hover:border-primary/30"
                      )}
                    >
                      <div className="relative w-full aspect-video">
                        <Image
                          fill
                          src={product.preview_url!}
                          alt={product.name}
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      <div className="p-4">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="font-semibold line-clamp-1">
                            {product.name}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 shrink-0 mt-1 text-muted-foreground group-hover:text-primary group-hover:-translate-y-1 transition-transform duration-200" />
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
                    </Link>
                  ))}
                </div>
              </ConditionalRender>
            </Suspense>
          </section>
        </main>
      </div>
    </div>
  );
}