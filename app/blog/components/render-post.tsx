"use client";

import Markdown from 'markdown-to-jsx';
import { CodeBlockMarkdown } from "src/components/blog/codeRender";
import "./post.css";

export function RenderPost({ post }) {

    return <article className="ArticleBody">
        {typeof post?.content === "string" ?
            <Markdown
                options={{
                    overrides: {
                        pre: {
                            component: CodeBlockMarkdown
                        },

                    },
                }}>
                {post?.content}
            </Markdown>
            : <p className="text-red-600 p-7 text-xl text-center">
                Invalid type of content

            </p>}
    </article>
}