import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "app/layouts/navbar-dynamic";
import {
  getPublicToolBySlug,
  getRatingsAndReviews,
  getSimilarTools,
  getToolMetaBySlug,
  postRatingAndReview,
  toggleBookmark,
} from "app/scout/lib/actions";
import { getAverageRating } from "app/scout/lib/utils";
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Globe,
  Hash,
  MessageSquare,
  Share2,
  ShieldCheck,
  Star,
  Zap
} from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MarkdownView from "src/components/markdown/view";
import { getImages, marketwiseLink } from "src/lib/scout";
import { RatingTypeWithId } from "src/models/tool-rating";
import { formatNumber } from "src/utils/formaters";
import { getSession } from "~/auth/server";
import { PublicToolTypeWithId } from "~/models/tool";

// Components
import AdUnit from "@/components/common/adsense";
import ShareButton from "@/components/common/share-button";
import { BookMarkButton } from "./bookmark";
import { PostReview } from "./post-review";
import RatingComponent from "./rating";
import SimilarTools from "./similar-tools";

// --- TYPE DEFINITIONS ---
// Define local interfaces based on usage if strictly typed models aren't available globally
interface Category {
  name: string;
  slug: string;
}

type Tool = PublicToolTypeWithId & {
  categories: Category[];
}
type Props = {
  params: Promise<{ slug: string }>;
};

// --- METADATA GENERATION ---
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const tool = await getToolMetaBySlug(params.slug);

  if (!tool) return {};

  return {
    title: `${tool.name} - Review & Pricing`,
    description: tool.description.substring(0, 160),
    keywords:
      tool.tags?.join(", ") ||
      tool.categories.map((category: Category) => category.name).join(", "),
    openGraph: {
      images: [tool.coverImage, tool?.bannerImage || tool.coverImage],
      title: tool.name,
      description: tool.description.substring(0, 160),
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL || "https://nexonauts.com"}/scout/tools/${tool.slug}`,
    },
    category: tool.categories.map((category: Category) => category.name).join(", "),
  };
}

const cache = new Map<string, boolean>();

export default async function ToolPage(props: Props) {
  const params = await props.params;

  // 1. Fetch Tool Data
  const tool = (await getPublicToolBySlug(
    params.slug,
    cache.get(params.slug) || false
  )) as Tool | null;

  if (!tool) {
    return notFound();
  }

  cache.set(params.slug, true);

  // 2. Fetch Context Data
  const session = await getSession();
  const ratings = (await getRatingsAndReviews(tool._id)) as RatingTypeWithId[];
  const similarTools = await getSimilarTools(tool.categories);
  const { bannerURL } = getImages(tool.link);

  const averageRating = getAverageRating(ratings || []);
  const reviewCount = ratings.length;

  // 3. Server Action for Ratings
  async function publishRating(data: { rating: number; comment: string }) {
    "use server";
    try {
      if (!session || !session?.user) {
        throw new Error("You need to be logged in to rate a tool");
      }
      const rating = await postRatingAndReview({
        toolId: tool!._id,
        userId: session.user.id,
        rating: data.rating,
        comment: data.comment,
      });
      return rating;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return (
    <div className="min-h-screen flex flex-col pt-20 text-foreground relative selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Background Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />


      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-start">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-border/50 shadow-lg shrink-0 bg-muted">
            <Image
              src={tool.coverImage}
              alt={tool.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{tool.name}</h1>
              {tool.verified && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span className="font-semibold text-foreground">{averageRating}</span>
                <span>({reviewCount} reviews)</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1">
                <span className="font-medium text-foreground">{formatNumber(tool.views)}</span> views
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1 capitalize">
                <Badge variant="secondary" className="rounded-md px-2 font-normal text-muted-foreground bg-muted/50">
                  {tool.pricing_type}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* --- LEFT COLUMN (Content) --- */}
          <main className="lg:col-span-8 space-y-12">

            {/* Gallery / Banner */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-sm bg-muted">
              <Image
                fill
                src={bannerURL || tool.coverImage}
                alt={`${tool.name} screenshot`}
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 700px"
              />
            </div>

            {/* About Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/40">
                <Zap className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">About {tool.name}</h2>
              </div>
              <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-muted-foreground prose-headings:font-semibold">
                <MarkdownView>{tool.description}</MarkdownView>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {tool.categories.map((category, i) => (
                  <Link key={i} href={`/scout/browse?category=${category.slug}`} className="px-3 py-1 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center gap-1.5 bg-card">
                    <Hash className="w-3 h-3 opacity-50" />
                    {category.name}
                  </Link>
                ))}
              </div>
            </section>
            <AdUnit adSlot="display-horizontal" />

            {/* Reviews Section */}
            <section id="reviews" className="space-y-6 pt-8 border-t border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">Community Reviews</h2>
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <TabsList className="bg-muted/50 border border-border/50">
                    <TabsTrigger value="all">All Reviews ({ratings.length})</TabsTrigger>
                    <TabsTrigger value="write">Write a Review</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="space-y-6">
                  {ratings.length > 0 ? (
                    <div className="grid gap-6">
                      {ratings.map((rating) => (
                        <RatingComponent key={rating._id} rating={rating} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border/60">
                      <Star className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground">No reviews yet. Be the first to share your thoughts!</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="write">
                  {session?.user ? (
                    <PostReview tool={tool} postRatingAndReview={publishRating} />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 bg-muted/30 rounded-2xl border border-border/50">
                      <ShieldCheck className="w-10 h-10 text-muted-foreground/50 mb-4" />
                      <p className="mb-4 text-muted-foreground">Please sign in to leave a review.</p>
                      <Button asChild variant="outline">
                        <Link href={`/login?callbackUrl=/scout/tools/${tool.slug}`}>Sign In</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </section>

          </main>

          {/* --- RIGHT COLUMN (Sticky Sidebar) --- */}
          <aside className="lg:col-span-4 space-y-8">

            {/* Primary Action Card */}
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-xl shadow-primary/5">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-sm font-medium text-muted-foreground">Pricing</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold capitalize">{tool.pricing_type}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link href={marketwiseLink(tool.link)} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <BookMarkButton
                      tool={tool}
                      toggleBookmark={toggleBookmark}
                      userId={session?.user?.id || null}
                    // Ensure your Bookmark button accepts className/variant props to match this style
                    // className="w-full justify-center" 
                    />
                    <ShareButton
                      data={{
                        title: `Check out this tool on Nexonauts: ${tool.name}`,
                        url: `https://nexonauts.com/scout/tools/${tool.slug}`,
                      }}
                      variant="outline" className="w-full justify-center">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </ShareButton>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Tool Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Website
                      </span>
                      <p className="font-medium text-sm truncate">{new URL(tool.link).hostname}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" /> Views
                      </span>
                      <p className="font-medium text-sm">{formatNumber(tool.views)}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Added
                      </span>
                      <p className="font-medium text-sm">{new Date(tool?.createdAt || "").toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</p>
                    </div>
                  </div>
                </div>
              </div>
              <AdUnit adSlot="display-square" />
              {/* Similar Tools Widget */}
              <div className="p-6 rounded-2xl bg-muted/20 border border-border/50">
                <h3 className="font-bold mb-4">Alternatives</h3>
                <Suspense fallback={<div className="h-40 animate-pulse bg-muted rounded-xl" />}>
                  <SimilarTools tools={similarTools} toolName={tool.name} />
                </Suspense>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}