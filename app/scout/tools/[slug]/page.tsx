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
import Navbar from "app/layouts/navbar-static";
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
  Lock,
  MessageCircle,
  Star,
  Zap,
} from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import MarkdownView from "src/components/markdown/view";
import { getSession } from "src/lib/auth";
import { RatingTypeWithId } from "src/models/tool-rating";
import { formatNumber } from "src/utils/formaters";
import { BookMarkButton } from "./bookmark";
import { PostReview } from "./post-review";
import RatingComponent, { RatingSkeletonLoader } from "./rating";
import SimilarTools from "./similar-tools";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await params;
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
  console.log(tool);

  const similarTools = await getSimilarTools(tool.categories);
  const ratings = await getRatingsAndReviews(tool._id);
  // console.log(ratings);

  const { bannerURL, iconURL } = getImages(tool.link);

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
    <>
      <Navbar />

      <CircularGradient />
      <main className="w-full mx-auto xl:max-w-7xl xl:px-0 rounded-lg overflow-hidden pt-56 px-2 space-y-10 @container">
        <Card variant="glass">
          <CardHeader className="flex flex-row gap-3 items-center flex-wrap">
            <div className="flex-1 space-y-4">
              <div className="flex flex-row gap-3 items-center justify-start">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={97}
                    height={96}
                    fill="none"
                  >
                    <rect
                      width={96}
                      height={96}
                      x="0.416"
                      fill="url(#avatar-backdrop_svg__a)"
                      rx={24}
                    />
                    <rect
                      width={95}
                      height={95}
                      x="0.916"
                      y="0.5"
                      stroke="#fff"
                      strokeOpacity="0.06"
                      rx="23.5"
                      style={{
                        stroke: "rgb(255, 255, 255)",
                        strokeOpacity: "0.06",
                      }}
                    />
                    <defs>
                      <linearGradient
                        id="avatar-backdrop_svg__a"
                        x1="10.109"
                        x2="75.794"
                        y1={0}
                        y2="70.487"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          stopColor="#1B1C1E"
                          style={{
                            stopColor: "color(display-p3 0.1059 0.1098 0.1176)",
                            stopOpacity: 1,
                          }}
                        />
                        <stop
                          offset={1}
                          stopColor="#111214"
                          style={{
                            stopColor: "color(display-p3 0.0667 0.0706 0.0784)",
                            stopOpacity: 1,
                          }}
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Image
                    width={320}
                    height={320}
                    src={bannerURL || tool.coverImage}
                    alt={tool.name}
                    // className="rounded-lg backdrop-blur-lg border border-border max-w-24 @xl:max-w-40 p-2"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg backdrop-blur-lg "
                  />
                </div>
                <CardTitle title={tool.name} className="text-5xl font-bold">
                  {tool.name}
                </CardTitle>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 ml-auto">
              <BookMarkButton
                tool={tool}
                toggleBookmark={toggleBookmark}
                userId={session?.user?._id! || null}
              />
              <Button
                variant="gradient_purple"
                width="xs"
                rounded={"full"}
                asChild
              >
                <Link href={marketwiseLink(tool.link)} target="_blank">
                  <span>Check it out</span>
                  <ExternalLink className="inline-block ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="w-full space-y-4">
              <div className="inline-flex flex-wrap gap-2 w-full items-center justify-start">
                <Badge variant="default_light" size="sm">
                  {tool.pricing_type}
                </Badge>
                <div className="flex h-5 items-center text-sm">
                  <Eye className="w-4 h-4 me-1 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatNumber(tool.views)} views
                  </span>
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                  <Bookmark className="w-4 h-4 text-cyan-500 me-1" />
                  {formatNumber(tool?.bookmarks?.length! || 0)}
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                  <Star className="w-4 h-4  text-yellow-500 me-1" />
                  {getAverageRating(ratings || [])}
                  <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                  <a
                    href="#reviews"
                    className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    {formatNumber(ratings.length)} reviews
                  </a>
                </div>
              </div>
              <div className="inline-flex flex-wrap gap-2 w-full items-center justify-start">
                {tool.categories.map((category, index) => {
                  return (
                    <Badge
                      key={category.slug + "_" + index}
                      variant="success_light"
                      className="font-medium"
                    >
                      <Hash className="inline-block w-4 h-4" />
                      {category.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </CardHeader>
        </Card>
        <Card
          id="overview"
          className="backdrop-blur bg-white dark:bg-gray-600/30"
        >
          <CardHeader>
            <CardTitle>
              <Zap className="inline-block mr-2 w-5 h-5 text-teal-600" />{" "}
              Overview
            </CardTitle>
            <CardDescription>
              Learn about <strong>{tool.name}</strong> and it's pricing model
              and every basic thing I should know before using it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MarkdownView className="prose dark:prose-invert prose-slate max-w-full">
              {tool.description}
            </MarkdownView>
          </CardContent>
        </Card>
        <Card
          id="similar-tools"
          className="backdrop-blur bg-white dark:bg-gray-600/30"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <SimilarTools tools={similarTools} toolName={tool.name} />
          </Suspense>
        </Card>
        <Card
          id="reviews"
          className="backdrop-blur bg-white dark:bg-gray-600/30 my-20"
        >
          <CardHeader className="flex items-center w-full gap-2 flex-col md:flex-row">
            <div>
              <CardTitle>
                <Star className="inline-block mr-2 w-6 h-6" />
                Ratings & Reviews
              </CardTitle>
              <CardDescription>
                See what other users have to say about{" "}
                <strong>{tool.name}</strong>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2 gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white/80">
                {getAverageRating(ratings || [])} of 5
              </span>
              <Rating
                count={5}
                value={getAverageRating(ratings || [])}
                readonly={true}
              />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 inline-flex items-center">
              <span className="font-semibold hover:underline cursor-pointer">
                {formatNumber(ratings.length)} ratings
              </span>
              <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
              We don't verify reviews.
            </p>

            <Tabs defaultValue="all-reviews" className="w-full mt-5">
              <TabsList className="w-full">
                <TabsTrigger value="all-reviews">All Reviews</TabsTrigger>
                <TabsTrigger value="your-review">Your Review</TabsTrigger>
              </TabsList>
              <TabsContent value="all-reviews" className="py-4 space-y-4">
                <Suspense
                  fallback={
                    <>
                      <RatingSkeletonLoader />
                      <RatingSkeletonLoader />
                      <RatingSkeletonLoader />
                    </>
                  }
                >
                  {ratings.map((rating: RatingTypeWithId) => {
                    return <RatingComponent key={rating._id} rating={rating} />;
                  })}
                  {ratings.length === 0 && (
                    <div className="flex items-center justify-center flex-col gap-2">
                      <MessageCircle className="w-24 h-24 text-gray-400" />
                      <h3 className="text-gray-500 text-xl font-semibold">
                        No reviews yet.
                      </h3>
                      <p className="text-gray-500 text-base">
                        Be the first to rate this tool and share your experience
                        with the community.
                      </p>
                    </div>
                  )}
                </Suspense>
              </TabsContent>
              <TabsContent value="your-review">
                <div className="flex items-center justify-center flex-col gap-2 mx-auto">
                  <Suspense
                    fallback={
                      <>
                        <RatingSkeletonLoader />
                      </>
                    }
                  >
                    {session && session?.user ? (
                      <>
                        <PostReview
                          tool={tool}
                          postRatingAndReview={publishRating}
                        />
                      </>
                    ) : (
                      <div className="flex items-center justify-center flex-col gap-2 py-4">
                        <Lock className="w-24 h-24 text-gray-400" />
                        <h3 className="text-gray-500 text-xl font-semibold">
                          You need to be logged in.
                        </h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400  mb-2">
                          Login to rate this tool and share your experience with
                          the community.
                        </p>
                        <Button asChild>
                          <Link
                            href={
                              "/login?callbackUrl=" +
                              encodeURI(
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
                  </Suspense>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

function marketwiseLink(link: string) {
  const url = new URL(link);
  url.searchParams.append("ref", "nexonauts.com/scout");
  url.searchParams.append("utm_source", "nexonauts.com");
  url.searchParams.append("utm_medium", "referral");
  url.searchParams.append("utm_campaign", "nexonauts.com/scout");
  return url.toString();
}

function getImages(toolLink: string) {
  const bannerURL = new URL(`https://api.microlink.io/`);
  // ?url=https://codeium.com&screenshot=true&meta=false&embed=screenshot.url
  bannerURL.searchParams.append("url", toolLink);
  bannerURL.searchParams.append("screenshot", "true");
  bannerURL.searchParams.append("meta", "false");
  bannerURL.searchParams.append("embed", "screenshot.url");

  const iconURL = new URL(`https://www.google.com/s2/favicons`);
  iconURL.searchParams.append("domain", new URL(toolLink).hostname);
  iconURL.searchParams.append("sz", "512");

  return {
    bannerURL: bannerURL.toString(),
    iconURL: iconURL.toString(),
  };
}
