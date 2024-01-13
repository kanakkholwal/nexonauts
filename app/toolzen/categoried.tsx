"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

export function Categorized({ categorized_tools }: { categorized_tools: any[] }) {
    return (<Tabs defaultValue={categorized_tools[0].slug} className="w-full min-h-96  mx-auto py-10 px-4 sm:px-12 xl:max-w-7xl xl:px-0 flex flex-col lg:flex-row items-stretch justify-between gap-4">
        <div className="w-full max-w-96 h-full">
            <h2 className="text-2xl font-bold mb-4">
                Browse Popular  Categories
            </h2>
            <TabsList className="flex flex-col gap-2 p-4 h-full mt-5 bg-transparent">
                {categorized_tools.map((category) => (
                    <TabsTrigger key={category.slug} value={category.slug} className="bg-transparent dark:hover:text-slate-600 dark:hover:bg-slate-100 justify-start text-lg font-semibold py-1 px-3 rounded-md  w-full ">
                        {category.name}
                    </TabsTrigger>
                ))}
            </TabsList>
        </div>
        <div className="w-full lg:px-3">
            {categorized_tools.map((category) => {
                return <TabsContent key={category.slug} value={category.slug} className="w-full bg-transparent">
                    <h2 className="text-2xl font-bold mb-2">
                        {category.name}
                    </h2>
                    <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.tools.map((tool) => {
                            return <Link href={`/toolzen/tools/${tool.slug}`} key={tool.slug} className="flex flex-col gap-4 items-start  p-4 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800">
                                <div className="flex flex-col gap-1 shrink ">
                                    <h3 className="text-lg font-semibold">{tool.name}</h3>
                                    <p className="text-slate-600 text-md font-medium line-clamp-2">{tool.description}</p>
                                </div>
                                <Image src={tool.coverImage} alt={tool.name} height={128} width={320} className="max-h-32 object-cover  rounded-lg  w-full mx-auto mt-auto" />
                            </Link>
                        })}
                    </div>
                </TabsContent>
            })}

        </div>

    </Tabs>)

}