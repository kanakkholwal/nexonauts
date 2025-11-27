"use client";

import { Input } from "@/components/ui/input";
import InfoArea from "@/components/utils/info-area";
import { cn } from "@/lib/utils";
import { LayoutGrid, Search, Sparkles, Terminal } from "lucide-react";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { ToolCard } from "./components/tool-card";
import { FAQs } from "./faqs";
import { allDevTools } from "./list"; // Importing your data structure



// --- SEO Content Component (Crucial for AdSense) ---
// Focused strictly on "Developer Tools" keywords to match the page intent
const DirectorySEO = () => (
  <section className="py-16 px-6 border-t border-border/40 bg-muted/20">
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" />
          About the Developer Ecosystem
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          The Nexonauts Developer Directory is a curated repository of open-source
          utilities and web tools designed to streamline modern development workflows.
          From <strong>SEO meta generators</strong> and <strong>file converters</strong> to
          advanced <strong>code minifiers</strong>, this collection aims to reduce context
          switching and enhance productivity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card/75 p-3 rounded-md">
          <h3 className="font-medium text-foreground mb-2">For Developers</h3>
          <p className="text-sm text-muted-foreground">
            Access a suite of non-AI and AI-powered utilities. Whether you need to
            format JSON, optimize images, or generate social preview cards, our
            tools are built to be fast, client-side secure, and reliable.
          </p>
        </div>
        <div className="bg-card/75 p-3 rounded-md">
          <h3 className="font-medium text-foreground mb-2">Open Source & Community</h3>
          <p className="text-sm text-muted-foreground">
            This platform serves as a hub for community contributions. Developers can
            submit their own tools, ensuring a constantly evolving library of
            resources that adapts to the latest web standards and technologies.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default function Tools() {
  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
  });
  const [activeCategory, setActiveCategory] = useQueryState("category", {
    defaultValue: "All",
  });

  // --- Dynamic Category Extraction ---
  // This automatically creates filter buttons based on what exists in your 'collection'
  const categories = useMemo(() => {
    const uniqueCategories = new Set(allDevTools.map((tool) => tool.category));
    return ["All", ...Array.from(uniqueCategories)];
  }, []);

  // --- Search & Filter Logic ---
  const filteredTools = useMemo(() => {
    const lowerQuery = query?.toLowerCase() || "";

    return allDevTools.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        tool.category.toLowerCase().includes(lowerQuery);

      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <>



      {/* --- Header Section --- */}
      <section className="relative z-10 pt-20 pb-12 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide border border-primary/20 mb-8">
          <Sparkles className="w-3 h-3" />
          Developer Utilities & Resources
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
          Everything you need to <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
            build faster.
          </span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          A growing collection of open-source web tools, converters, and generators.
          Free for everyone.
        </p>

        {/* --- Search Interface --- */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-card/60 backdrop-blur-xl border border-border/60 rounded-full shadow-sm focus-within:shadow-md focus-within:border-primary/50 transition-all duration-300">
            <Search className="ml-4 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search tools (e.g. 'converter', 'seo', 'minifier')..."
              className="border-none shadow-none focus-visible:ring-0 !bg-transparent h-12 text-base px-4 w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* --- Dynamic Categories --- */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn('px-4 py-1.5 rounded-full text-sm font-medium transition-all shadow duration-200 border bg-muted text-foreground border-2',
                activeCategory === cat
                  ? "border-primary/75"
                  : "border-muted")}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* --- Tools Grid --- */}
      <section className="relative z-10 px-6 lg:px-12 max-w-[1400px] mx-auto pb-24">
        <div className="flex items-center justify-between mb-6 border-b border-border/40 pb-4">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <LayoutGrid className="w-5 h-5 text-muted-foreground" />
            {activeCategory} Tools
          </div>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
            {filteredTools.length}
          </span>
        </div>

        {filteredTools.length > 0 ? (
          <div className="w-full grow grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5">
            {filteredTools.map((tool, index) => (
              // Ensure your ToolCard accepts 'path' or handles the link internally
              <ToolCard
                key={tool.id}
                {...tool}
                style={{ animationDelay: `${0.05 * index}s` }}
              />
            ))}
          </div>
        ) : (
          <div className="py-12">
            <InfoArea
              title="No matching tools"
              description="Try adjusting your search or category filter."
            />
          </div>
        )}
      </section>

      {/* --- Content Strategy (AdSense) --- */}
      <DirectorySEO />

      <div className="relative z-10">
        <FAQs />
      </div>
    </>
  );
}