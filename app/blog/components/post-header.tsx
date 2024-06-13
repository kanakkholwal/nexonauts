import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export function PostHeader({
  title,
  image,
  publishedAt,
  readTime,
}: {
  title: string;
  image: string;
  publishedAt: string;
  readTime?: string;
}) {
  return (
    <>
      <div className="w-full max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-24 pt-28">
        <div
          className="flex items-center justify-start gap-1 text-sm font-medium leading-none mb-10"
          itemType="https://schema.org/BreadcrumbList"
          itemScope
        >
          <Link
            href="/resources/"
            className=" text-slate-600 uppercase"
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
            itemScope
          >
            resources
          </Link>{" "}
          |
          <Link
            href="/blog/"
            className="text-primary/75 uppercase"
            itemProp="itemListElement"
            itemType="https://schema.org/ListItem"
            itemScope
          >
            blog
          </Link>
        </div>
        <div className="flex items-center  flex-row flex-wrap w-full">
          <div className="p-4 flex-1">
            <h1 className="text-4xl font-bold leading-tight text-slate-800 dark:text-slate-100 text-balance">
              <Suspense
                fallback={
                  <>
                    <Skeleton className="w-56 h-10" />
                  </>
                }
              >
                {title}
              </Suspense>
            </h1>
            <div className="flex items-center gap-2 mt-4">
              {/* <div className="flex items-center gap-2">
                            <Image src={author?.user?.profilePicture.toString()} height={120} width={120} alt={author.name} className="w-8 h-8 rounded-full" />
                            <span className="text-md font-semibold leading-none text-slate-600">
                                {author.name}
                            </span>
                        </div> */}
              <span className="text-sm font-medium leading-none text-slate-600 dark:text-slate-400">
                <Suspense
                  fallback={
                    <>
                      <Skeleton className="w-36 h-10" />
                    </>
                  }
                >
                  on{" "}
                  {new Date(publishedAt).toLocaleDateString("en-US", {
                    dateStyle: "long",
                  })}
                </Suspense>
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {/* {readTime && <span className="text-sm font-medium leading-none text-slate-600 flex items-center gap-1">
                            <AiOutlineFieldTime className="inline-block h-4 w-4" /> {readTime}
                        </span>} */}
            </div>
          </div>
          <div className="p-4">
            <Suspense
              fallback={
                <>
                  <Skeleton className="w-[38rem] h-full rounded-3xl" />
                </>
              }
            >
              <Image
                src={image}
                height={400}
                width={600}
                alt={title}
                className="h-auto w-full max-w-[38rem] rounded-3xl shadow-md shadow-slate-300 dark:shadow-none border dark:border-800"
                priority
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
