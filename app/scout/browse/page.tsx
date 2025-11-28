import { Badge } from "@/components/ui/badge";
import ConditionalRender from "@/components/utils/conditional-render";
import InfoArea from "@/components/utils/info-area";
import Navbar from "app/layouts/navbar-dynamic";
import { getTools } from "app/scout/lib/actions";
import {
  Hash,
  SearchX,
  Sparkles,
  Verified
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import LazyImage from "src/components/image";
import { PublicToolPricingType, PublicToolTypeWithId } from "src/models/tool";

import { cn } from "@/lib/utils";
import { HERO_SECTION, METADATA } from "data/scout/browse";
import { getImages } from "src/lib/scout";
import { FilterSidebar, MobileFilterSheet, SearchBar, ViewToggle } from "./client-components";

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
    <div className="min-h-screen flex flex-col pt-20 ">
      <Navbar />


      {/* --- Header Section --- */}
      <div className="relative z-10 w-full border-b border-border/40">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium mb-4 border border-primary/10">
              <Sparkles className="w-3 h-3" />
              <span>Curated Developer Ecosystem</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 lg:whitespace-nowrap">
              {HERO_SECTION.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {HERO_SECTION.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* --- Sidebar Filters (Desktop) --- */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-24">
            <FilterSidebar
              categories={categories}
              pricing_types={pricing_types}
              currentFilter={filter}
            />
          </aside>

          {/* --- Main Content --- */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-6">

            {/* Toolbar */}
            <div className="sticky top-20 flex flex-col sm:flex-row gap-4 justify-between items-center z-30 p-2 rounded-xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-sm">
              <div className="w-full sm:max-w-md ">
                <SearchBar initialQuery={query} />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <div className="lg:hidden">
                  <MobileFilterSheet
                    categories={categories}
                    pricing_types={pricing_types}
                    currentFilter={filter}
                  />
                </div>
                <div className="h-6 w-px bg-border/50 mx-2 hidden sm:block" />
                <ViewToggle currentView={viewType} />
              </div>
            </div>

            {/* Results Info */}
            <div className="px-1 text-sm text-muted-foreground">
              {query ? (
                <span>Found <span className="font-semibold text-foreground">{tools.length}</span> results for &quot;{query}&quot;</span>
              ) : (
                <span>Showing all {tools.length} tools</span>
              )}
            </div>

            {/* Grid */}
            <div id="results" className="min-h-[50vh]">
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
                <div className="py-20 flex justify-center">
                  <InfoArea
                    Icon={SearchX}
                    title="No tools found"
                    description="Try adjusting your filters or search query."
                    className="bg-muted/30 border-dashed"
                  />
                </div>
              </ConditionalRender>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// --- Tool Card Component ---
function ToolCard({ tool, viewType }: { tool: Partial<PublicToolTypeWithId>; viewType: string }) {
  const images = getImages(tool?.link || "");
  const isList = viewType === "list";

  return (
    <div className={cn("h-full group", viewType === "masonry" && "mb-6 break-inside-avoid")}>
      <Link
        href={`/scout/tools/${tool.slug}`}
        className={cn(
          "flex h-full rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-300",
          "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1",
          isList ? "flex-row items-stretch min-h-[180px]" : "flex-col"
        )}
      >
        {/* Image Area */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted border-b border-border/50",
            isList ? "w-48 md:w-64 shrink-0 border-b-0 border-r" : "aspect-[16/9] w-full"
          )}
        >
          <LazyImage
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={isList ? 300 : 500}
            height={isList ? 300 : 300}
            src={images?.bannerURL || tool.coverImage || "/placeholder.png"} // Add fallback
            alt={tool.name}
          />

          {/* Verified Badge Overlay */}
          {tool.verified && (
            <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-md rounded-full p-1 shadow-sm border border-border/50 text-emerald-500">
              <Verified className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 p-4 md:p-5">
          <div className="flex justify-between items-start gap-3 mb-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {tool.name}
            </h3>
            <Badge variant="secondary" className={cn("shrink-0 text-[10px] uppercase font-bold tracking-wider",
              tool.pricing_type === "free" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground"
            )}>
              {tool.pricing_type}
            </Badge>
          </div>

          {/* Optional Description if you have it in your Tool type */}
          {/* <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {tool.description}
            </p> */}

          <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
            {tool.categories?.slice(0, 3).map((category: any, idx: number) => (
              <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground border border-transparent group-hover:border-border transition-colors">
                <Hash className="w-3 h-3 opacity-50" />
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

function viewTypeToClassName(viewType: string) {
  switch (viewType) {
    case "list": return "grid grid-cols-1 lg:grid-cols-2 gap-4";
    case "masonry": return "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6";
    case "grid":
    default: return "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 5xl:grid-cols-4 gap-6";
  }
}