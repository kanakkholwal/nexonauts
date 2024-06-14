import Link from "next/link";
import { getHomePagePosts } from "src/lib/blog/actions";
import NewLetter from "./components/newsletter";
import { PostCard } from "./components/post-card";

export const revalidate = 60;

export default async function BlogPage() {
  const { posts } = await getHomePagePosts();

  return (
    <div className="w-full space-y-20 my-20">
      <section id="hero" className="text-center py-24 px-5 md:px-20">
        <h1 className="text-5xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to our Blog
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Get the latest news and updates from our blog
        </p>
      </section>
      <section
        id="posts"
        className="grid md:auto-rows-auto grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl mx-auto"
      >
        {posts.map((post, i: number) => (
          <Link href={`/blog/articles/${post.slug}`} key={i}>
            <PostCard post={post} />
          </Link>
        ))}
      </section>

      <NewLetter />
    </div>
  );
}
