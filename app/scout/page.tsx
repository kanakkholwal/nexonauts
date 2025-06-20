import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, VercelTabsList } from "@/components/ui/tabs";
import { Search, ShieldCheck, Star } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cache, Suspense } from "react";
import dbConnect from "src/lib/dbConnect";
import PublicTool from "src/models/tool";
import illustration from "./illustration.svg";

import { NumberTicker } from "@/components/animated/number-ticker";
import NavbarGlobal from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  FolderOpen,
  MonitorSmartphone,
  ScanSearch,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nexo Scout - AI Tools, Services, and Resources",
  description:
    "Nexo Scout is a curated list of AI tools, services, and resources. Find the best AI tools for your business.",
};

const features = [
  {
    name: "Effortless Search",
    description:
      "Nexo Scout's powerful search engine makes it easy to locate the perfect solution for your projects and tasks.",
    icon: Search,
  },
  {
    name: "Curated Recommendations",
    description:
      "Our team constantly evaluates and updates the database to ensure you have access to the best-in-class solutions.",
    icon: Star,
  },
  {
    name: "Regular Updates",
    description:
      "We're committed to keeping our database fresh and relevant, providing you with the latest tools, services, and useful websites to enhance your workflow.",
    icon: ShieldCheck,
  },
  {
    name: "User-Friendly Interface",
    description:
      " Discover new tools, services, and resources with just a few clicks, saving you time and effort in your search for productivity.",
    icon: MonitorSmartphone,
  },
  {
    name: "Comprehensive Categories",
    description:
      "Whether you're a developer, designer, student, or business owner, easily navigate through specialized categories to find precisely what you need, optimizing your search experience.",
    icon: FolderOpen,
  },
  {
    name: "Interactive Filters",
    description:
      "Sort by popularity, relevance, or newest additions, ensuring you discover the most relevant tools and resources tailored to your preferences and requirements.",
    icon: ArrowUpDown,
  },
] as {
  name: string;
  description: string;
  icon: React.ElementType;
}[];

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
  //  get 6 tools of each category
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
type CategorizedToolType = Awaited<ReturnType<typeof getCategories>>[number];

export default async function Page() {
  await dbConnect();

  const noOfTools = await PublicTool.countDocuments({
    $or: [{ status: "published" }, { status: "approved" }],
  });

  const categorized_tools = (await getCategoriesPromise()) as CategorizedToolType[];

  return (
    <>
      <header>
        <NavbarGlobal />
        <div className="py-32 px-8  min-h-96  w-full flex items-center justify-between max-w-7xl mx-auto relative">
          <div className="max-w-6xl mx-auto text-left pt-5">
            <h2 className="text-4xl font-bold mb-8 text-foreground max-w-xl text-pretty">
              Discover Essential Tools & Resources with{" "}
              <span className="relative bg-linear-to-r from-primary to-violet-600 bg-clip-text text-transparent md:px-2">
                Nexo Scout
              </span>
            </h2>

            <p className="text-lg font-medium mb-3 text-muted-foreground max-w-lg">
              Streamline Your Workflow with Our Comprehensive Search Engine.
            </p>

            <div className="flex gap-4 items-center justify-start mt-10">
              <Button size="lg" variant="rainbow" rounded="full" className="ml-0" asChild>
                <Link
                  href="/scout/browse"
                >
                  <ScanSearch />
                  Start Searching Now
                </Link>
              </Button>
            </div>
            <p className="text-sm mt-4 font-medium text-muted-foreground max-w-lg">
              Explore more than <NumberTicker value={noOfTools} suffix="+" className="mx-2 font-bold" /> tools and resources
            </p>
          </div>
          <div className="hidden md:flex flex-col gap-4 items-center justify-center mt-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-10"
            >
              <div className="blur-[106px] h-56 bg-linear-to-br from-primary to-purple-400 dark:from-blue-700" />
              <div className="blur-[106px] h-32 bg-linear-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
            <Image
              src={illustration}
              height={600}
              width={600}
              alt={"Tool scout"}
              className="drop-shadow-2xl drop-shadow-primary/20"
              draggable={false}
              priority
            />
          </div>
        </div>
      </header>
      <section id="popular-categories" className="pb-24 sm:pb-28">
        <div className="h-80 md:h-160 perspective-[1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
          <h2 className="text-3xl font-bold mb-2 text-center mx-auto" aria-label="Browse Popular Categories">
            Browse Popular Categories
          </h2>
          <h4 className="text-lg font-semibold text-center text-muted-foreground  mx-auto mb-8">
            Explore in <NumberTicker value={noOfTools} suffix="+" className="mx-2 font-bold" /> tools and resources
          </h4>
          <Suspense
            fallback={
              <>
                <Skeleton className="h-12 w-28 rounded-lg" />
                <Skeleton className="h-12 w-28 rounded-lg" />
                <Skeleton className="h-12 w-28 rounded-lg" />
              </>
            }
          >
            <Tabs defaultValue={categorized_tools[0].slug} className="w-full mx-1.5 md:mx-auto">
              <VercelTabsList
                tabs={categorized_tools.map((category: CategorizedToolType) => {
                  return {
                    label: category.name,
                    id: category.slug,
                  };
                })}
              />
              {categorized_tools.map((category: CategorizedToolType) => {
                return (
                  <TabsContent value={category.slug} key={category.slug}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.tools.map(
                        (tool: CategorizedToolType["tools"][number]) => {
                          return (
                            <Link
                              href={`/scout/tools/${tool.slug}`}
                              key={tool.slug}
                              className="flex flex-col gap-4 items-start p-4 rounded-lg border backdrop-blur-md bg-card transition-all duration-500 hover:scale-[1.05] hover:shadow-lg hover:bg-card/80 border-muted-foreground/20 hover:border-primary/50 group"
                            >

                              <div className="flex flex-col gap-1 shrink">
                                <h3 className="text-lg font-semibold">
                                  {tool.name}
                                </h3>
                                <p className="text-muted-foreground text-sm font-medium line-clamp-2">
                                  {tool.description}
                                </p>
                              </div>
                              <Image
                                src={tool.coverImage}
                                alt={tool.name}
                                height={128}
                                width={320}
                                className="max-h-32 object-cover  rounded-lg  w-full mx-auto mt-auto"
                              />
                            </Link>
                          );
                        }
                      )}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>

          </Suspense>
        </div>
      </section>
      <section className="py-24 sm:py-32" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Unlock the Power of Nexo Scout
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Discover How Our Platform Can Enhance Your Workflow
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Explore Nexo Scout's features: effortless search, curated
              recommendations, and regular updates. Streamline your workflow
              with ease and efficiency.
            </p>
          </div>
          <div className="mt-16 grid  sm:grid-cols-2 lg:grid-cols-3 lg:divide-y-0 rounded-3xl overflow-hidden divide-y">
            {features.map((feature, index) => {
              return (
                <div
                  key={"solutions_" + index}
                  className="hover:bg-card backdrop-blur"
                >
                  <div className="relative py-12 p-8">
                    <div className="space-y-8 mb-2">
                      <h5 className="text-lg font-semibold text-foreground">
                        <feature.icon className="size-5 text-primary mr-2 inline-block" />{" "}
                        {feature.name}
                      </h5>
                    </div>
                    <p className="text-sm leading-6  text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


    </>
  );
}
