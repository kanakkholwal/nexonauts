"use client";

import { ToolCard } from "./components/tool-card";

import { Input } from "@/components/ui/input";
import { FAQs } from "./faqs";
// import bgImage from "./hero.png";
import { useState } from "react";
import { allDevTools } from "./list";

import { Search } from "lucide-react";

export default function Tools() {
  const [query, setQuery] = useState("");
  const [tools, setTools] = useState(allDevTools);

  const handleSearch = (query: string) => {
    console.log("Search for:", query);
    setTools(
      allDevTools.filter((tool) => {
        return (
          tool.title.toLowerCase().includes(query.toLowerCase()) ||
          tool.description.toLowerCase().includes(query.toLowerCase()) ||
          tool.category.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  };

  return (
    <>
      <section
        id="hero"
        className="relative mb-10 flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat py-24 backdrop-blur-xl min-h-96"
        // style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 relative">
          <div className=" text-center mx-auto">
            <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight">
              Developer Tools
            </h1>
            <p className="mt-8 text-gray-700 dark:text-gray-300">
              A collection of tools that I have made to make your developer life
              easier.
            </p>
          </div>
          <div className="flex space-x-2 mt-4 relative">
            <span className="absolute left-2 top-0 bottom-0 flex items-center pl-3">
              <Search className="text-primary w-5 h-5 z-10" />
            </span>
            <Input
              placeholder="Search dev tools curated from open source projects ..."
              variant="glass"
              aria-label="Search Tools"
              id="search-tools"
              className=" px-5 py-4 text-base h-12  pl-10 w-full max-w-3xl mx-auto rounded-lg shadow"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>
      </section>
      <div className="w-full grow grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5">
        {tools.map((tool, index) => {
          return (
            <ToolCard
              {...tool}
              style={{ animationDelay: 0.1 * index + "s" }}
              key={index}
            />
          );
        })}
      </div>
      {tools.length === 0 && (
        <p className="text-center text-lg font-semibold">No tools found</p>
      )}
      <FAQs />
    </>
  );
}
