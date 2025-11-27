import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "app/layouts/navbar-dynamic";
import { CircularGradient } from "app/layouts/patterns/gradient";
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
  Bookmark,
  ExternalLink,
  Eye,
  Hash,
  LoaderCircle,
  Lock,
  MessageCircle,
  Star,
  Verified,
  Zap,
} from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MarkdownView from "src/components/markdown/view";
import { getSession } from "src/lib/auth";
import { getImages, marketwiseLink } from "src/lib/scout";
import { RatingTypeWithId } from "src/models/tool-rating";
import { formatNumber } from "src/utils/formaters";
import { BookMarkButton } from "./bookmark";
import { PostReview } from "./post-review";
import RatingComponent from "./rating";
import SimilarTools from "./similar-tools";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  const tool = await getToolMetaBySlug(slug);
  return {
    title: tool.name,
    description: tool.description.substring(0, 160),
    keywords:
      tool.tags?.join(", ") ||
      tool.categories.map((category) => category.name).join(", "),
    metadataBase: new URL(
      (process.env.NEXT_PUBLIC_WEBSITE_URL || "https://nexonauts.com") +
      "/scout/tools/" +
      tool.slug
    ),
    openGraph: {
      images: [tool.coverImage, tool?.bannerImage || tool.coverImage],
      title: tool.name,
      description: tool.description.substring(0, 160),
      url:
        (process.env.NEXT_PUBLIC_WEBSITE_URL || "https://nexonauts.com") +
        "/scout/tools/" +
        tool.slug,
    },
    category: tool.categories.map((category) => category.name).join(", "),
  };
}

const cache = new Map<string, boolean>();

export default async function ToolPage(props: Props) {
  const params = await props.params;
  const tool = await getPublicToolBySlug(
    params.slug,
    cache.get(params.slug) || false
  );

  if (!tool) {
    return notFound();
  }

  if (tool) {
    cache.set(params.slug, true);
  }

  const session = await getSession();
  const similarTools = await getSimilarTools(tool.categories);
  const ratings = await getRatingsAndReviews(tool._id);

  const { bannerURL } = getImages(tool.link);

  async function publishRating(data: { rating: number; comment: string }) {
    "use server";
    try {
      if (!session || !session?.user) {
        return Promise.reject("You need to be logged in to rate a tool");
      }
      const rating = await postRatingAndReview({
        toolId: tool._id!,
        userId: session?.user?._id!,
        rating: data.rating,
        comment: data.comment,
      });
      return Promise.resolve(rating);
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CircularGradient />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main className="lg:col-span-8 space-y-6">
            {/* Tool Banner */}
            <Card className="overflow-hidden">
              <div className="relative w-full aspect-video sm:aspect-21/9">
                <Image
                  fill
                  src={bannerURL || tool.coverImage}
                  alt={tool.name}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </div>

              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-start gap-3">
                      <CardTitle className="text-2xl sm:text-3xl font-bold">
                        {tool.name}
                      </CardTitle>
                      {tool.verified && (
                        <Verified className="shrink-0 mt-1 text-emerald-500 w-5 h-5" />
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge variant="default_light" size="sm" className="capitalize">
                        {tool.pricing_type}
                      </Badge>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="w-4 h-4 me-1 text-emerald-500" />
                        <span>{formatNumber(tool.views)} views</span>
                        <span className="w-1 h-1 mx-1.5 bg-muted-foreground rounded-full" />
                        <Bookmark className="w-4 h-4 text-cyan-500 me-1" />
                        {formatNumber(tool?.bookmarks?.length! || 0)}
                        <span className="w-1 h-1 mx-1.5 bg-muted-foreground rounded-full" />
                        <Star className="w-4 h-4 text-yellow-500 me-1" />
                        {getAverageRating(ratings || [])}
                        <span className="w-1 h-1 mx-1.5 bg-muted-foreground rounded-full" />
                        <a
                          href="#reviews"
                          className="underline hover:no-underline"
                        >
                          {formatNumber(ratings.length)} reviews
                        </a>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {tool.categories.map((category, index) => (
                        <Badge
                          key={category.slug + "_" + index}
                          variant="dark"
                          size="sm"
                          className="font-medium"
                        >
                          <Hash className="inline-block size-3" />
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <BookMarkButton
                      tool={tool}
                      toggleBookmark={toggleBookmark}
                      userId={session?.user?._id! || null}
                    />
                    <Button
                      variant="gradient_purple"
                      width="xs"
                      rounded="full"
                      size="default"
                      asChild
                      className="min-w-max"
                    >
                      <Link href={marketwiseLink(tool.link)} target="_blank">
                        <span>Check it out</span>
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Overview Section */}
            <Card id="overview">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-teal-600" />
                  Overview
                </CardTitle>
                <CardDescription>
                  Learn about <strong>{tool.name}</strong> and its pricing model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MarkdownView className="prose dark:prose-invert prose-slate max-w-full">
                  {tool.description}
                </MarkdownView>
              </CardContent>
            </Card>

            {/* Ratings & Reviews */}
            <Card id="reviews" className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  Ratings & Reviews
                </CardTitle>
                <CardDescription>
                  See what users say about <strong>{tool.name}</strong>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl font-bold">
                    {getAverageRating(ratings || [])}<span className="text-xl text-muted-foreground">/5</span>
                  </div>
                  <div className="flex flex-col">
                    <Rating
                      count={5}
                      value={getAverageRating(ratings || [])}
                      readonly={true}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatNumber(ratings.length)} ratings
                    </p>
                  </div>
                </div>

                <Tabs defaultValue="all-reviews" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="all-reviews" className="flex-1">
                      All Reviews
                    </TabsTrigger>
                    <TabsTrigger value="your-review" className="flex-1">
                      Your Review
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all-reviews" className="py-4 space-y-6">
                    {ratings.length > 0 ? (
                      ratings.map((rating: RatingTypeWithId) => (
                        <RatingComponent key={rating._id} rating={rating} />
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          No reviews yet
                        </h3>
                        <p className="text-muted-foreground">
                          Be the first to share your experience
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="your-review" className="py-4">
                    {session && session.user ? (
                      <PostReview
                        tool={tool}
                        postRatingAndReview={publishRating}
                      />
                    ) : (
                      <div className="py-8 text-center">
                        <Lock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          Login required
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Sign in to rate this tool
                        </p>
                        <Button asChild>
                          <Link
                            href={
                              "/login?callbackUrl=" +
                              encodeURIComponent(
                                process.env.NEXT_PUBLIC_WEBSITE_URL +
                                "/scout/tools/" +
                                tool.slug
                              )
                            }
                          >
                            Login
                          </Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </main>

          {/* Similar Tools Sidebar */}
          <aside className="lg:col-span-4">
            <Card className="lg:sticky lg:top-24 z-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  Similar Tools for <span className="text-primary">{tool.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="text-center py-4">
                  <LoaderCircle className="size-5 animate-spin text-primary inline-block" />
                  Loading similar tools...
                </div>}>
                  <SimilarTools tools={similarTools} toolName={tool.name} />
                </Suspense>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

