import { cn } from "@/lib/utils";
import Image from "next/image";
import { PostWithId } from "src/models/post";

import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import { decodeHTMLEntities } from "src/utils/string";

export function PostCard({ post, featured = false }: {
  post: PostWithId;

  featured?: boolean
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl overflow-hidden border border-border/50 bg-card group",
        "transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30",
        featured ? "h-auto" : "h-full",
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          fill
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-80" />

      </div>

      <div className={cn("p-4 flex-1 flex flex-col gap-2", featured ? "md:p-6" : "")}>
        <h3
          className={cn(
            "text-foreground font-semibold line-clamp-2",
            featured ? "text-xl md:text-2xl" : "text-lg"
          )}
        >
          {decodeHTMLEntities(post.title)}
        </h3>
        <div className="mb-3 flex flex-wrap gap-2">
          {post.labels.slice(0, 2).map((tag: string, index: number) => (
            <Badge
              key={index}
              variant="default_light"
              className="font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <p className={cn(
          "text-muted-foreground mb-4 flex-1 text-pretty",
          featured ? "text-base md:text-lg" : "text-sm"
        )}>
          {post.description?.substring(0, featured ? 500 : 120) + "..."}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-muted-foreground">
            {format(new Date(post.createdAt), "MMM dd, yyyy")}
          </span>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform duration-500 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </div>
  );
}