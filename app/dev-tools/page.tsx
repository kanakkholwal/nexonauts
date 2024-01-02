"use client";

import {
    ToolCard
} from "./components/tool-card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FAQs } from "./faqs";
import bgImage from "./hero.png";
import { allDevTools } from "./list";



export default function Tools() {




    return (
        <>
            <section id="hero" className="relative mb-16 flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat py-32 backdrop-blur-xl"
                style={{ backgroundImage: `url(${bgImage.src})` }}>
                <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
                </div>
                <div className="absolute inset-inline-0 -bottom-12 bg-white lg:shadow-lg rounded-xl py-8 px-10">
                    <h1 className="text-4xl font-bold mb-2">Developer Tools</h1>
                    <p className="text-slate-600 font-semibold line-clamp-3">
                        A collection of tools that I have made to make your developer life easier.
                    </p>
                    <div className="flex space-x-2 mt-4">
                        <Input placeholder="Search dev tools curated from open source projects ..." variant="fluid" className="border-2" rounded="full" />
                        <Button>Search</Button>
                    </div>
                </div>
            </section>
            <div className="w-full grow grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5">

                {allDevTools.map((tool, index) => {
                    return <ToolCard  {...tool} index={index} style={{ animationDelay: (0.1 * index) + "s" }} key={index} />
                })}
            </div>
            <FAQs />

        </>
    )
}