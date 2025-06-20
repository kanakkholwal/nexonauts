import Link from "next/link";
import { getHomePagePosts } from "src/lib/blog/actions";
import { decodeHTMLEntities } from "src/utils/string";
import NewLetter from "./components/newsletter";
import { PostCard } from "./components/post-card";
export const revalidate = 60;

export default async function BlogPage() {
  const { posts } = await getHomePagePosts();
  
  // Decode HTML entities in post titles
  const decodedPosts = posts.map(post => ({
    ...post,
    title: decodeHTMLEntities(post.title)
  }));

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        id="hero" 
        className="py-16 md:py-24 px-4 sm:px-6 text-center "
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
            Welcome to our Blog
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Get the latest news, insights, and updates from our team
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {decodedPosts.slice(0, 3).map((post, index) => (
            <Link 
              href={`/blog/articles/${post.slug}`} 
              key={index}
              className={cn(
                index === 0 ? "md:col-span-2 md:row-span-2" : "",
                "group"
              )}
            >
              <PostCard 
                post={post} 
                featured={index === 0}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 pb-2 border-b border-border">
          Latest Articles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {decodedPosts.slice(3).map((post, index) => (
            <Link 
              href={`/blog/articles/${post.slug}`} 
              key={index}
              className="group"
            >
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 px-4 sm:px-6 ">
        <div className="max-w-6xl mx-auto">
          <NewLetter />
        </div>
      </section>
    </div>
  );
}

// Add this helper function if not already in your project
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}