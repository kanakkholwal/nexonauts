import { NumberTicker } from "@/components/animation/number-ticker";
import NavbarGlobal from "@/components/common/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  ArrowUpDown,
  FolderOpen,
  MonitorSmartphone,
  ScanSearch,
  Search,
  Sparkles,
  Star,
  Zap
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cache, Suspense } from "react";
import dbConnect from "src/lib/db";
import PublicTool, { PublicToolTypeWithId } from "src/models/tool";
import heroDashboardImage from "./illustration.png";
;

export const metadata: Metadata = {
  title: "Nexo Scout - The AI Tool Directory",
  description:
    "Discover the best AI tools, services, and resources to supercharge your workflow.",
};

const features = [
  {
    name: "Effortless Search",
    description:
      "Powerful semantic search makes locating the perfect solution for your specific stack instant.",
    icon: Search,
  },
  {
    name: "Curated Quality",
    description:
      "We manually verify every tool to ensure you only see best-in-class solutions, no vaporware.",
    icon: Star,
  },
  {
    name: "Always Fresh",
    description:
      "Our database is updated daily with the latest AI breakthroughs and version updates.",
    icon: Zap,
  },
  {
    name: "Developer Focused",
    description:
      "Filter by API availability, open-source license, and pricing models instantly.",
    icon: MonitorSmartphone,
  },
  {
    name: "Smart Categories",
    description:
      "Navigate through specialized clusters like 'Generative Video', 'Code Assistants', and 'LLMOps'.",
    icon: FolderOpen,
  },
  {
    name: "Community Ranked",
    description:
      "See what's trending based on real developer usage and popularity metrics.",
    icon: ArrowUpDown,
  },
];

// --- Data Fetching (Preserved) ---
async function getCategories() {
  const categories = await PublicTool.aggregate([
    { $unwind: "$categories" },
    {
      $group: {
        _id: "$categories.slug",
        name: { $first: "$categories.name" },
        slug: { $first: "$categories.slug" },
      },
    },
    { $project: { _id: 0, name: 1, slug: 1 } },
  ]).limit(5);
  const slugs = categories.map((category) => category.slug);

  const categorized_tools = await PublicTool.aggregate([
    { $unwind: "$categories" },
    {
      $group: {
        _id: "$categories.slug",
        name: { $first: "$categories.name" },
        slug: { $first: "$categories.slug" },
        tools: { $push: "$$ROOT" },
      },
    },
    {
      $project: { _id: 0, name: 1, slug: 1, tools: { $slice: ["$tools", 6] } },
    },
    { $match: { slug: { $in: slugs } } },
    { $sort: { name: 1 } },
  ]);
  return Promise.resolve(JSON.parse(JSON.stringify(categorized_tools)));
}

const getCategoriesPromise = cache(getCategories);
type CategorizedToolType = {
  name: string;
  slug: string;
  tools: PublicToolTypeWithId[];
}

export default async function Page() {
  await dbConnect();

  const noOfTools = await PublicTool.countDocuments({
    $or: [{ status: "published" }, { status: "approved" }],
  });

  const categorized_tools = (await getCategoriesPromise()) as CategorizedToolType[];

  return (
    <main className="min-h-screen ">
      <header className="relative overflow-hidden">
        <NavbarGlobal />

        {/* --- Hero Content --- */}
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">

          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span className="flex items-center gap-1">
              Database updated: <span className="font-bold">{new Date().toLocaleDateString()}</span>
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
            The Knowledge Base for <br className="hidden md:block" />
            <span className="bg-linear-to-l from-indigo-400 from-10% via-sky-400 via-30% to-emerald-300 to-90% bg-clip-text text-transparent">
              AI & Dev Tools
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Nexo Scout is the search engine for builders. Discover over{" "}
            <span className="font-semibold text-foreground">
              <NumberTicker value={noOfTools} />+
            </span>{" "}
            curated tools, resources, and services to streamline your next project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center w-full justify-center mb-20">
            <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/20" asChild>
              <Link href="/scout/browse">
                <ScanSearch className="mr-2 h-5 w-5" />
                Start Exploring
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-md" asChild>
              <Link href="/scout/submit">
                Submit a Tool
              </Link>
            </Button>
          </div>

          {/* --- Redesigned Abstract Hero Visual --- */}
          <div className="w-full max-w-6xl relative perspective-[1000px] group">
            {/* Animated Glow Effect */}
            <div className="absolute -inset-4 bg-linear-to-r from-primary/40 via-violet-500/40 to-blue-500/40 rounded-[32px] blur-3xl opacity-30 -z-10 animate-pulse group-hover:opacity-50 transition-opacity duration-500" />

            {/* Floating Dashboard Container */}
            <div className="relative rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl p-3 shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-[1.01] hover:rotate-x-[2deg]">
              <div className="rounded-xl overflow-hidden relative aspect-21/9 bg-muted/20">
                <Image
                  src={heroDashboardImage}
                  alt="Nexo Scout AI Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Screen Reflection/Gloss */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              </div>
            </div>

            {/* Bottom Reflection */}
            <div className="absolute -bottom-10 left-0 right-0 h-40 bg-gradient-to-b from-primary/20 to-transparent blur-3xl opacity-30 transform scale-x-90" />
          </div>
        </div>
      </header>

      {/* --- Popular Categories Tabs --- */}
      <section className="py-24 px-6 relative z-10 bg-muted/20 border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Trending Collections</h2>
              <p className="text-muted-foreground">Most searched categories this week.</p>
            </div>
            <Link href="/scout/categories" className="text-primary font-medium hover:underline flex items-center gap-1">
              View all categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-2xl" />
                ))}
              </div>
            }
          >
            {categorized_tools.length > 0 && (
              <Tabs defaultValue={categorized_tools[0].slug} className="w-full">
                <div className="overflow-x-auto pb-4 mb-4 scrollbar-hide">
                  <TabsList className="inline-flex h-12 items-center justify-start rounded-full bg-background border border-border/50 p-1 text-muted-foreground w-auto">
                    {categorized_tools.map((category) => (
                      <TabsTrigger
                        key={category.slug}
                        value={category.slug}
                        className="rounded-full px-6 py-2 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {categorized_tools.map((category) => (
                  <TabsContent value={category.slug} key={category.slug} className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.tools.map((tool) => (
                        <Link
                          href={`/scout/tools/${tool.slug}`}
                          key={tool.slug}
                          className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/30"
                        >
                          {/* Image Container */}
                          <div className="aspect-[16/9] w-full overflow-hidden bg-muted relative">
                            {tool.coverImage ? (
                              <Image
                                src={tool.coverImage}
                                alt={tool.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/30">
                                <FolderOpen className="w-10 h-10 opacity-20" />
                              </div>
                            )}
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />
                          </div>

                          {/* Content */}
                          <div className="flex flex-1 flex-col p-5">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h3 className="text-xl font-bold tracking-tight text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                {tool.name}
                              </h3>
                              <Badge variant="default_light" className="shrink-0 text-[10px] h-5">
                                {category.name}
                              </Badge>
                            </div>

                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                              {tool.description}
                            </p>

                            <div className="flex items-center text-xs font-medium text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                              View Details <ArrowRight className="ml-1 w-3 h-3" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </Suspense>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
              Why Nexo Scout?
            </h2>
            <p className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Built for the modern creator economy
            </p>
            <p className="text-lg text-muted-foreground">
              We stripped away the noise. No ads, no fluff—just the tools you need to build faster and better.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-8 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm transition-colors hover:bg-card/60 hover:border-primary/20 group"
              >
                <div className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                  <feature.icon className="w-24 h-24 rotate-12" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {feature.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}