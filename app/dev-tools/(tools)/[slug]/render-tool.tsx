import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import type { ToolType } from "../collection/index";


export default function RenderTool({ tool }: { tool: ToolType }) {
  const IconComponent =
    typeof tool.icon === "string" || tool.icon instanceof Object ? (
      <Image
        src={tool.icon as StaticImageData}
        height={120}
        width={120}
        alt={tool.title}
        className="rounded-lg"
      />
    ) : (
      tool.icon
    );

  return (
    <main className="p-4 space-y-8 py-8">
      <section id="hero" className="relative">
        <Button size="sm" variant="link" asChild>
          <Link href="/dev-tools" title="Back to Tools">
            <HiArrowLeft />
            Back to Tools
          </Link>
        </Button>

        <div className="flex gap-4 pb-3 mb-3 border-b items-center">
          <div className="flex justify-center items-center w-28 h-28">
            {IconComponent}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{tool.title}</h1>
            <div className="text-sm text-slate-600">
              <Badge size="sm" variant="glass" className="text-sm">
                {tool.category}
              </Badge>
            </div>
          </div>
        </div>
        <div>
          <p className="prose dark:prose-invert max-w-full">
            {tool.description}
          </p>
        </div>
      </section>
      <section id="tool" className="my-5 pb-10 border-b">
        <tool.Component />
      </section>
    </main>
  );
}
