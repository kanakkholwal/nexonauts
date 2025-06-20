import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/utils/link";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import type { ToolType } from "../collection/index";

const isUrl = (icon: string | StaticImageData | React.ReactNode): icon is string =>
  typeof icon === "string" && (icon.startsWith("http://") || icon.startsWith("https://"));

export default function RenderTool({ tool }: { tool: ToolType }) {

  const IconComponent = isUrl(tool.icon) || tool.icon instanceof Object ? (
    <Image
      src={isUrl(tool.icon) ? tool.icon : `https://api.dicebear.com/5.x/initials/svg?seed=${tool.title}`}
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
        <ButtonLink size="xs" variant="link" href="/dev-tools" title="Back to Tools">
          <HiArrowLeft />
          Back to Tools
        </ButtonLink>

        <div className="flex gap-4 pb-3 mb-3 border-b items-center mt-5">
          <div className="flex justify-center items-center w-28 h-28">
            {IconComponent}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{tool.title}</h1>
            <div className="text-sm text-muted-foreground">
              <Badge size="sm" variant="default">
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
