import { PostHeader } from "app/blog/components/post-header";
import { RenderPost } from "app/blog/components/render-post";
import { SideBar } from "app/blog/components/sidebar";
import dbConnect from 'lib/dbConnect';
import { notFound } from 'next/navigation';
import { getPostBySlug } from "src/utils/blog";
import { PUBLICPostViewType } from 'types/post';


export default async function PostPage({ params }: {
    params: {
        slug: string
    }
}) {
    await dbConnect()

    const { post, success }: {
        post: PUBLICPostViewType | null,
        message: string,
        success: boolean
    } = await getPostBySlug(params.slug)
    if (!post || success === false) {
        console.log("Post not found, Slug :", params.slug)
        notFound()
    }
    console.log(post)
    return (
        <div>
            <PostHeader {...JSON.parse(JSON.stringify(post))} />
            <div className="px-4 lg:px-8 pt-8 bg-white dark:bg-slate-800">
                <main className="w-full max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-24 flex justify-around items-start gap-4 flex-row">
                    <RenderPost post={JSON.parse(JSON.stringify(post))} />
                    <SideBar />
                </main>
            </div>
        </div>
    )
}