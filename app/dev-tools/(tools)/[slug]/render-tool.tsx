"use client";

import AdUnit from "@/components/common/adsense";
import ShareButton from "@/components/common/share-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Maximize2,
  RotateCcw,
  Share2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { ToolType } from "../collection/index";

// Type guard helper
const isUrl = (icon: string | any): icon is string =>
  typeof icon === "string" && (icon.startsWith("http") || icon.startsWith("/"));

export default function RenderTool({ tool }: { tool: ToolType }) {
  // Logic to render the icon nicely (Unchanged)
  const IconComponent = () => {
    if (isUrl(tool.icon)) {
      return (
        <Image
          src={tool.icon}
          height={80}
          width={80}
          alt={tool.title}
          className="object-cover"
        />
      );
    }

    if (React.isValidElement(tool.icon)) {
      return tool.icon;
    }

    // Fallback if icon is missing or invalid type
    return (
      <Image
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${tool.title}&backgroundColor=141A21`}
        height={80}
        width={80}
        alt={tool.title}
      />
    );
  };

  return (
    <main className="relative selection:bg-primary/20 pb-20">
      {/* Subtle background texture for the whole page */}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center justify-between mb-12">
          <Link
            href="/dev-tools"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Directory
          </Link>

          <div className="flex gap-2">
            <ShareButton
              variant="outline"
              size="icon"
              data={{
                title: tool.title,
                text: tool.description,
                url: `https://nexonauts.com/dev-tools/${tool.slug}`,
                image: `https://api.dicebear.com/7.x/initials/svg?seed=${tool.title}&backgroundColor=141A21`,
              }}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Share2 className="w-4 h-4" />
            </ShareButton>
          </div>
        </nav>
        {/* --- [AD PLACEMENT 1]: Top Leaderboard --- */}
        {/* Placed before the header to capture initial attention without pushing content too far down */}
        <div className="w-full flex justify-center mb-8 min-h-[90px]">
          <AdUnit adSlot="display-horizontal" className="w-full max-w-[728px]" />
        </div>
        {/* --- Tool Header (Unchanged) --- */}
        <header className="flex flex-col md:flex-row gap-8 mb-12 items-start md:items-center">
          {/* Icon Container with Glow */}
          <div className="relative group shrink-0">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-[2rem] bg-background/80 border border-border/50 shadow-xl backdrop-blur-md flex items-center justify-center overflow-hidden">
              <IconComponent />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border-primary/20"
                >
                  {tool.category || "Utility"}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70">
                {tool.title}
              </h1>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {tool.description}
            </p>
          </div>
        </header>

        <section className="relative my-16 max-w-[--max-app-width] mx-auto">
          {/* Design Note: 
            Using a deep shadow and a crisp border instead of a blurry glow 
            for a more professional, "application window" feel.
          */}
          <div
            className="relative rounded-2xl border border-border/50 bg-background/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.05)] overflow-hidden min-h-[600px] flex flex-col"
            style={{
              // Optional: Subtle inner glow to define edges further
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.05), 0 8px 30px rgba(0,0,0,0.12)",
            }}
          >
            {/* Workspace Toolbar Header */}
            <div className="h-14 border-b border-border/40 bg-muted/30 flex items-center justify-between px-6 select-none">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">
                  Interactive Canvas
                </span>
                {tool.slug && (
                  <code className="hidden sm:block ml-2 px-2 py-0.5 rounded-md bg-muted text-xs font-mono text-muted-foreground">
                    {tool.slug}
                  </code>
                )}
              </div>

              {/* Toolbar Actions (Placeholders for future functionality) */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  title="Reset Tool (Coming Soon)"
                  disabled
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  title="Fullscreen (Coming Soon)"
                  disabled
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tool Canvas Area */}
            <div className="relative grow flex flex-col items-center justify-center w-full p-2 md:p-5 group">
              {/* Subtle dot pattern background for the canvas area */}
              <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

              <div className="w-full max-w-5xl z-10 relative">
                <tool.Component />
              </div>
            </div>
          </div>
          {/* <tool.Component /> */}
        </section>


        {/* --- [AD PLACEMENT 2]: Bottom Multiplex --- */}
        {/* Good for "What's Next" engagement after using the tool */}
        <div className="mt-16 mb-8 w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Suggested for you
            </span>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <AdUnit adSlot="multiplex_horizontal" />
        </div>


        {/* --- Footer / Disclaimer (Unchanged) --- */}
        <div className="mt-12 text-center text-sm text-muted-foreground border-t border-border/40 pt-8">
          <p>
            This tool runs entirely in your browser. No data is sent to our
            servers.
          </p>
        </div>
      </div>
    </main>
  );
}