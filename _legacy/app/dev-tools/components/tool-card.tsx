"use client";

import { ArrowRight, Box, Sparkles, Wrench } from "lucide-react";
import Link from "next/link";

// Helper to determine icon based on category (optional, adds visual flair)
const getCategoryIcon = (category: string) => {
  const lower = category?.toLowerCase() || "";
  if (lower.includes("ai") || lower.includes("bot")) return Sparkles;
  if (lower.includes("design") || lower.includes("ui")) return Box;
  return Wrench;
};

interface ToolCardProps {
  title: string;
  description: string;
  path: string;
  category?: string; // Added category to props
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function ToolCard({
  title,
  description,
  path,
  category = "Utility",
  style,
  className,
}: ToolCardProps) {
  const Icon = getCategoryIcon(category);

  return (
    <Link
      href={path}
      style={style}
      className={`group relative flex flex-col justify-between h-full p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/50 hover:-translate-y-1 ${className}`}
    >
      {/* --- Hover Gradient Effect --- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* --- Header Section --- */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        {/* Icon Box */}
        <div className="h-12 w-12 rounded-xl bg-background border border-border/50 shadow-inner flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <span className="text-xl font-bold font-mono">
            {/* Fallback to first letter if no icon provided */}
            {title.charAt(0)}
          </span>
        </div>

        {/* Category Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/50 border border-border/50 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
          <Icon className="w-3 h-3" />
          {category}
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="relative z-10 flex flex-col grow">
        <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
          {description}
        </p>
      </div>

      {/* --- Footer / Action --- */}
      <div className="relative z-10 mt-auto pt-4 border-t border-border/30 flex items-center text-sm font-medium text-primary">
        <span className="mr-2">Try this tool</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}