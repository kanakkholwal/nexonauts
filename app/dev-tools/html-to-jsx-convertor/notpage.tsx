import { Metadata } from "next"
import ToolComponent from "./tool"


const tool = {
         title: "HTML to JSX Convertor",
        description: "The HTML to JSX Converter is a helpful tool that enables developers to seamlessly convert HTML code into JSX (JavaScript XML) syntax, commonly used in React applications. With an HTML to JSX Converter, developers can efficiently transform HTML code into JSX, ensuring the compatibility and efficiency of their React projects.",
        categories: ["Web Tools"],
        id: "html-to-jsx-convertor",
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