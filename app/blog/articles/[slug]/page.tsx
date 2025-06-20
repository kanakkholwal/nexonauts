import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "src/lib/blog/actions";
import { CommentsSection, PostHeader, RenderPost, SideBar } from "./components";

export const revalidate = 60;

export async function generateMetadata(props: {
  params: Promise<{
    slug: string;
  }>
}) {
  const params = await props.params
  const { post, success } = await getPostBySlug(params.slug);
  if (!post || success === false) {
    console.log("Post not found, Slug :", params.slug);
    return notFound();
  }
  const metadata: Metadata = {
    title: post.title,
    description: post.description,
  };
  return metadata;
}

export default async function PostPage(props: {
  params: Promise<{
    slug: string;
  }>
}) {
  const params = await props.params

  const { post, success } = await getPostBySlug(params.slug);

  if (!post || success === false) {
    console.log("Post not found, Slug :", params.slug);
    return notFound();
  }

  return <div className="w-full">
      <PostHeader
        title={post.title}
        image={post.image}
        author={post.author}
        createdAt={post.createdAt.toString()}
      />
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1">
            <RenderPost content={post.content} />
          </div>
          
          <div className="lg:w-80">
            <SideBar
              author={post.author}
              createdAt={post.createdAt.toString()}
              content={post.content}
            />
          </div>
        </div>
      </main>
      
      <div id="comments-section" className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <CommentsSection />
      </div>
    </div>
}
