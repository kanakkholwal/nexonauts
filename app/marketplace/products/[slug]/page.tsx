import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ConditionalRender from "@/components/utils/conditional-render";
import { ErrorBoundaryWithSuspense } from "@/components/utils/error-boundary";
import InfoArea from "@/components/utils/info-area";
import { ButtonLink } from "@/components/utils/link";
import {
  ArrowUpRight,
  CalendarDays,
  Edit,
  Heart,
  LoaderCircle,
  Share2,
  ShieldCheck
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Session } from "src/auth"; // Adjust import path as needed
import MarkdownView from "src/components/markdown/view";
import { marketwiseLink } from "src/lib/scout";
import { decodeHTMLEntities } from "src/utils/string";
import { getSession } from "~/auth/server";
import { getProductBySlug, getSimilarProducts } from "./actions";
import MoreFromCreator from "./more-from-creator";
import { ProductCard } from "./product-card";

// Types
import ShareButton from "@/components/common/share-button";
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
    <div className="min-h-screen pt-20 relative selection:bg-primary/20 selection:text-primary">

      {/* --- Background Grain --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16">

        {/* --- HERO SECTION (Split) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20">

          {/* Left: Visual Asset */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border/50 shadow-2xl shadow-black/5 bg-muted">
              <Image
                src={product.preview_url}
                fill
                alt={decodeHTMLEntities(product.name)}
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          </div>

          {/* Right: Context & Actions */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {product.categories?.[0] && (
                  <Badge variant="default" className="px-3 py-1 rounded-full backdrop-blur-md bg-muted/50 border-border/50">
                    {product.categories[0]}
                  </Badge>
                )}
                <span className="flex items-center text-xs font-medium text-muted-foreground">
                  <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                  {new Date(product.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                {decodeHTMLEntities(product.name)}
              </h1>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Added by</span>
                <Link href={`/profile/${product.creator.username}`} className="flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors group">
                  {/* Avatar Placeholder */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-violet-500" />
                  <span className="group-hover:underline decoration-primary/30 underline-offset-4">{product.creator.name}</span>
                </Link>
              </div>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-muted-foreground">Price</span>
                <span className="text-3xl font-bold">
                  {product.price ? `$${product.price}` : "Free"}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <ButtonLink
                  size="lg"
                  className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20"
                  href={marketwiseLink(product.url, "/marketplace")}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="default" // Assuming 'default' maps to primary
                >
                  {product.price ? "Purchase License" : "Download Now"}
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </ButtonLink>

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <ShareButton
                    data={{
                      url: product.url,
                      title: product.name,
                      image: product.preview_url,
                    }}
                    variant="outline" size="icon" className="shrink-0">
                    <Share2 className="w-4 h-4" />
                  </ShareButton>
                </div>
              </div>

              {isAuthenticated && isCreator && (
                <div className="pt-4 border-t border-border/50">
                  <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" asChild>
                    <Link href={`/dashboard/products/${product.slug}/edit`} target="_blank">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Product
                    </Link>
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Secure Checkout & Instant Delivery
              </div>
            </div>
          </div>
        </div>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border/40 pt-16">

          {/* Main Content (Description) */}
          <main className="lg:col-span-8 space-y-12">
            <div className="bg-card rounded-2xl p-5 space-y-12">
              <section>

                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  About this Asset
                </h3>
                <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-img:rounded-xl">
                  <MarkdownView>
                    {product.description}
                  </MarkdownView>
                </div>
              </section>
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.filter(t => t.trim() !== "").map((tag) => (
                    <Link
                      key={tag}
                      href={`/marketplace/explore?tags=${tag}`}
                      className="px-3 py-1.5 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </section>
            </div>


            {/* More From Creator Section */}
            <section id="more-from-creator" className="pt-10 border-t border-border/40 bg-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold">More from {product.creator.name}</h2>
                <ButtonLink href={`/profile/${product.creator.username}`} variant="link">
                  View Profile
                </ButtonLink>
              </div>
              <MoreFromCreator slug={product.slug} />
            </section>
          </main>

          {/* Sticky Sidebar (Similar Products) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <h3 className="font-bold text-lg">You might also like</h3>

              <ErrorBoundaryWithSuspense
                loadingFallback={
                  <div className="flex justify-center py-10">
                    <LoaderCircle className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                }
                fallback={
                  <InfoArea title="Failed to load" description="Could not load recommendations." />
                }
              >
                <ConditionalRender condition={similarProducts.length === 0}>
                  <p className="text-sm text-muted-foreground">No similar products found.</p>
                </ConditionalRender>

                <ConditionalRender condition={similarProducts.length > 0}>
                  <div className="grid grid-cols-1 gap-6">
                    {similarProducts.map((product) => (
                      <ProductCard
                        key={product.slug}
                        product={product}
                        // Pass a variant prop if you want a horizontal card style for sidebar
                        className="shadow-none border-border/50 bg-transparent hover:bg-muted/30"
                      />
                    ))}
                  </div>
                </ConditionalRender>
              </ErrorBoundaryWithSuspense>
            </div>
          </aside>

        </div>
      </div>

      <MoreFromUs omit={["marketplace"]} />
    </div>
  );
}