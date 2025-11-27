import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Quote } from "lucide-react";
import MarkdownView from "src/components/markdown/view";
import { RatingTypeWithId } from "src/models/tool-rating";



// --- COMPONENT ---
export default function RatingComponent({
  rating,
}: {
  rating: RatingTypeWithId;
}) {
  const dateString = rating.createdAt ? rating.createdAt.toString() : new Date().toISOString();

  return (
    <article className="group relative p-6 rounded-2xl bg-card/40 border border-border/50 hover:border-border transition-colors duration-300">
      {/* Decorative Quote Icon (Subtle background element) */}
      <Quote className="absolute top-6 right-6 w-8 h-8 text-muted-foreground/10 rotate-180 pointer-events-none" />

      <div className="flex gap-4 items-start">
        {/* Avatar Section */}
        <div className="shrink-0">
          <Avatar className="h-10 w-10 border border-border/50">
            <AvatarImage
              src={rating.userId.profilePicture}
              alt={`@${rating.userId.username}`}
            />
            <AvatarFallback className="uppercase bg-muted text-muted-foreground font-medium">
              {rating.userId.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Header: Name, Stars, Date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm text-foreground">
                  {rating.userId.name}
                </h4>
                <span className="text-xs text-muted-foreground">
                  @{rating.userId.username}
                </span>
              </div>
              {/* Rating directly under name connects the user to the score */}
              <div className="mt-1">
                <Rating
                  value={rating.rating}
                  count={5}
                  readonly={true}
                  size="sm"
                  className="gap-0.5"
                />
              </div>
            </div>

            <time
              dateTime={dateString}
              className="text-xs font-medium text-muted-foreground whitespace-nowrap"
            >
              {format(parseISO(dateString), "MMM dd, yyyy")}
            </time>
          </div>

          {/* Comment Body */}
          <div className="relative">
            <MarkdownView
              className={cn(
                "prose prose-sm dark:prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none",
                "prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              )}
            >
              {rating.comment}
            </MarkdownView>
          </div>
        </div>
      </div>
    </article>
  );
}

// --- SKELETON ---
export function RatingSkeletonLoader() {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border/50 flex gap-4 w-full">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />

      <div className="flex flex-col gap-3 flex-1 w-full">
        <div className="flex justify-between items-start w-full">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* Name */}
            <Skeleton className="h-3 w-24" /> {/* Stars */}
          </div>
          <Skeleton className="h-3 w-20" /> {/* Date */}
        </div>

        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    </div>
  );
}