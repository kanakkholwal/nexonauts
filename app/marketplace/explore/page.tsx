import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "data/marketplace";
import { itemTypes } from "data/marketplace/constants";
import { ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getProducts } from "./actions";

interface ExplorePageProps {
  searchParams?: {
    query?: string;
    page?: string;
    perPage?: string;
    category?: string;
  };
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const category = searchParams?.category || "";
  const products = await getProducts();

  return (
    <div className="flex items-start justify-center w-full gap-10 mx-auto p-3">
      <aside className="bg-card w-full max-w-sm rounded-xl p-4">
        <h4 className="text-lg font-semibold">Categories</h4>
        <RadioGroup defaultValue={category} className="flex flex-col gap-2 mt-4">
          {CATEGORIES.map((category, i) => {
            return (
              <div key={i} className="items-top flex space-x-2">
                <RadioGroupItem id={category} value={category} />
                <Label htmlFor={category} className="mb-0">{category}</Label>
              </div>
            );
          })}
        </RadioGroup>
      </aside>
      <main className="space-y-10 max-w-7xl w-full mx-auto @container/main">
        <section id="category-labels" className="w-full mx-auto grid justify-items-center items-stretch px-3 gap-4 grid-cols-1 @4xl/main:grid-cols-4 @2xl/main:grid-cols-3 @sm/main:grid-cols-2">
          {itemTypes.map((item, i) => {
            return (
              <Link
                key={i}
                href={`/marketplace/explore?category=${item.label}`}
                className={cn(
                  "flex items-center justify-center gap-3 p-3 rounded-xl transition-all duration-200 shadow-md border w-full aspect-[10/4]",
                  " bg-card shadow-slate-200 dark:shadow-slate-800/20",
                  category === item.label
                    ? "border-primary"
                    : "border-transparent"
                )}
                shallow
              >
                <div>
                  <item.icon className="w-12 h-12  text-violet-600" />
                </div>
                <div>
                  <h6 className="text-lg font-semibold">{item.label}</h6>
                  <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
                    Trending in {item.label}
                  </p>
                </div>
              </Link>
            );
          })}
        </section>
        <section id="search">
          <div>
            <div className="relative w-full">
              <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5" />
              <Input
                type="text"
                name="query"
                id="query"
                variant="fluid"
                placeholder="Search for products"
                className="w-full pl-12 pr-4 py-2 h-14 rounded-xl bg-slate-50 dark:bg-slate-800/20 shadow border border-border"
              />
            </div>
          </div>
        </section>
        <section id="results" className="@container/results">
          <div className="grid gap-4 grid-cols-1 @2xl/results:grid-cols-3 @sm/results:grid-cols-2">
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
