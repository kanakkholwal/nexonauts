import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, SearchX } from "lucide-react";
import Link from "next/link";
import LazyImage from "~/components/image";
import { getImages } from "~/lib/scout";
import { PublicToolTypeWithId } from "~/models/tool";

interface Props {
  tools: Partial<PublicToolTypeWithId>[];
  toolName: string;
}

export default function SimilarTools({ tools, toolName }: Props) {
  if (tools.length === 0) {
    return <EmptyState toolName={toolName} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {tools.map((tool) => {
        const images = getImages(tool?.link || "");

        return (
          <Link
            key={tool._id}
            href={`/scout/tools/${tool.slug}`}
            className="group flex gap-3 items-start p-2 -mx-2 rounded-xl transition-colors hover:bg-muted/50"
          >
            {/* Thumbnail */}
            <div className="relative w-24 h-16 shrink-0 rounded-lg overflow-hidden bg-muted border border-border/50">
              <LazyImage
                src={images?.bannerURL || tool.coverImage || "/placeholder.png"}
                alt={tool.name}
                width={150}
                height={100}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0 gap-1">
              <h4 className="text-sm font-semibold leading-tight truncate pr-2 group-hover:text-primary transition-colors">
                {tool.name}
              </h4>

              <div className="flex items-center gap-2 mt-0.5">
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[10px] px-1.5 h-5 font-medium capitalize border-transparent bg-muted text-muted-foreground",
                    tool.pricing_type === 'free' && "bg-emerald-500/10 text-emerald-600"
                  )}
                >
                  {tool.pricing_type}
                </Badge>
              </div>
            </div>

            {/* Subtle Chevron indicator on hover */}
            <div className="self-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function EmptyState({ toolName }: { toolName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center px-4 rounded-xl border border-dashed border-border/50 bg-muted/10">
      <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
        <SearchX className="w-5 h-5 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">
        No alternatives found
      </h3>
      <p className="text-xs text-muted-foreground mt-1 max-w-[20ch]">
        We couldn't find similar tools to <span className="font-medium">{toolName}</span> yet.
      </p>
    </div>
  );
}