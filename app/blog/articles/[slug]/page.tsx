import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "src/lib/blog/actions";
import { CommentsSection, PostHeader, RenderPost, SideBar } from "./components";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
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

export default async function PostPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { post, success } = await getPostBySlug(params.slug);

  if (!post || success === false) {
    console.log("Post not found, Slug :", params.slug);
    return notFound();
  }

  return (
    <>
      <PostHeader
        title={post.title}
        image={post.image}
        author={post.author}
        createdAt={post.createdAt.toString()}
      />
      <main className="w-full mx-auto flex justify-around items-start gap-4 flex-col @4xl:flex-row px-4 lg:px-8 pt-8">
        <RenderPost content={post.content} />
        <SideBar
          author={post.author}
          createdAt={post.createdAt.toString()}
          content={post.content}
        />
      </main>
      <div>
        <CommentsSection />
      </div>
    </>
  );
}
