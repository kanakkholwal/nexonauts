
import { calculateReadTime } from "lib/scripts";
import Markdown from 'markdown-to-jsx';
import { CodeBlockMarkdown } from "src/components/blog/codeRender";
import PostHeader from "./post-header";
import { SideBar } from "./sidebar";

export default function PostPage({ post }) {
    console.log(post);

    return (
        <>
            <PostHeader title={post.title} image={post.image} author={post.author} publishedAt={post.publishedAt} readTime={calculateReadTime(JSON.stringify(post?.content)) + " read"} />
            <div className="px-4 lg:px-8 pt-8 bg-white dark:bg-slate-800">
                <main className="w-full max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-24 flex justify-around items-start gap-4 flex-row">
                    {/* <div className="flex-1 flex items-center justify-between gap-2 my-2 p-2">
                        Some dynamic content
                    </div> */}
                    <article className="ArticleBody">
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
                <SideBar />
                </main>
            </div>

        </>
    )
}