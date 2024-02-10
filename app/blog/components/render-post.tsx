"use client";
import { cn } from "@/lib/utils";
import { Check, Copy } from 'lucide-react';
import { Fira_Code } from 'next/font/google';
import React from "react";
import MarkdownView from 'src/components/markdown/view';



const monoFont = Fira_Code({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin-ext', 'latin'],
    display: 'swap',
    adjustFontFallback: false,
    variable: '--fira-code',
})
function extractTextFromNode(node) {
    if (node.type === 'text') {
        return node.value;
    } else if (Array.isArray(node.children)) {
        return node.children.map(child => extractTextFromNode(child)).join('');
    } else {
        return '';
    }
}

export function RenderCodeBlock({ children, className,node, ...props }) {
    
    const [state, setState] = React.useState<"copy" | "idle">("idle")
    const textContent = extractTextFromNode(node);

    return <pre className={cn("relative", monoFont.className, className)}>
        <button
            className={cn(
                "absolute top-2 right-2",
                "transition-all active:opacity-50  rounded-md p-1.5",
                "border  border-slate-700 bg-gray-800 hover:bg-slate-700  text-white/80  hover:text-white"
            )}
            onClick={() => {
                navigator.clipboard.writeText(textContent)
                .then(() => setState("copy"))
                setTimeout(() => setState("idle"), 1000)
            }} aria-label="Copy code">
                {state === "copy" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
        {children}
    </pre>

}

export function RenderPost({ post }) {

    const isMarkdown = typeof post?.content === "string" && post?.content.includes("```")

    return <article className="ArticleBody">
        {isMarkdown ?
            <MarkdownView
                options={{
                    components: {
                        pre: ({ children, className,node, ...props }) => <RenderCodeBlock className={cn("relative", monoFont.className, className)} node={node} {...props}>{children}</RenderCodeBlock>,
                        h1: ({ children, node, ...props }) => <h1 className="text-4xl font-bold" {...props}>{children}</h1>,
                        h2: ({ children, node, ...props }) => <h2 className="text-3xl font-bold" {...props}>{children}</h2>,
                        h3: ({ children, node, ...props }) => <h3 className="text-2xl font-bold" {...props}>{children}</h3>,
                        h4: ({ children, node, ...props }) => <h4 className="text-xl font-bold" {...props}>{children}</h4>,
                        h5: ({ children, node, ...props }) => <h5 className="text-lg font-bold" {...props}>{children}</h5>,
                        h6: ({ children, node, ...props }) => <h6 className="text-base font-bold" {...props}>{children}</h6>,
                        p: ({ children, node, ...props }) => <p className="text-lg" {...props}>{children}</p>,
                        ul: ({ children, node, ...props }) => <ul className="list-disc list-inside" {...props}>{children}</ul>,
                        ol: ({ children, node, ...props }) => <ol className="list-decimal list-inside" {...props}>{children}</ol>,
                        li: ({ children, node, ...props }) => <li className="text-lg" {...props}>{children}</li>,
                        a: ({ children, href, node, ...props
                        }) => <a href={href
                        } className="text-blue-600 hover:underline" {...props}>{children}</a>,
                        blockquote: ({ children, node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4" {...props}>{children}</blockquote>,
                        hr: () => <hr className="my-4" />,
                        img: ({ src, alt, node, ...props }) => <img src={src} alt={alt} className="w-full" {...props} />,
                        table: ({ children, node, ...props }) => <table className="w-full" {...props}>{children}</table>,
                        thead: ({ children, node, ...props }) => <thead className="bg-gray-200 dark:bg-slate-800 " {...props}>{children}</thead>,
                        tbody: ({ children, node, ...props }) => <tbody {...props}>{children}</tbody>,
                        tr: ({ children, node, ...props }) => <tr {...props}>{children}</tr>,
                        th: ({ children, node, ...props }) => <th className="border border-gray-300 dark:bg-slate-800  p-2" {...props}>{children}</th>,
                        td: ({ children, node, ...props }) => <td className="border border-gray-300 dark:bg-slate-800  p-2" {...props}>{children}</td>,
                        strong: ({ children, node, ...props }) => <strong className="font-bold" {...props}>{children}</strong>,
                        em: ({ children, node, ...props }) => <em className="italic" {...props}>{children}</em>,
                        del: ({ children, node, ...props }) => <del {...props}>{children}</del>,
                        code: ({ children, node, ...props }) => <code className="bg-gray-100 dark:bg-slate-800 p-1 rounded-md" {...props}>{children}</code>,
                        br: () => <br />,
                        sup: ({ children, node, ...props }) => <sup>{children}</sup>,
                    },
                }}>
                {post?.content}
            </MarkdownView>
            : <p className="text-red-600 p-7 text-xl text-center">
                Post content is not markdown
            </p>}
    </article>
}