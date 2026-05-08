import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "app/layouts/navbar";
import {
    getPublicToolBySlugForRatingPage,
    getRatingsAndReviewsByPage,
    postRatingAndReview,
    toggleBookmark,
} from "app/scout/lib/actions";
import { getAverageRating } from "app/scout/lib/utils";
import {
    ArrowLeft,
    ExternalLink,
    MessageSquare,
    Star
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RatingTypeWithId } from "src/models/tool-rating";
import { formatNumber } from "src/utils/formaters";
import { getSession } from "~/auth/server";
import { BookMarkButton } from "../bookmark";
import { PostReview } from "../post-review";
import RatingComponent from "../rating";

export default async function ToolPage(props: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;
  const tool = await getPublicToolBySlugForRatingPage(params.slug);
  
  if (!tool) {
    return notFound();
  }
  
  const session = await getSession();
  const { ratings } = await getRatingsAndReviewsByPage(tool._id, 1);
  const averageRating = getAverageRating(ratings || []);

  async function publishRating(data: { rating: number; comment: string }) {
    "use server";
    try {
      if (!session || !session.user) {
        return Promise.reject("You need to be logged in to rate a tool");
      }
      const rating = await postRatingAndReview({
        toolId: tool._id!,
        userId: session.user.id!,
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
    <div className="min-h-screen pb-20">
      <Navbar />
      


      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-8">
        
        {/* --- Navigation --- */}
        <Link 
          href={`/scout/tools/${params.slug}`}
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Tool Details
        </Link>

        {/* --- Tool Header Card --- */}
        <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl overflow-hidden shadow-xl">
           
           {/* Cover Background Blur */}
           <div className="h-32 w-full relative overflow-hidden bg-muted/30">
              <Image 
                src={tool.coverImage} 
                alt="Background" 
                fill 
                className="object-cover opacity-20 blur-3xl scale-110" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent" />
           </div>

           <div className="px-8 pb-8 -mt-16 relative flex flex-col md:flex-row gap-8 items-start md:items-end">
              
              {/* Icon / Image */}
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-2xl border-4 border-card bg-background shadow-2xl overflow-hidden shrink-0 relative group">
                 <Image
                    src={tool.coverImage}
                    alt={tool.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                 />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2 mb-2">
                 <div className="flex items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{tool.name}</h1>
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                       {tool.pricing_type}
                    </Badge>
                 </div>
                 
                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center text-yellow-500">
                       <Star className="w-4 h-4 fill-current mr-1.5" />
                       <span className="font-bold text-foreground">{averageRating}</span>
                       <span className="mx-1.5 opacity-50">•</span>
                       <span className="underline decoration-dotted cursor-help">{formatNumber(ratings.length)} ratings</span>
                    </div>
                    <div className="hidden md:block w-px h-4 bg-border" />
                    <div className="hidden md:flex gap-2">
                       {tool.categories.slice(0,3).map((cat: any) => (
                          <Badge key={cat.slug} variant="secondary" className="text-xs">{cat.name}</Badge>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                 <BookMarkButton
                    tool={tool}
                    toggleBookmark={toggleBookmark}
                    userId={session?.user?.id || null}
                 />
                 <Button className="flex-1 md:flex-none rounded-full gap-2 shadow-lg shadow-primary/20" asChild>
                    <Link href={tool.link + "?ref=nexonauts"} target="_blank">
                       Visit Site <ExternalLink className="w-4 h-4" />
                    </Link>
                 </Button>
              </div>
           </div>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid lg:grid-cols-12 gap-8">
           
           {/* LEFT: Reviews Feed */}
           <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                 <h2 className="text-xl font-bold flex items-center gap-2">
                    Reviews 
                    <Badge variant="secondary" className="rounded-full px-2">{ratings.length}</Badge>
                 </h2>
                 
                 {/* Sort Filter (Mock) */}
                 <select className="bg-transparent text-sm font-medium text-muted-foreground border-none outline-none cursor-pointer">
                    <option>Most Helpful</option>
                    <option>Newest First</option>
                    <option>Highest Rated</option>
                 </select>
              </div>

              <Tabs defaultValue="all" className="w-full">
                 <div className="border-b border-border/50 mb-6">
                    <TabsList className="bg-transparent h-auto p-0 gap-6">
                       <TabItem value="all" label="All Reviews" />
                       <TabItem value="your-review" label="Write a Review" />
                    </TabsList>
                 </div>

                 <TabsContent value="all" className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    <Suspense fallback={<ReviewsSkeleton />}>
                       {ratings.map((rating: RatingTypeWithId) => (
                          <RatingComponent key={rating._id} rating={rating} />
                       ))}
                       {ratings.length === 0 && (
                          <div className="py-12 text-center bg-muted/20 rounded-xl border border-dashed border-border">
                             <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                             <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
                          </div>
                       )}
                    </Suspense>
                 </TabsContent>

                 <TabsContent value="your-review">
                    <div className="bg-card border border-border/50 rounded-xl p-6 md:p-8">
                       {session && session.user ? (
                          <div className="max-w-2xl mx-auto">
                             <div className="text-center mb-8">
                                <h3 className="text-lg font-semibold mb-2">How was your experience?</h3>
                                <p className="text-muted-foreground text-sm">Your feedback helps others make better decisions.</p>
                             </div>
                             <PostReview
                                tool={tool}
                                postRatingAndReview={publishRating}
                             />
                          </div>
                       ) : (
                          <div className="text-center py-8">
                             <Button variant="outline" asChild>
                                <Link href="/auth/sign-in">Sign in to write a review</Link>
                             </Button>
                          </div>
                       )}
                    </div>
                 </TabsContent>
              </Tabs>
           </div>

           {/* RIGHT: Rating Breakdown */}
           <div className="lg:col-span-4 space-y-6">
              <Card className="border-border/50 shadow-sm sticky top-24">
                 <CardHeader>
                    <h3 className="font-semibold">Rating Breakdown</h3>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="text-5xl font-black text-foreground">{averageRating}</div>
                       <div className="space-y-1">
                          <div className="flex text-yellow-400">
                             {[1,2,3,4,5].map((i) => (
                                <Star key={i} className={`w-4 h-4 ${i <= Math.round(Number(averageRating)) ? 'fill-current' : 'text-muted'}`} />
                             ))}
                          </div>
                          <p className="text-xs text-muted-foreground font-medium">{formatNumber(ratings.length)} global ratings</p>
                       </div>
                    </div>

                    <div className="space-y-2">
                       {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-3 text-sm">
                             <span className="w-3 font-medium text-muted-foreground">{star}</span>
                             <Progress value={Math.random() * 100} className="h-2" /> {/* Real calc needed */}
                          </div>
                       ))}
                    </div>

                    <div className="pt-4 border-t border-border/50">
                       <h4 className="text-sm font-medium mb-3">Rate this tool</h4>
                       <p className="text-xs text-muted-foreground mb-4">Share your thoughts with other customers</p>
                       <Button variant="outline" className="w-full rounded-full" asChild>
                          <Link href="/auth/sign-in">Write a customer review</Link>
                       </Button>
                    </div>
                 </CardContent>
              </Card>
           </div>

        </div>
      </main>
    </div>
  );
}

// --- Helpers ---

const TabItem = ({ value, label }: {
  value: string;
  label: string;
}) => (
  <TabsTrigger 
    value={value}
    className="rounded-none border-b-2 border-transparent px-0 pb-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none transition-all hover:text-foreground/80"
  >
    {label}
  </TabsTrigger>
);

const ReviewsSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-4 p-4 border rounded-xl">
         <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
         <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            <div className="h-3 w-full bg-muted animate-pulse rounded" />
            <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
         </div>
      </div>
    ))}
  </div>
);