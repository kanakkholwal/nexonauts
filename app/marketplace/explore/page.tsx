import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getPopularMeta, getProducts } from "./actions";
import { CategoryBoxes, FiltersCategory, FiltersPrice, FiltersTags, FiltersWrapper, SearchBar } from "./client";

interface ExplorePageProps {
  searchParams?: {
    query?: string;
    page?: string;
    perPage?: string;
    category?: string;
    tags?: string;
    price?: string;
  };
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const category = searchParams?.category || "";
  const initialTags = searchParams?.tags || "";
  const initialPrice = searchParams?.price || "";
  const initialQuery = searchParams?.query || "";

  const { tags } = await getPopularMeta();
  const products = await getProducts();

  return (
    <div className="flex items-start justify-center w-full gap-5 mx-auto p-3">
      <aside className="bg-card w-full max-w-sm rounded-xl p-4 hidden lg:flex flex-col sticky top-20 [&>div]:pl-4">
        <h4 className="text-lg font-semibold">Categories</h4>
        <FiltersCategory initialCategory={category} className="mt-4" />
        <h4 className="text-lg font-semibold mt-4">Popular Tags</h4>
        <FiltersTags defaultTags={tags} className="mt-4" initialTags={initialTags} />
        <h4 className="text-lg font-semibold mt-4">Price</h4>
        <FiltersPrice initialPrice={initialPrice} className="mt-4" />
      </aside>
      <main className="space-y-10 max-w-7xl w-full mx-auto @container/main">
        <CategoryBoxes initialCategory={category} />
        <section id="search">
          <div>
            <div className="relative w-full flex gap-2">
              <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5" />
              <SearchBar initialQuery={initialQuery} />
              <FiltersWrapper content={<div className="[&>div]:pl-4">
                <h4 className="text-lg font-semibold">Categories</h4>
                <FiltersCategory initialCategory={category} className="mt-4" />
                <h4 className="text-lg font-semibold mt-4">Popular Tags</h4>
                <FiltersTags defaultTags={tags} className="mt-4" initialTags={initialTags} />
                <h4 className="text-lg font-semibold mt-4">Price</h4>
                <FiltersPrice initialPrice={initialPrice} />
              </div>} />
            </div>
          </div>
        </section>
        <section id="results" className="@container/results">
          <div className="grid gap-4 px-3 grid-cols-1 @2xl/results:grid-cols-3 @sm/results:grid-cols-2">
            <Suspense fallback={<div>Loading...</div>}>
              {products.map((product) => {
                return (
                  <Link
                    key={product._id}
                    href={`/marketplace/products/${product.slug!}`}
                    className={cn(
                      "flex flex-col justify-between gap-2 rounded-xl p-3 transition-all duration-300 ease-in-out transform hover:scale-103 shadow-sm hover:shadow-xl hover:translate-y-1 hover:translate-x",
                      "group bg-card"
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
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}
