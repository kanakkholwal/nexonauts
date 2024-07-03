import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
<<<<<<< HEAD
import ConditionalRender from "@/components/utils/conditional-render";
import InfoArea from "@/components/utils/info-area";
import Navbar from "app/layouts/navbar-dynamic";
import { getTools } from "app/scout/lib/actions";
import LazyImage from "components/image";
import { Hash, SearchX } from "lucide-react";
=======
import Navbar from "app/layouts/navbar";
import { FilterButton, SearchBar } from "app/scout/browse/search";
import { getTools } from "app/scout/lib/actions";
import LazyImage from "components/image";
import { Hash } from "lucide-react";
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
import { Metadata } from "next";
import Link from "next/link";
import { PublicToolPricingType } from "src/models/tool";

<<<<<<< HEAD
import { cn } from "@/lib/utils";
import { HERO_SECTION, METADATA } from "data/scout/browse";
import { FilterBar, SearchBar } from "./client-components";

export const metadata: Metadata = METADATA;
=======
export const metadata: Metadata = {
  title: "Browse Nexo Scout - AI Tools, Services, and Resources",
  description:
    "Nexo Scout is a curated list of AI tools, services, and resources. Find the best AI tools for your business.",
};
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0

// TODO: Pagination and infinite scroll
export default async function BrowsePage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    pricing_type?: string;
    category?: string;
    offset?: string;
<<<<<<< HEAD
    view?: "grid" | "list" | "masonry";
=======
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const offset = Number(searchParams?.offset) || 0;
<<<<<<< HEAD
  const viewType = searchParams?.view || "grid";
=======
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
  const filter = {
    pricing_type:
      (searchParams?.pricing_type as PublicToolPricingType) || "all",
    category: searchParams?.category || "all",
  };

