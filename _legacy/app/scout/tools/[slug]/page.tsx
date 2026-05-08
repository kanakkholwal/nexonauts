import AdUnit from "@/components/common/adsense";
import ShareButton from "@/components/common/share-button";
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
  Eye,
  Globe,
  Hash,
  MessageSquare,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Zap
} from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MarkdownView from "src/components/markdown/view";
import { getImages } from "src/lib/scout";
import { RatingTypeWithId } from "src/models/tool-rating";
import { formatNumber } from "src/utils/formaters";
import { getSession } from "~/auth/server";
import { PublicToolTypeWithId } from "~/models/tool";

// Components
import { marketwiseLink } from "src/utils/string";
import { BookMarkButton } from "./bookmark";
import { PostReview } from "./post-review";
import RatingComponent from "./rating";
import SimilarTools from "./similar-tools";

// Type Definitions
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

// Metadata Generation
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

  // Fetch Tool Data
  const tool = (await getPublicToolBySlug(
    params.slug,
    cache.get(params.slug) || false
  )) as Tool | null;

  if (!tool) {
    return notFound();
  }

  cache.set(params.slug, true);

  // Fetch Context Data
  const session = await getSession();
  const ratings = (await getRatingsAndReviews(tool._id)) as RatingTypeWithId[];
  const similarTools = await getSimilarTools(tool.categories);
  const { bannerURL } = getImages(tool.link);

  const averageRating = getAverageRating(ratings || []);
  const reviewCount = ratings.length;

  // Server Action for Ratings
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Subtle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/scout/browse" className="hover:text-foreground transition-colors">Browse</Link>
          <span>/</span>
          <span className="text-foreground">{tool.name}</span>
        </nav>

        {/* Compact Header */}
        <div className="flex flex-col md:flex-row gap-5 mb-8 items-start">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border border-border/50 shadow-md shrink-0 bg-muted">
            <Image
              src={tool.coverImage}
              alt={tool.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{tool.name}</h1>
              {tool.verified && (
                <Badge className="px-2 py-1 rounded-md bg-emerald-500/10 border-emerald-500/20 text-emerald-600 text-xs font-semibold">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-semibold text-foreground">{averageRating}</span>
                <span>({reviewCount})</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                <span className="font-medium text-foreground">{formatNumber(tool.views)}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-border" />
              <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-xs capitalize bg-muted/50">
                {tool.pricing_type}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: Content */}
          <main className="lg:col-span-8 space-y-10">

            {/* Hero Image */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/50 shadow-lg bg-muted">
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
              <div className="flex items-center gap-2 pb-3 border-b border-border/40">
                <Zap className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">About</h2>
              </div>
              <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none prose-p:text-muted-foreground prose-headings:font-semibold prose-a:text-primary">
                <MarkdownView>{tool.description}</MarkdownView>
              </div>

              {/* Categories */}
              {tool.categories.length > 0 && (
                <div className="pt-4">
                  <div className="flex flex-wrap gap-2">
                    {tool.categories.map((category, i) => (
                      <Link
                        key={i}
                        href={`/scout/browse?category=${category.slug}`}
                        className="px-3 py-1.5 rounded-full border border-border/50 bg-card/50 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center gap-1.5"
                      >
                        <Hash className="w-3 h-3 opacity-50" />
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>

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

            {/* Reviews Section */}
            <section id="reviews" className="pt-8 border-t border-border/40">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Reviews</h2>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-muted/50 border border-border/50 mb-6">
                  <TabsTrigger value="all">All ({ratings.length})</TabsTrigger>
                  <TabsTrigger value="write">Write Review</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-5">
                  {ratings.length > 0 ? (
                    <div className="space-y-5">
                      {ratings.map((rating) => (
                        <RatingComponent key={rating._id} rating={rating} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed border-border/50">
                      <Star className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">No reviews yet. Be the first!</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="write">
                  {session?.user ? (
                    <PostReview tool={tool} postRatingAndReview={publishRating} />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 bg-muted/20 rounded-xl border border-border/50">
                      <ShieldCheck className="w-10 h-10 text-muted-foreground/40 mb-4" />
                      <p className="mb-4 text-sm text-muted-foreground">Sign in to leave a review</p>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/auth/sign-in?callbackUrl=/scout/tools/${tool.slug}`}>Sign In</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </section>

            {/* BOTTOM MULTIPLEX AD */}
            <div className="pt-8">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Related Tools
                </span>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <div className="min-h-[280px] w-full bg-card/40 backdrop-blur-sm rounded-xl border border-border/40 flex items-center justify-center p-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10">
                  <AdUnit adSlot="multiplex_horizontal" />
                </div>
              </div>
            </div>

          </main>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">

              {/* CTA Card */}
              <div className="rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-lg p-5 space-y-4">

                <div className="flex justify-between items-baseline pb-4 border-b border-border/50">
                  <span className="text-sm font-medium text-muted-foreground">Pricing</span>
                  <span className="text-2xl font-bold capitalize">{tool.pricing_type}</span>
                </div>

                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-11 text-base font-semibold shadow-md"
                  >
                    <Link href={marketwiseLink(tool.link,{
                      utm_medium: "referral",
                      utm_campaign: "tool_cta_button",
                      
                    })} target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ArrowUpRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <BookMarkButton
                      tool={tool}
                      toggleBookmark={toggleBookmark}
                      userId={session?.user?.id || null}
                    />
                    <ShareButton
                      data={{
                        title: `Check out ${tool.name} on Nexonauts`,
                        url: `https://nexonauts.com/scout/tools/${tool.slug}`,
                      }}
                      variant="outline"
                      className="w-full justify-center"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </ShareButton>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Stats */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" /> Website
                      </span>
                      <span className="font-medium truncate max-w-[150px]" title={tool.link}>
                        {new URL(tool.link).hostname}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <BarChart3 className="w-3.5 h-3.5" /> Views
                      </span>
                      <span className="font-medium">{formatNumber(tool.views)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" /> Added
                      </span>
                      <span className="font-medium text-xs">
                        {new Date(tool?.createdAt || "").toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
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

              {/* Similar Tools */}
              <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-5">
                <h3 className="font-semibold mb-4 text-base">Similar Tools</h3>
                <Suspense fallback={
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 animate-pulse bg-muted/50 rounded-lg" />
                    ))}
                  </div>
                }>
                  <SimilarTools tools={similarTools} toolName={tool.name} />
                </Suspense>
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
    </div>
  );
}