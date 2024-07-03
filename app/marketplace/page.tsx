import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCategoryByLabel } from "data/marketplace";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "./actions";

export default async function Page() {
  const results = await getProductsByCategory();

  return (
    <>
      <div className="min-h-96 mx-auto flex flex-col items-center space-y-5 mt-20 mb-32">
        <h1 className="text-[clamp(2.75rem,4.25vw,4.5rem)] max-w-[25ch] text-center font-bold text-gray-800 dark:bg-gradient-to-l  dark:from-indigo-400  dark:from-10%  dark:via-sky-400  dark:via-30%  dark:to-emerald-300  dark:to-90%  dark:bg-clip-text  dark:text-transparent leading-none">
          Marketplace
          <span className="text-gray-600 dark:text-gray-400 ml-3">
            for frontend developers and web designers.
          </span>
        </h1>
        <p className="text-base mx-auto text-center xl:text-lg 2xl:text-xl pt-5 max-w-[50ch] font-medium leading-6 text-gray-700 dark:text-gray-500">
          Dive into a world of beautifully crafted themes, templates, and assets
          curated for your next project.
        </p>
      </div>
      <div className="w-full mx-auto max-w-7xl space-y-5">
        {results.map((result) => {
          return (
            <section id={result.category} key={result.category}>
              <div className="p-3 flex justify-between items-center w-full flex-wrap gap-4">
                <div>
                  <h2 className="text-3xl 3xl:text-5xl font-bold text-left">
                    {result.category}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    {getCategoryByLabel(result.category)?.description}
                  </p>
                </div>
                <Button variant="dark" asChild>
                  <Link
                    href={`/marketplace/explore?category=${result.category}`}
                  >
                    Show All <ArrowRight />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-4 px-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {result.products.map((product) => {
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
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
