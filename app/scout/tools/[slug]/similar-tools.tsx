import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import Link from "next/link";
import LazyImage from "~/components/image";
import { getImages } from "~/lib/scout";
import { PublicToolTypeWithId } from "~/models/tool";


interface Props {
  tools: Partial<PublicToolTypeWithId>[];
  toolName: string;
}
export default function SimilarTools({ tools, toolName }: Props) {
  return (
    <>
      {tools.length > 0 ? (tools.map((tool) => {
        const images = getImages(tool?.link || "");
        return <Link href={`/scout/tools/${tool.slug}`} key={tool._id} className="px-4">
          <div className="">
            <div className="flex flex-col w-full h-auto aspect-video overflow-hidden">
              <div className="relative flex items-center justify-center shrink-0 h-full group overflow-hidden rounded-lg">
                <LazyImage
                  className="h-auto rounded-lg shadow-md mx-auto object-cover object-top-left transition ease-in-out duration-300"
                  width={350}
                  height={200}
                  src={images?.bannerURL || tool.coverImage}
                  alt={tool.name}
                />
                <div className="absolute inset-0 transition duration-200 bg-gray-900/50 opacity-0 rounded-2xl group-hover:opacity-60"></div>
              </div>
            </div>
          </div>
          <div className="p-4 border-b">
            <h4 className="text-base font-semibold mb-2">
              {tool.name}
            </h4>
            <Badge variant="default_light" size="sm" className="capitalize">
              {tool.pricing_type}
            </Badge>
          </div>
        </Link>
      }
      )


      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-4 p-5">
          <Zap className="w-24 h-24 text-red-400" />
          <h3 className="text-foreground text-xl font-semibold">
            No similar tools found
          </h3>
          <p className="text-muted-foreground text-base">
            We couldn{`'`}t find any similar tools for this category.
          </p>
        </div>
      )}
    </>
  );
}
