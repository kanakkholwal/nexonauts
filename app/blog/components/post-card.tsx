import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PostWithId } from "src/models/post";

export function PostCard({
  post,
  className,
}: {
  post: PostWithId;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-neutral-900 dark:border-white/[0.05] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >

      <div className="relative mb-6 aspect-[370/280] w-full overflow-hidden rounded-[10px] transition-all group-hover:scale-105">
        {/* {isPro && <ProBadge />} */}
        <Link href={`/blog/articles/${post.slug}`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full object-cover rounded-lg"
          />
        </Link>
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {/* {icon} */}
        <h3>
          <Link href={`/blog/articles/${post.slug}`} className="mb-3.5 block text-xl font-bold text-dark">
            <span className="bg-gradient-to-r from-primary/20 to-primary/10 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
              {post.title}
            </span>
          </Link>
        </h3>
        <div className="font-sans font-medium text-neutral-600 text-xs dark:text-neutral-300">
          {post.description}
        </div>
      </div>
      <div className="mt-4.5 flex flex-wrap items-center justify-between gap-3">
        <Link href={`/blog/author/${post.author.username}`} className="flex items-center gap-3">
          <div className="flex h-6 w-6 overflow-hidden rounded-full">
            <Image
              src={post.author.profilePicture!}
              alt={post.author.name!}
              width={24}
              height={24}
            />
          </div>
          <p className="text-sm">{post.author.name}</p>
        </Link>
        <span className="flex h-[3px] w-[3px] rounded-full bg-dark-2" />
        <p className="text-sm">{new Date(post.updatedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}</p>
      </div>
    </div>
  );
}
