import AdUnit from "@/components/common/adsense";
import ShareButton from "@/components/common/share-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ConditionalRender from "@/components/utils/conditional-render";
import { ErrorBoundaryWithSuspense } from "@/components/utils/error-boundary";
import InfoArea from "@/components/utils/info-area";
import { ButtonLink } from "@/components/utils/link";
import {
  ArrowUpRight,
  CalendarDays,
  Download,
  Edit,
  Heart,
  LoaderCircle,
  Share2,
  ShieldCheck,
  Sparkles,
  Tag as TagIcon
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Session } from "src/auth";
import MarkdownView from "src/components/markdown/view";
import { decodeHTMLEntities, marketwiseLink } from "src/utils/string";
import { getSession } from "~/auth/server";
import { getProductBySlug, getSimilarProducts } from "./actions";
import MoreFromCreator from "./more-from-creator";
import { ProductCard } from "./product-card";

// Types
import MoreFromUs from "app/layouts/more-from-us";
import { ProductTypeWithCreator } from "src/models/product";
import { Product } from "./types";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);

  if (!product) return notFound();

  return {
    title: `${product.name} on Nexonauts`,
    description: product.description.substring(0, 160) + "...",
    openGraph: {
      type: "website",
      title: product.name,
      description: product.description.substring(0, 160) + "...",
      siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/marketplace/products/${product.slug}`,
      images: [{ url: product.preview_url, alt: product.name }],
    },
  };
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const session = (await getSession()) as Session | null;
  const isAuthenticated = !!session?.user;

  // Fetch Data
  const product = (await getProductBySlug(params.slug)) as ProductTypeWithCreator;

  if (!product) {
    return notFound();
  }

  const isCreator = isAuthenticated && session?.user.id.toString() === product.creator?._id?.toString();
  const similarProducts = (await getSimilarProducts(params.slug)) as Product[];

  return (
    <div className="min-h-screen bg-background selection:text-primary">

      {/* Subtle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
          <span>/</span>
          <span className="text-foreground">{decodeHTMLEntities(product.name)}</span>
        </nav>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* LEFT COLUMN: Product Visual + Description */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Hero Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 shadow-lg bg-muted">
              <Image
                src={product.preview_url}
                fill
                alt={decodeHTMLEntities(product.name)}
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              {product.categories?.[0] && (
                <div className="absolute top-4 left-4">
                  <Badge className="px-3 py-1.5 rounded-full backdrop-blur-md bg-background/80 border-border/50 shadow-lg">
                    {product.categories[0]}
                  </Badge>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                  {decodeHTMLEntities(product.name)}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <Link 
                    href={`/profiles/${product.creator?.username}`} 
                    className="flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors group"
                  >
                    <div className="w-6 h-6 rounded-full bg-linear-to-br from-primary to-violet-500" />
                    <span className="group-hover:underline decoration-primary/30 underline-offset-4">
                      @{product.creator?.username}
                    </span>
                  </Link>
                  
                  <span className="w-1 h-1 rounded-full bg-border" />
                  
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(product.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  About this Asset
                </h2>
                <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-img:rounded-lg prose-a:text-primary">
                  <MarkdownView>{product.description}</MarkdownView>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                  <TagIcon className="w-4 h-4" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.filter(t => t.trim() !== "").map((tag) => (
                    <Link
                      key={tag}
                      href={`/marketplace/explore?tags=${tag}`}
                      className="px-3 py-1.5 rounded-full border border-border/50 bg-card/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* TOP IN-CONTENT AD */}
            <div className="w-full min-h-[250px] rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-size-[20px_20px]" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-muted/70 backdrop-blur-sm">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                  Sponsored
                </span>
              </div>
              <div className="relative z-10 w-full flex items-center justify-center py-6">
                <AdUnit adSlot="in_feed" />
              </div>
            </div>

            {/* More From Creator */}
            <section className="pt-8 border-t border-border/40">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">More from {product.creator?.username}</h2>
                <ButtonLink href={`/profiles/${product.creator?.username}`} variant="ghost" size="sm">
                  View Profile
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </ButtonLink>
              </div>
              <MoreFromCreator slug={product.slug} />
            </section>

            {/* BOTTOM MULTIPLEX AD */}
            <div className="pt-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Recommended
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
          </div>

          {/* RIGHT COLUMN: Sticky Purchase Card + Similar Products */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Sticky Purchase Card */}
            <div className="sticky top-24 space-y-6">
              
              {/* Price & CTA Card */}
              <div className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg p-6 space-y-5">
                
                {/* Price */}
                <div className="flex items-baseline justify-between pb-4 border-b border-border/50">
                  <span className="text-sm font-medium text-muted-foreground">Price</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold">
                      {product.price ? `$${product.price}` : "Free"}
                    </span>
                    {(product.price > 0) && (
                      <p className="text-xs text-muted-foreground mt-1 ml-2">One-time payment</p>
                    )}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <ButtonLink
                    size="lg"
                    className="w-full h-12 text-base font-semibold shadow-md"
                    href={marketwiseLink(product.url,{
                      utm_source: process.env.NEXT_PUBLIC_UTM_SOURCE || "nexonauts.com",
                      utm_medium: "marketplace_product_page",
                      utm_campaign: product.price ? "product_purchase" : "product_download",
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="default"
                  >
                    {product.price ? "Buy Now" : "Download Free"}
                    {product.price ? <ArrowUpRight className="w-4 h-4 ml-2" /> : <Download className="w-4 h-4 ml-2" />}
                  </ButtonLink>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="flex-1">
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <ShareButton
                      data={{
                        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/marketplace/products/${product.slug}`,
                        title: product.name,
                        image: product.preview_url,
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </ShareButton>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-3 border-t border-border/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Secure & Instant Delivery
                </div>

                {/* Creator Edit Button */}
                {isAuthenticated && isCreator && (
                  <div className="pt-3 border-t border-border/50">
                    <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" size="sm" asChild>
                      <Link href={`/dashboard/products/${product.slug}/edit`} target="_blank">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Product
                      </Link>
                    </Button>
                  </div>
                )}
              </div>

              {/* SIDEBAR AD (300x250) */}
              <div className="w-full min-h-[280px] rounded-xl bg-card/40 backdrop-blur-sm border border-border/40 flex flex-col overflow-hidden">
                <div className="w-full py-2 bg-muted/50 border-b border-border/40 text-center">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                    Sponsored
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center p-4">
                  <AdUnit adSlot="display-square" />
                </div>
              </div>

              {/* Similar Products */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Similar Assets</h3>

                <ErrorBoundaryWithSuspense
                  loadingFallback={
                    <div className="flex justify-center py-10">
                      <LoaderCircle className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  }
                  fallback={
                    <InfoArea title="Failed to load" description="Could not load recommendations." />
                  }
                >
                  <ConditionalRender condition={similarProducts.length === 0}>
                    <p className="text-sm text-muted-foreground">No similar products available.</p>
                  </ConditionalRender>

                  <ConditionalRender condition={similarProducts.length > 0}>
                    <div className="space-y-4">
                      {similarProducts.slice(0, 3).map((product) => (
                        <ProductCard
                          key={product.slug}
                          product={product}
                          className="shadow-sm border-border/50 bg-card/50 hover:bg-card hover:shadow-md"
                        />
                      ))}
                    </div>
                  </ConditionalRender>
                </ErrorBoundaryWithSuspense>
              </div>

              {/* SECOND SIDEBAR AD */}
              <div className="w-full min-h-[280px] rounded-xl bg-card/40 backdrop-blur-sm border border-border/40 flex flex-col overflow-hidden">
                <div className="w-full py-2 bg-muted/50 border-b border-border/40 text-center">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                    Sponsored
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center p-4">
                  <AdUnit adSlot="display-square" />
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      <MoreFromUs omit={["marketplace"]} />
    </div>
  );
}