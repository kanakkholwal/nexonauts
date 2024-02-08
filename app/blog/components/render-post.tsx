"use client";

import { CodeBlockMarkdown } from "src/components/blog/codeRender";
import MarkdownView from 'src/components/markdown/view';
import "./post.css";

export function RenderPost({ post }) {

    return <article className="ArticleBody">
        {typeof post?.content === "string" ?
            <MarkdownView
                options={{
                    components: {
                        pre:  (props) => <CodeBlockMarkdown {...props} />,
                    },
                }}>
                {post?.content}
            </MarkdownView>
            : <p className="text-red-600 p-7 text-xl text-center">
                Invalid type of content

            </p>}
    </article>
}