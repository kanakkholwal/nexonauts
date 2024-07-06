"use client";

import Image from "next/image";
import Link from "next/link";

import { AiOutlineFieldTime } from "react-icons/ai";

export default function PostHeader({
  title,
  image,
  author,
  publishedAt,
  readTime,
}: {
  title: string;
  image: string;
  publishedAt: string;
  readTime?: string;
  author: {
    name: string;
    profileURL: string;
    user?:
      | {
          _id?: string;
          name?: string;
          profileURL?: string;
        }
      | string
      | null;
  };
}) {
  return (
    <>
      <div className="w-full max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-24">
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
            <h1 className="text-4xl font-bold leading-tight text-slate-800 text-balance">
              {title}
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-2">
                <Image
                  src={author.profileURL}
                  height={120}
                  width={120}
                  alt={author.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-md font-semibold leading-none text-slate-600">
                  {author.name}
                </span>
              </div>
              <span className="text-sm font-medium leading-none text-slate-600">
                on {new Date(publishedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-2"></div>
              <span className="text-sm font-medium leading-none text-slate-600 flex items-center gap-1">
                <AiOutlineFieldTime className="inline-block h-4 w-4" />{" "}
                {readTime}
              </span>
            </div>
          </div>
          <div className="p-4">
            <Image
              src={image}
              height={400}
              width={600}
              alt={title}
              className="h-auto w-full max-w-[38rem] rounded-3xl shadow-md shadow-slate-300"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
