import { RenderPost } from 'app/blog/components/render-post';
import { SideBar } from 'app/blog/components/sidebar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRecentPosts } from 'src/lib/blog/actions';
import { PostHeader } from './components';

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
    console.log('Post not found, Slug :', params.slug);
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
  const recentPosts = await getRecentPosts(5);
  if (!post || success === false) {
    console.log('Post not found, Slug :', params.slug);
    return notFound();
  }

  return (
    <div>
      <PostHeader  />
      <div className="px-4 lg:px-8 pt-8 ">
        <main className="w-full max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-24 flex justify-around items-start gap-4 flex-col lg:flex-row">
            <RenderPost post={JSON.parse(JSON.stringify(post))} />
            <SideBar recentPosts={recentPosts} />
        </main>
      </div>
    </div>
  );
}
