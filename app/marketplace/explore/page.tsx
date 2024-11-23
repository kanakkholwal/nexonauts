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
import { getPopularMeta, getProducts, searchParamsType } from "./actions";
import {
  CategoryBoxes,
  FiltersWrapper,
  ProductCardSkeleton,
  SearchBar,
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

  return (
    <div className="flex items-start justify-center w-full gap-5 mx-auto p-3">
      <aside className="bg-glass w-full max-w-sm rounded-xl p-4 hidden lg:flex flex-col sticky top-20 space-y-4">
        <ParamsFilter
          keyName="category"
          initialValue={category}
          options={CATEGORIES}
          key="category"
        />
        <ParamsFilter
          keyName="tags"
          initialValue={initialTags}
          options={tags.map((tag) => tag.tag)}
          title="Popular Tags"
          allowMultiple={true}
          key="tags"
        />
        <ParamsFilter
          keyName="price"
          initialValue={initialPrice}
          options={["free", "paid", "0-10", "10-50", "50-100"]}
          key="price"
        />
      </aside>
      <main className="space-y-10 max-w-7xl w-full @container/main">
        <CategoryBoxes initialCategory={category} />
        <section id="search">
          <div>
            <div className="relative w-full flex gap-2">
              <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5" />
              <SearchBar initialQuery={initialQuery} />
              <FiltersWrapper
                key="filters-mobile"
                content={
                  <div className="space-y-4">
                    <ParamsFilter
                      keyName="category"
                      initialValue={category}
                      options={CATEGORIES}
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
                    />
                  </div>
                }
              />
            </div>
          </div>
        </section>
        <section id="results" className="@container/results">
          <Suspense
            fallback={
              <div className="grid gap-4 px-3 grid-cols-1 @2xl/results:grid-cols-3 @sm/results:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={`skeleton_${i}`} />
                ))}
              </div>
            }
          >
            <ConditionalRender condition={products.length === 0}>
              <InfoArea
                title="No results found"
                description="Try a different search query or filter."
              />
            </ConditionalRender>
            <ConditionalRender condition={products.length > 0}>
              <div className="grid gap-4 px-3 grid-cols-1 @2xl/results:grid-cols-3 @sm/results:grid-cols-2">
                {products.map((product) => {
                  return (
                    <Link
                      key={product._id}
                      href={`/marketplace/products/${product.slug!}`}
                      className={cn(
                        "flex flex-col justify-between gap-2 rounded-xl p-3 transition-all duration-300 ease-in-out transform hover:scale-103 shadow-sm hover:shadow-xl hover:translate-y-1 hover:translate-x",
                        "group bg-glass"
                      )}
                    >
                      <Image
                        width={512}
                        height={320}
                        src={product.preview_url!}
                        alt={product.name!}
                        className="w-full h-auto aspect-video object-cover rounded-lg"
                      />
                      <div className="flex items-start justify-between flex-nowrap gap-3 mt-2">
                        <h3 className="text-base font-semibold">
                          {product.name}
                        </h3>
                        <ArrowUpRight
                          className={cn(
                            "w-6 h-6",
                            "duration-300 ease-in-out translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                          )}
                        />
                      </div>
                      <div className="flex items-start justify-between flex-nowrap gap-3">
                        {product.price ? (
                          <Badge variant="info_light">${product.price}</Badge>
                        ) : (
                          <Badge variant="default_light">Free</Badge>
                        )}
                        {product.categories!.length > 0 ? (
                          <Badge variant="secondary">
                            {product.categories![0]}
                          </Badge>
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </ConditionalRender>
          </Suspense>
        </section>
      </main>
    </div>
  );
}
