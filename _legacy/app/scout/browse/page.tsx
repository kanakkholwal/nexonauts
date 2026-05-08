import AdUnit from "@/components/common/adsense";
import { Badge } from "@/components/ui/badge";
import ConditionalRender from "@/components/utils/conditional-render";
import InfoArea from "@/components/utils/info-area";
import { cn } from "@/lib/utils";
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

import { HERO_SECTION, METADATA } from "data/scout/browse";
import { SearchParams } from "nuqs/server";
import { Fragment } from "react";
import { getImages } from "src/lib/scout";
import { FilterSidebar, MobileFilterSheet, SearchBar, ViewToggle, ViewWrapper } from "./client-components";
import { loadSearchParams } from "./searchParams";

export const metadata: Metadata = METADATA;

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const {
    query,
    page: currentPage,
    offset,
    view: viewType,
    category,
    pricing_type
  } = await loadSearchParams(searchParams)

  const filter = {
    pricing_type: (pricing_type as PublicToolPricingType) || "all",
    category: category || "all",
  };

  const { tools, categories, pricing_types } = await getTools(
    query,
    currentPage,
    filter,
    offset
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Subtle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      {/* Compact Header */}
      <div className="relative z-10 w-full border-b border-border/40 pt-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 border border-primary/20">
              <Sparkles className="w-3 h-3" />
              <span>Curated Tools</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {HERO_SECTION.title}
            </h1>
            <p className="text-base text-muted-foreground">
              {HERO_SECTION.description}
            </p>
          </div>
        </div>
      </div>

      {/* TOP LEADERBOARD AD */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 mt-8">
        <div className="w-full min-h-[100px] rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute top-2 left-4 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
            Sponsored
          </div>
          <div className="relative z-10">
            <AdUnit adSlot="display-horizontal" />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Streamlined Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 h-fit">
            
            {/* Filters Card */}
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-4">
              <FilterSidebar
                categories={categories}
                pricing_types={pricing_types}
                currentFilter={filter}
              />
            </div>

            {/* SIDEBAR AD (160x600 or 300x250) */}
            <div className="w-full min-h-[600px] rounded-xl bg-card/40 backdrop-blur-sm border border-border/40 flex flex-col overflow-hidden">
              <div className="w-full py-2 bg-muted/50 border-b border-border/40 text-center">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                  Sponsored
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center p-4">
                <AdUnit adSlot="display-vertical" />
              </div>
            </div>

          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-6">

            {/* Toolbar */}
            <div className="sticky top-20 z-30 rounded-xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-sm p-3">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <div className="w-full sm:flex-1">
                  <SearchBar initialQuery={query} />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <div className="lg:hidden">
                    <MobileFilterSheet
                      categories={categories}
                      pricing_types={pricing_types}
                      currentFilter={filter}
                    />
                  </div>
                  <div className="h-6 w-px bg-border/50 hidden sm:block" />
                  <ViewToggle />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="px-1 text-sm text-muted-foreground">
              {query ? (
                <span>
                  <span className="font-semibold text-foreground">{tools.length}</span> results for &quot;{query}&quot;
                </span>
              ) : (
                <span>
                  <span className="font-semibold text-foreground">{tools.length}</span> tools available
                </span>
              )}
            </div>

            {/* Results Grid */}
            <div id="results" className="min-h-[50vh]">
              <ConditionalRender condition={tools.length > 0}>
                <ViewWrapper>
                  {tools.map((tool, index) => (
                    <Fragment key={tool._id}>
                      <ToolCard tool={tool} viewType={viewType} />

                      {/* IN-FEED AD every 6 items */}
                      {(index + 1) % 6 === 0 && index !== tools.length - 1 && (
                        <div className={cn(
                          "w-full rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden relative",
                          viewType === "list" ? "col-span-full" : "",
                          viewType === "masonry" ? "break-inside-avoid mb-6" : ""
                        )}>
                          <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:20px_20px]" />
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-muted/70 backdrop-blur-sm z-10">
                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                              Featured
                            </span>
                          </div>
                          <div className="relative min-h-[250px] flex items-center justify-center py-6">
                            <AdUnit adSlot="in_feed" />
                          </div>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </ViewWrapper>
              </ConditionalRender>

              {/* BOTTOM MULTIPLEX AD */}
              <ConditionalRender condition={tools.length > 0}>
                <div className="mt-12 pt-8 border-t border-border/40">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Discover More
                    </span>
                    <div className="h-px flex-1 bg-border/50" />
                  </div>
                  <div className="min-h-[280px] w-full bg-card/40 backdrop-blur-sm rounded-xl border border-border/40 flex items-center justify-center p-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] bg-size-[16px_16px]" />
                    <div className="relative z-10">
                      <AdUnit adSlot="multiplex_horizontal" />
                    </div>
                  </div>
                </div>
              </ConditionalRender>

              {/* Empty State */}
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

// Tool Card Component
function ToolCard({ tool, viewType }: { tool: Partial<PublicToolTypeWithId>; viewType: string }) {
  const images = getImages(tool?.link || "");
  const isList = viewType === "list";

  return (
    <div className={cn(
      "h-full group",
      viewType === "masonry" && "mb-6 break-inside-avoid"
    )}>
      <Link
        href={`/scout/tools/${tool.slug}`}
        className={cn(
          "flex h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300",
          "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
          isList ? "flex-row items-stretch" : "flex-col"
        )}
      >
        {/* Image */}
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            isList 
              ? "w-40 md:w-56 shrink-0 border-r border-border/50" 
              : "aspect-video w-full border-b border-border/50"
          )}
        >
          <LazyImage
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={isList ? 300 : 500}
            height={isList ? 300 : 300}
            src={images?.bannerURL || tool.coverImage || "/placeholder.png"}
            alt={tool.name || "Tool"}
          />

          {/* Verified Badge */}
          {tool.verified && (
            <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-md rounded-full p-1.5 shadow-sm border border-border/50">
              <Verified className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {tool.name}
            </h3>
            <Badge 
              variant="secondary" 
              className={cn(
                "shrink-0 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5",
                tool.pricing_type === "free" 
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              {tool.pricing_type}
            </Badge>
          </div>

          {/* Categories */}
          <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
            {tool.categories?.slice(0, 3).map((category: any, idx: number) => (
              <span 
                key={idx} 
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground border border-transparent group-hover:border-border/50 transition-colors"
              >
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