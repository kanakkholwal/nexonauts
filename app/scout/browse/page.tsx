import { Badge } from "@/components/ui/badge";
import ConditionalRender from "@/components/utils/conditional-render";
import InfoArea from "@/components/utils/info-area";
import Navbar from "app/layouts/navbar-dynamic";
import { getTools } from "app/scout/lib/actions";
import { Hash, SearchX, Verified } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import LazyImage from "src/components/image";
import { PublicToolPricingType, PublicToolTypeWithId } from "src/models/tool";

import { cn } from "@/lib/utils";
import { HERO_SECTION, METADATA } from "data/scout/browse";
import { getImages } from "src/lib/scout";
import { FilterBar, SearchBar } from "./client-components";

export const metadata: Metadata = METADATA;

export default async function BrowsePage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    pricing_type?: string;
    category?: string;
    offset?: string;
    view?: "grid" | "list" | "masonry";
  }>;
}) {
  const searchParams = await props.searchParams || {};
  const query = searchParams.query || "";
  const currentPage = Number(searchParams.page) || 1;
  const offset = Number(searchParams.offset) || 0;
  const viewType = searchParams.view || "grid";
  const filter = {
    pricing_type: (searchParams.pricing_type as PublicToolPricingType) || "all",
    category: searchParams.category || "all",
  };

  const { tools, categories, pricing_types } = await getTools(
    query,
    currentPage,
    filter,
    offset
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />

        <div className="relative isolate overflow-hidden" id="hero">
          {/* <div
            aria-hidden="true"
            className="fixed inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-10 pointer-events-none"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
          </div> */}

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-24 lg:py-28">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 from-10% via-sky-400 via-30% to-emerald-300 to-90% bg-clip-text text-transparent">
                {HERO_SECTION.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
                {HERO_SECTION.description}
              </p>

              <div className="w-full max-w-3xl mt-8">
                <SearchBar />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-4 gap-3">
                  <p className="text-muted-foreground font-medium text-sm">
                    {query ? (
                      <>
                        Search results for "
                        <span className="text-primary font-semibold">{query}</span>"
                        <span className="ml-1.5">({tools.length})</span>
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
        </div>
      </header>

      <main
        id="results"
        className="flex-1 w-full max-w-(--max-app-width) mx-auto px-4 sm:px-6 py-6"
      >
        <ConditionalRender condition={tools.length > 0}>
          <div className={viewTypeToClassName(viewType)}>
            {tools.map((tool) => (
              <ToolCard
                key={tool._id}
                tool={tool}
                viewType={viewType}
              />
            ))}
          </div>
        </ConditionalRender>

        <ConditionalRender condition={tools.length === 0}>
          <div className="py-12 flex justify-center">
            <InfoArea
              Icon={SearchX}
              title="No tools found"
              description="We couldn't find any tools matching your search criteria."
            />
          </div>
        </ConditionalRender>
      </main>
    </div>
  );
}

function ToolCard({ tool, viewType }: { tool: Partial<PublicToolTypeWithId>; viewType: string }) {
  const images = getImages(tool?.link || "")
  return (
    <div
      className={cn(
        "h-full",
        viewType === "masonry" && "mb-4 break-inside-avoid"
      )}
    >
      <Link
        href={`/scout/tools/${tool.slug}`}
        className={cn(
          "block h-full rounded-xl border border-border/50 bg-card overflow-hidden",
          "transition-all duration-200 hover:shadow-md hover:border-primary/40",
          viewType === "list" && "flex flex-col sm:flex-row"
        )}
      >
        <div

          className={cn(
            "relative overflow-hidden bg-muted/20",
            viewType === "list"
              ? "sm:w-40 md:w-48 flex-shrink-0 aspect-square"
              : "aspect-video"
          )}
        >
          <LazyImage
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            width={viewType === "list" ? 350 : 500}
            height={viewType === "list" ? 350 : 350}
            src={images?.bannerURL || tool.coverImage}
            alt={tool.name}
          />
        </div>

        <div
          className={cn(
            "p-4 flex flex-col h-full border-t border-border/25",
            viewType === "list" && "flex-1"
          )}
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base md:text-lg truncate flex items-center gap-1.5">
                {tool.name}
                {tool.verified && (
                  <Verified className="inline-block text-emerald-500 w-4 h-4 flex-shrink-0" />
                )}
              </h3>
            </div>

            <Badge
              variant="default_light"
              size="sm"
              className="capitalize flex-shrink-0"
            >
              {tool.pricing_type}
            </Badge>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {tool.categories?.map((category: any, idx: number) => (
              <Badge
                key={idx}
                variant="default"
                size="sm"
                className="font-normal"
              >
                <Hash className="size-3" />
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

function viewTypeToClassName(viewType: "grid" | "list" | "masonry") {
  switch (viewType) {
    case "grid":
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5";
    case "list":
      return "grid grid-cols-1 sm:grid-cols-2 gap-5";
    case "masonry":
      return "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5";
    default:
      return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5";
  }
}