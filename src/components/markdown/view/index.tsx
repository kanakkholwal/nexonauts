"use client";
import ReactMarkdown, { type Options } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export { defaultOptions } from "./options";

export default function MarkdownView({
  children,
  className,
  ...options
}: {
  children: string;
  className?: string;
  options?: Options;
}) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, remarkGfm, rehypeHighlight]}
      // className={className}
      {...options}
    >
      {children}
    </ReactMarkdown>
  );
}
