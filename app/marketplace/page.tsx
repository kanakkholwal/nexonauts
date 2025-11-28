import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/utils/link";
import { cn } from "@/lib/utils";
import { getCategoryByLabel } from "data/marketplace";
import { ArrowRight, Search, Sparkles, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProductsByCategory } from "./actions";

export default async function MarketplacePage() {
  const results = await getProductsByCategory();

  return (
    <main className="relative min-h-screen bg-background selection:bg-primary/10 selection:text-primary">

      {/* --- Background Texture --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
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
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500" />
            <div className="relative flex items-center bg-background/80 backdrop-blur-xl border border-border/50 rounded-full sm:px-4 h-10 sm:h-14 shadow-lg">
              <Search className="hidden sm:inline-block size-4 text-muted-foreground ml-2 sm:size-5" />
              <input
                type="text"
                placeholder="Search for templates, icons, or UI kits..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-foreground placeholder:text-muted-foreground/70 outline-none h-full"
              />
              <Button size="sm" rounded="full" className="has-[>svg]:pl-2 h-8 w-8 px-2 sm:px-2 sm:h-10 sm:w-auto mr-2">
                <Search className="size-4 inline-block sm:hidden" />
                <span className="hidden sm:inline-block">Search</span>
              </Button>
            </div>
          </div>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Popular:</span>
            {["SaaS Templates", "Dashboards", "Icon Sets", "Figma Kits"].map((tag) => (
              <Link key={tag} href={`/marketplace/explore?q=${tag}`} className="hover:text-primary hover:underline underline-offset-4 transition-colors">
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* --- Categories Loop --- */}
        <div className="space-y-20 pb-20">
          {results.map((result) => (
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
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 5xl:grid-cols-4 gap-6">
                {result.products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

            </section>
          ))}
        </div>

      </div>
    </main>
  );
}

// --- Sub-Component: Product Card ---
function ProductCard({ product }: { product: any }) {
  return (
    <Link
      href={`/marketplace/products/${product.slug!}`}
      className="group relative flex flex-col h-full bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          width={512}
          height={384}
          src={product.preview_url!}
          alt={product.name!}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge Positioned on Image */}
        <div className="absolute top-3 right-3">
          <div className={cn(
            "backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border shadow-sm",
            product.price
              ? "bg-white/90 text-black border-white/20 dark:bg-black/60 dark:text-white"
              : "bg-emerald-500/90 text-white border-emerald-400/20"
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