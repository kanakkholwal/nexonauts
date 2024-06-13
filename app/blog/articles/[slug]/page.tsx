import { Skeleton } from '@/components/ui/skeleton';
import { PostHeader } from 'app/blog/components/post-header';
import { RenderPost } from 'app/blog/components/render-post';
import { SideBar } from 'app/blog/components/sidebar';
import dbConnect from 'lib/dbConnect';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { getPostBySlug, getRecentPosts } from 'src/utils/blog';

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  await dbConnect();

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
  await dbConnect();

  const { post, success } = await getPostBySlug(params.slug);
  const recentPosts = await getRecentPosts(5);
  if (!post || success === false) {
    console.log('Post not found, Slug :', params.slug);
    notFound();
  }
  console.log('post');

  return (
    <div>
      <PostHeader {...JSON.parse(JSON.stringify(post))} />
      <div className="px-4 lg:px-8 pt-8 bg-white dark:bg-slate-800">
        <main className="w-full max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-24 flex justify-around items-start gap-4 flex-col lg:flex-row">
          <Suspense
            fallback={
              <div>
                <Skeleton className="w-full h-96" />
              </div>
            }
          >
            <RenderPost post={JSON.parse(JSON.stringify(post))} />
          </Suspense>
          <Suspense
            fallback={
              <div>
                <Skeleton className="w-96 h-20" />
                <Skeleton className="w-96 h-20" />
                <Skeleton className="w-96 h-20" />
              </div>
            }
          >
            <SideBar recentPosts={recentPosts} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
