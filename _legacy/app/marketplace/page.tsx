import AdUnit from "@/components/common/adsense";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/utils/link";
import { cn } from "@/lib/utils";
import { getCategoryByLabel } from "data/marketplace";
import { ArrowRight, Search, Sparkles, Tag, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "src/models/product";
import { getProductsByCategory } from "./actions";

export default async function MarketplacePage() {
  const results = await getProductsByCategory();

  return (
    <main className="relative min-h-screen bg-background selection:text-primary">

      {/* --- Background Texture --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-full max-w-[1000px] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-7xl px-6 md:px-8">

        {/* --- Hero Section --- */}
        <div className="py-24 md:py-32 flex flex-col items-center text-center space-y-8">

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl animate-fade-in">
            <Sparkles className="w-3 h-3" />
            <span>New Assets Added Weekly</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl">
            The Marketplace for <br />
            <span className="text-transparent bg-clip-text bg-linear-to-l from-indigo-400 from-10% via-sky-400 via-30% to-emerald-300 to-90%">
              Frontend Craft.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Dive into a world of beautifully crafted themes, templates, and UI kits curated for your next big project.
          </p>

          {/* Search Bar Simulation */}
          <div className="w-full max-w-lg relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-violet-500/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex items-center bg-background/80 backdrop-blur-xl border border-border/50 rounded-full sm:px-4 h-10 sm:h-14 shadow-lg">
              <Search className="hidden sm:inline-block size-4 text-muted-foreground ml-2 sm:size-5" />
              <input
                type="text"
                placeholder="Search for templates, icons, or UI kits..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-foreground placeholder:text-muted-foreground/70 outline-none h-full"
              />
              <Button size="sm" rounded="full" className="has-[>svg]:pl-2 h-8 w-8 sm:h-10 sm:w-auto">
                <Search className="size-4 inline-block sm:hidden" />
                <span className="hidden sm:inline-block">Search</span>
              </Button>
            </div>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Popular:</span>
            {["Templates", "Design", "Themes", "UI Kits"].map((tag) => (
              <Link key={tag} href={`/marketplace/explore?q=${tag}`} className="hover:text-primary hover:underline underline-offset-4 transition-colors">
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* --- TOP LEADERBOARD AD --- */}
        <div className="mb-16">
          <div className="w-full min-h-[100px] rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm flex items-center justify-center overflow-hidden relative shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-2 left-4 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Sponsored
            </div>
            <div className="relative z-10">
              <AdUnit adSlot="display-horizontal" />
            </div>
          </div>
        </div>

        {/* --- Main Content Grid with Sidebar --- */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 pb-20">
          
          {/* --- LEFT COLUMN: Categories & Products --- */}
          <div className="xl:col-span-9 space-y-20">
            {results.map((result, index) => (
              <section id={result.category} key={result.category} className="scroll-mt-24">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-border/40 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">{result.category}</h2>
                    <p className="text-muted-foreground text-base max-w-lg">
                      {getCategoryByLabel(result.category)?.description || `Explore our collection of ${result.category}`}
                    </p>
                  </div>
                  <ButtonLink
                    variant="ghost"
                    href={`/marketplace/explore?category=${result.category}`}
                    className="group shrink-0 text-primary hover:bg-primary/5"
                  >
                    View Collection
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </ButtonLink>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 5xl:grid-cols-3 gap-6">
                  {result.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* IN-FEED AD after every 2 categories */}
                {(index + 1) % 2 === 0 && index !== results.length - 1 && (
                  <div className="mt-12 mb-4">
                    <div className="w-full min-h-[250px] rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden relative shadow-lg">
                      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:20px_20px]" />
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-muted/80 backdrop-blur-sm">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                          Featured Content
                        </span>
                      </div>
                      <div className="relative z-10 w-full flex items-center justify-center py-8">
                        <AdUnit adSlot="in_feed" />
                      </div>
                    </div>
                  </div>
                )}

              </section>
            ))}

            {/* --- BOTTOM MULTIPLEX AD --- */}
            <div className="mt-16">
              <div className="flex items-center gap-4 mb-6">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Recommended for You
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="min-h-[280px] w-full bg-card/40 backdrop-blur-sm rounded-2xl border border-border/60 shadow-lg flex items-center justify-center p-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10">
                  <AdUnit adSlot="multiplex_horizontal" />
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Sticky Sidebar (Desktop Only) --- */}
          <aside className="hidden xl:flex xl:col-span-3 flex-col gap-6 sticky top-24 h-fit">
            
            {/* VERTICAL SKYSCRAPER AD */}
            <div className="w-full min-h-[600px] rounded-2xl bg-card/40 backdrop-blur-sm border border-border/60 shadow-lg flex flex-col items-center justify-start overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="w-full py-2 bg-muted/60 backdrop-blur-sm border-b border-border/40 text-center relative z-10">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                  Sponsored
                </span>
              </div>
              <div className="flex-1 w-full flex items-center justify-center p-4 relative z-10">
                <AdUnit adSlot="display-vertical" />
              </div>
            </div>

            {/* ADDITIONAL PROMO CARD */}
            <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-card p-6 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#6366f120,transparent_70%)]" />
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>Premium</span>
                </div>
                <h3 className="text-lg font-bold">Become a Seller</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Share your creative work with thousands of developers and designers worldwide.
                </p>
                <Button size="sm" className="w-full mt-2">
                  Start Selling
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* SECOND STICKY AD (300x250) */}
            <div className="w-full min-h-[280px] rounded-2xl bg-card/40 backdrop-blur-sm border border-border/60 shadow-lg flex flex-col items-center justify-start overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="w-full py-2 bg-muted/60 backdrop-blur-sm border-b border-border/40 text-center relative z-10">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                  Sponsored
                </span>
              </div>
              <div className="flex-1 w-full flex items-center justify-center p-4 relative z-10">
                <AdUnit adSlot="display-square" />
              </div>
            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}

// --- Sub-Component: Product Card ---
function ProductCard({ product }: { product: Partial<ProductType> }) {
  return (
    <Link
      href={`/marketplace/products/${product.slug!}`}
      className="group relative flex flex-col h-full bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-16/9 overflow-hidden bg-muted">
        <Image
          width={512}
          height={384}
          src={product.preview_url!}
          alt={product.name!}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Gradient on Hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge Positioned on Image */}
        <div className="absolute top-3 right-3">
          <div className={cn(
            "backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border shadow-sm",
            product.price
              ? "bg-white/90 text-black border-white/20 dark:bg-black/60 dark:text-white"
              : "bg-primary/20 text-primary border-primary/20"
          )}>
            {product.price ? `$${product.price}` : "Free"}
          </div>
        </div>
      </div>

      {/* Content Info */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
          {product.description || "High-quality asset for your next project."}
        </p>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500/50" />
            <span>Instant Download</span>
          </div>
          <span className="group-hover:translate-x-1 transition-transform text-primary font-medium flex items-center">
            Details <ArrowRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}