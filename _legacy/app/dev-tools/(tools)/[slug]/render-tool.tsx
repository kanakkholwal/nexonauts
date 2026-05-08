"use client";

import AdUnit from "@/components/common/adsense";
import ShareButton from "@/components/common/share-button";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/utils/error-boundary";
import { ButtonLink } from "@/components/utils/link";
import {
  ChevronLeft,
  Info,
  LayoutTemplate,
  Share2,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import React from "react";
import type { ToolType } from "../collection/index";

// Type guard helper
const isUrl = (icon: string | any): icon is string =>
  typeof icon === "string" && (icon.startsWith("http") || icon.startsWith("/"));

export default function RenderTool({ tool }: { tool: ToolType }) {


  // Logic to render the icon nicely
  const IconComponent = () => {
    if (isUrl(tool.icon)) {
      return (
        <Image
          src={tool.icon}
          height={96}
          width={96}
          alt={tool.title}
          className="object-cover rounded-2xl"
        />
      );
    }

    if (React.isValidElement(tool.icon)) {
      return tool.icon;
    }

    return (
      <Image
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${tool.title}&backgroundColor=141A21`}
        height={96}
        width={96}
        alt={tool.title}
        className="rounded-2xl"
      />
    );
  };

  return (
    <div className="relative min-h-screen w-full ">


      {/* Main Container */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">

        {/* Navigation */}
        <nav className="flex items-center justify-between mb-8">
          <ButtonLink
            href="/dev-tools"
            variant="ghost"
            className="group pl-0 "
          >
            <ChevronLeft className="transition-transform group-hover:-translate-x-0.5" />
            <span className="font-medium">Back to Directory</span>
          </ButtonLink>

          <div className="flex gap-2">
            <ShareButton
              variant="outline"
              size="sm"
              data={{
                title: tool.title,
                text: tool.description,
                url: `https://nexonauts.com/dev-tools/${tool.slug}`,
                image: `https://api.dicebear.com/7.x/initials/svg?seed=${tool.title}&backgroundColor=141A21`,
              }}
            >
              <Share2 />
              Share
            </ShareButton>
          </div>
        </nav>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

          <div className="xl:col-span-9 w-full flex flex-col gap-8 min-w-0">

            {/* Ad Unit: Top Leaderboard */}
            <div className="w-full min-h-[100px] rounded-2xl  border border-border/60 flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(#00000005_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10">
                <AdUnit adSlot="display-horizontal" />
              </div>
            </div>

            {/* Header Section */}
            <header className="flex flex-col sm:flex-row gap-8 items-start sm:items-center px-2">
              <div className="relative group shrink-0">

                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity" />

                <div className="relative size-24 md:size-28 rounded-4xl bg-card/80 border border-border shadow-xl backdrop-blur-md flex items-center justify-center overflow-hidden">

                  <IconComponent />

                </div>

              </div>

              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border-primary/20">
                    {tool.category || "Utility"}
                  </Badge>
                  <div className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                    <ShieldCheck className="size-3 mr-1" />
                    Client-Side Secure
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/60">
                  {tool.title}
                </h1>

                <p className="text-md text-muted-foreground leading-relaxed max-w-4xl">
                  {tool.description}
                </p>
              </div>
            </header>

            {/* Tool Canvas (The Main Application) */}
            <section
              className="relative w-full mt-4"
              id="tool-application"
            >
              <ErrorBoundary
                fallback={
                  <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
                    <div className="mb-4 p-4 bg-destructive/10 rounded-full">
                      <Info className="w-8 h-8 text-destructive" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      The tool encountered an error. Try reloading it.
                    </p>

                  </div>
                }
              >
                <tool.Component />
              </ErrorBoundary>
            </section>

            {/* Ad Unit: Bottom Multiplex (Engagement) */}
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2">Recommended for you</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="min-h-[280px] w-full bg-card rounded-2xl border shadow-sm flex items-center justify-center p-4">
                <AdUnit adSlot="multiplex_horizontal" />
              </div>
            </div>

            {/* Footer Disclaimer */}
            <div className="text-center py-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                <Info className="w-3.5 h-3.5" />
                This tool runs entirely in your browser. No data is sent to our servers.
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: Sidebar (Span 3) --- */}
          {/* Visible only on XL screens (1280px+) */}
          <aside className="hidden xl:flex xl:col-span-3 flex-col gap-6 sticky top-24">

            {/* Ad Unit: Vertical Skyscraper */}
            <div className="w-full min-h-[600px] rounded-2xl bg-card border shadow-sm flex flex-col items-center justify-start overflow-hidden relative">
              <div className="w-full py-2 bg-muted border-b  text-center">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Sponsored</span>
              </div>
              <div className="flex-1 w-full flex items-center justify-center p-4 bg-muted/30">
                {/* Ensure this ad unit is configured for vertical sizes (160x600, 300x600) */}
                <AdUnit adSlot="display-vertical" />
              </div>
            </div>

            {/* Cross-Promotion Widget */}
            <div className="rounded-2xl border border-primary/10 bg-linear-to-br from-primary/10 to-card p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  <LayoutTemplate className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">More Developer Tools</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Browse our collection of 100+ open source utilities to speed up your workflow.
              </p>
              <ButtonLink href="/dev-tools" variant="outline" size="sm" width="full">
                Explore Directory
              </ButtonLink>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}