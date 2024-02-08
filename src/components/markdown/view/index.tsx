"use client";
import ReactMarkdown, { Options } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';


export default function MarkdownView({ children, options, ...props }: { children: string | null | undefined, options?: Options }) {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]} {...options}>
            {children}
        </ReactMarkdown>
    )
}