<<<<<<< HEAD
  const { tools, categories, pricing_types } = await getTools(
=======
  const { tools, categories, totalPages, pricing_types } = await getTools(
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
    query,
    currentPage,
    filter,
    offset
  );

  return (
    <>
      <header>
        <Navbar />
<<<<<<< HEAD

        <div className="relative" id="hero">
          <div
            aria-hidden="true"
            className="fixed inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-1"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
          </div>
          <div className="relative flex flex-col justify-center gap-5 z-10 w-full h-full mx-auto max-w-7xl p-6 text-center pt-40">
            <h1 className="text-4xl 4xl:text-6xl font-bold text-foreground dark:bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text dark:text-transparent">
              {HERO_SECTION.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {HERO_SECTION.description}
            </p>
            <div className="p-3 mt-10 w-full mx-auto">
              <SearchBar />
              <div className="flex items-center justify-between w-full mt-4  z-10">
                <p className="text-muted-foreground">
                  {query ? (
                    <>
                      Search results for "
                      <span className="text-primary">{query}</span>" ($
                      {tools.length})
                    </>
                  ) : (
                    "Browse Tools"
                  )}
                </p>
                <FilterBar
                  categories={categories}
                  pricing_types={pricing_types}
                  filter={filter}
                  viewType={viewType}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main
        id="results"
        className="@container h-full w-full max-w-[1440px] mx-auto px-3 "
      >
        <hr className="my-4" />
        <ConditionalRender condition={tools.length > 0}>
          <div className={viewTypeToClassName(viewType)}>
            {tools.map((tool) => {
              return (
                <div key={tool._id}>
                  <Link href={`/scout/tools/${tool.slug}`} className="p-1">
                    <Card
                      className={cn(
                        "rounded-2xl relative group",
                        viewType === "list"
                          ? "flex flex-row gap-3 items-stretch"
                          : ""
                      )}
                    >
                      <CardHeader className="p-2">
                        <figure className="flex flex-col w-full aspect-video overflow-hidden bg-white/30 dark:bg-white/5 backdrop-blur-lg border border-slate-500/10 dark:border-border/70 rounded-lg h-32 sm:h-36">
                          <div className="relative flex items-center justify-center flex-shrink-0 h-full group w-auto m-auto overflow-hidden">
                            <LazyImage
                              className="w-auto h-auto m-auto transition ease-in-out duration-300 group-hover:scale-105"
                              width={350}
                              height={200}
                              src={tool.coverImage}
                              alt={tool.name}
                            />
                            <div className="absolute inset-0 transition duration-200 opacity-0 group-hover:opacity-60"></div>
                          </div>
                        </figure>
                      </CardHeader>
                      <CardContent
                        className={cn(
                          viewType === "list"
                            ? "p-2 flex flex-col items-start justify-center"
                            : ""
                        )}
                      >
                        <div
                          className="w-full text-xl font-semibold mb-2 inline-flex gap-2 justify-between items-center flex-wrap leading-normal"
                          title={tool.name}
                        >
                          {tool.name}
                          <Badge
                            variant="default_light"
                            size="sm"
                            className="ml-auto"
                          >
                            {tool.pricing_type}
                          </Badge>
                        </div>

                        <div className="inline-flex flex-wrap gap-2 w-full items-center justify-start mt-2">
                          {tool.categories?.map((category, index) => {
                            return (
                              <Badge
                                key={category.slug + "_" + index}
                                variant="success_light"
                                size="sm"
                                className="text-xs px-1 leading-4 gap-1"
                              >
                                <Hash className="inline-block w-3 h-3" />
                                {category.name}
                              </Badge>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </ConditionalRender>
        <ConditionalRender condition={tools.length === 0}>
          <InfoArea
            Icon={SearchX}
            title="No tools found"
            description="We couldn't find any tools matching your search criteria."
          />
        </ConditionalRender>
      </main>
    </>
  );
}

function viewTypeToClassName(viewType: "grid" | "list" | "masonry") {
  switch (viewType) {
    case "grid":
      return "grid gap-4 grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4";
    case "list":
      return "grid gap-4 grid-cols-1 @4xl:grid-cols-2";
    case "masonry":
    default:
      return "gap-4 columns-1 @xl:columns-2 @4xl:columns-3 @7xl:columns-4";
  }
=======
      </header>
      <div className="relative" id="home">
        <div
          aria-hidden="true"
          className="fixed inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-1"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>
      </div>
      <div className="flex items-start justify-start gap-4 h-full w-full max-w-[1440px] mx-auto pt-32">
        <main id="content" className="grow w-full">
          <TracingBeam>
            <div className="p-3">
              <SearchBar />
              <div className="flex items-center justify-between w-full mt-4  z-10">
                <h1 className="font-semibold text-foreground">
                  {query ? `Search results for "${query}"` : "Browse Tools"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {query
                    ? `Found ${tools.length} tools`
                    : `Showing ${tools.length} of ${totalPages} pages`}
                </p>
              </div>
            </div>

            <div id="results" className="@container">
              <hr className="my-4" />
              <div className="mx-auto w-full grow grid gap-4 grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3">
                {tools.map((tool) => {
                  return (
                    <div key={tool._id}>
                      <Link href={`/scout/tools/${tool.slug}`} className="p-1">
                        <Card
                          className="rounded-2xl backdrop-blur backdrop-saturate bg-opacity-75 bg-white-300 border-0 relative"
                          variant="glass"
                        >
                          <CardHeader className="p-2">
                            <div className="flex flex-col w-full aspect-video overflow-hidden bg-white/30 dark:bg-white/5 backdrop-blur-lg border border-slate-500/10 dark:border-border/70 rounded-lg h-32 sm:h-36">
                              <div className="relative flex items-center justify-center flex-shrink-0 h-full group w-auto m-auto overflow-hidden">
                                <LazyImage
                                  className="w-auto h-auto m-auto transition ease-in-out duration-300 group-hover:scale-105"
                                  width={350}
                                  height={200}
                                  src={tool.coverImage}
                                  alt={tool.name}
                                />
                                <div className="absolute inset-0 transition duration-200 opacity-0 group-hover:opacity-60"></div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div
                              className="w-full text-xl font-semibold mb-2 inline-flex gap-2 justify-between items-center flex-wrap"
                              title={tool.name}
                            >
                              {tool.name}
                              <Badge
                                variant="default_light"
                                size="sm"
                                className="ml-auto"
                              >
                                {tool.pricing_type}
                              </Badge>
                            </div>

                            <div className="inline-flex flex-wrap gap-2 w-full items-center justify-start mt-2">
                              {tool.categories?.map((category, index) => {
                                return (
                                  <Badge
                                    key={category.slug + "_" + index}
                                    variant="success_light"
                                    size="sm"
                                    className="text-xs px-1 leading-4 gap-1"
                                  >
                                    <Hash className="inline-block w-3 h-3" />
                                    {category.name}
                                  </Badge>
                                );
                              })}
                            </div>
                          </CardContent>
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-10"
                          >
                            <div className="blur-[106px] h-56 bg-gradient-to-tl from-primary to-purple-400 dark:from-blue-700" />
                            <div className="blur-[106px] h-32 bg-gradient-to-l from-cyan-400 to-sky-300 dark:to-indigo-600" />
                          </div>
                        </Card>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </TracingBeam>
        </main>
        <aside
          id="filter"
          className="max-w-96 grow w-auto sticky top-24 px-4 hidden md:block"
        >
          <div className="w-full flex flex-col space-y-2 text-center sm:text-left mb-5">
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Filter Tools
            </h4>
            <p className="text-sm text-muted-foreground">
              Filter Tools by category, pricing, and more.
            </p>
            <div className="mb-4">
              <p className="text-base font-semibold text-muted-foreground mb-4">
                By Categories
              </p>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  active={filter.category === "all"}
                  filterKey="category"
                  filterValue="all"
                >
                  All
                </FilterButton>
                {categories.map((category) => (
                  <FilterButton
                    key={category.slug}
                    // className="cursor-pointer"
                    filterKey="category"
                    filterValue={category.slug}
                    active={filter.category === category.slug}
                  >
                    {category.name.split("_").join(" ")}
                  </FilterButton>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-base font-semibold text-slate-600 mb-4">
              By Pricing
            </p>
            <div className="flex flex-wrap gap-2">
              {pricing_types.map((pricing_type) => (
                <FilterButton
                  key={pricing_type}
                  size="sm"
                  className="cursor-pointer"
                  filterKey="pricing_type"
                  filterValue={pricing_type}
                  active={filter?.pricing_type === pricing_type}
                >
                  {pricing_type.split("_").join(" ")}
                </FilterButton>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
}
