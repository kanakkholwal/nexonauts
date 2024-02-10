"use client";
import ReactMarkdown, { Options } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';


export default function MarkdownView({ children, options, ...props }: { children: string | null | undefined, options?: Options }) {
    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm,rehypeHighlight]} {...options}>
            {children}
        </ReactMarkdown>
    )
}