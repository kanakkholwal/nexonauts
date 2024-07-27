import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "app/layouts/navbar-static";
import { Search, ShieldCheck, Star } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import dbConnect from "src/lib/dbConnect";
import PublicTool from "src/models/tool";
import { formatNumber } from "src/utils/formaters";
import illustration from "./illustration.svg";
// import Autoplay from "embla-carousel-autoplay"
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  FolderOpen,
  MonitorSmartphone,
  ScanSearch,
} from "lucide-react";
import { Tabs } from "src/components/animations/tabs";

export const metadata: Metadata = {
  title: "Nexo Scout - AI Tools, Services, and Resources",
  description:
    "Nexo Scout is a curated list of AI tools, services, and resources. Find the best AI tools for your business.",
};

const features = [
  {
    name: "Effortless Search",
    description:
      "Quickly find the tools and resources you need with our intuitive search functionality. Nexo Scout's powerful search engine makes it easy to locate the perfect solution for your projects and tasks.",
    icon: Search,
  },
  {
    name: "Curated Recommendations",
    description:
      "Explore a handpicked selection of tools and resources tailored to your specific needs and interests. Our team constantly evaluates and updates the database to ensure you have access to the best-in-class solutions.",
    icon: Star,
  },
  {
    name: "Regular Updates",
    description:
      "Stay ahead of the curve with Nexo Scout's continuous updates. We're committed to keeping our database fresh and relevant, providing you with the latest tools, services, and useful websites to enhance your workflow.",
    icon: ShieldCheck,
  },
  {
    name: "User-Friendly Interface",
    description:
      "Navigate our platform effortlessly with a user-friendly interface designed for seamless exploration. Discover new tools, services, and resources with just a few clicks, saving you time and effort in your search for productivity.",
    icon: MonitorSmartphone,
  },
  {
    name: "Comprehensive Categories",
    description:
      "Dive into an extensive range of categories tailored to your field. Whether you're a developer, designer, student, or business owner, easily navigate through specialized categories to find precisely what you need, optimizing your search experience.",
    icon: FolderOpen,
  },
  {
    name: "Interactive Filters",
    description:
      "Refine your search results with interactive filters designed to streamline your browsing experience. Sort by popularity, relevance, or newest additions, ensuring you discover the most relevant tools and resources tailored to your preferences and requirements.",
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

type CategorizedToolType = Awaited<ReturnType<typeof getCategories>>[number];

export default async function Page() {
  await dbConnect();

  const noOfTools = await PublicTool.countDocuments({
    $or: [{ status: "published" }, { status: "approved" }],
  });

  const categorized_tools = (await getCategories()) as CategorizedToolType[];

  return (
    <>
      <header>
        <Navbar />
        <div className="py-32 px-8  min-h-96  w-full flex items-center justify-between max-w-7xl mx-auto relative">
          <div className="max-w-6xl mx-auto text-left pt-5">
            <h2 className="text-4xl font-bold mb-8 text-slate-800 dark:text-slate-200 max-w-xl text-pretty">
              Discover Essential Tools & Resources with{" "}
              <span className="relative bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent  md:px-2">
                Nexo Scout
              </span>
            </h2>

            <h4 className="text-xl font-medium mb-3 text-gray-600 dark:text-slate-400 max-w-lg">
              Streamline Your Workflow with Our Comprehensive Search Engine.
            </h4>
            {/* <p className="text-base mb-4 font-semibold text-gray-600 dark:text-slate-300 max-w-lg">
                        Start Simplifying Your Work Today !!!
                    </p> */}
            <div className="flex gap-4 items-center justify-start mt-10">
              <Button size="lg" rounded="full" className="ml-0" asChild>
                <Link
                  href="/scout/browse"
                  // className="rounded-full flex items-center justify-center gap-2 font-semibold bg-primary shadow-lg text-base h-14  text-white py-3 px-6 hover:bg-primary-dark transition duration-200"
                >
                  Start Searching Now
                  <ScanSearch />
                </Link>
              </Button>
            </div>
            <p className="text-base mt-8 font-semibold text-gray-600 dark:text-slate-300 max-w-lg">
              Trusted by over 1000+ developers and businesses.
            </p>
          </div>
          <div className="hidden md:flex flex-col gap-4 items-center justify-center mt-8">
            <div
              aria-hidden="true"
              className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-10"
            >
              <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
              <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
            <Image
              src={illustration}
              height={600}
              width={600}
              alt={"Tool scout"}
              className="drop-shadow-2xl drop-shadow-primary"
            />
          </div>
        </div>
      </header>
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Unlock the Power of Nexo Scout
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              Discover How Our Platform Can Enhance Your Workflow
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
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
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="relative py-12 p-8">
                    <div className="space-y-8 mb-2">
                      <h5 className="text-lg font-bold text-gray-700 dark:text-white">
                        <feature.icon className="w-5 h-5 text-primary mr-2 inline-block" />{" "}
                        {feature.name}
                      </h5>
                    </div>
                    <p className=" text-base leading-7 text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="popular-categories" className="pb-24 sm:pb-32">
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
          <h2 className="text-3xl font-bold mb-2 text-center mx-auto">
            Browse Popular Categories
          </h2>
          <h4 className="text-lg font-semibold text-center text-gray-600 dark:text-slate-300  mx-auto mb-8">
            Explore in {formatNumber(noOfTools)}+ tools and resources
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
            <Tabs
              containerClassName="justify-center gap-4"
              contentClassName="backdrop-filter backdrop-blur-md bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50"
              tabClassName="hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
              tabs={categorized_tools.map((category: CategorizedToolType) => {
                return {
                  title: category.name,
                  value: category.slug,
                  content: (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.tools.map(
                        (tool: CategorizedToolType["tools"][number]) => {
                          return (
                            <Link
                              href={`/scout/tools/${tool.slug}`}
                              key={tool.slug}
                              className="flex flex-col gap-4 items-start  p-4 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <div className="flex flex-col gap-1 shrink ">
                                <h3 className="text-lg font-semibold">
                                  {tool.name}
                                </h3>
                                <p className="text-slate-600 text-md font-medium line-clamp-2">
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
                  ),
                };
              })}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
