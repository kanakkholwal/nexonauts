import { Metadata } from "next"
import ToolComponent from "./tool"


export const tool = {
    title: "JSON Minifier Tool",
    description: "Online JSON Minifier takes any form of json code and make it minified,compressed by removing white spaces, newlines, indentation ,etc. It reduces file size and optimizes json for your request.",
    categories: ["Web Tools"],
    id: "json-minifier-tool",
}

export const metadata: Metadata = {
    title: tool.title + " | Dev Tools",
    description: tool.description,
    // image: tool.image,
    // url: tool.url,
    // type: tool.type,
    // keywords: tool.keywords,
}


export default function MetaTagGenerator() {

    return (<>

        <section id="hero" className="relative mb-16 flex flex-col items-center justify-center text-center bg-cover bg-center bg-no-repeat py-32 backdrop-blur-xl">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>

            <h1 className="text-4xl font-bold mb-2">
                {tool.title}
            </h1>
            <p className="text-slate-600 font-semibold line-clamp-3">
                {tool.description}
            </p>

        </section>
        <div >
            <ToolComponent />
        </div>
    </>)
}