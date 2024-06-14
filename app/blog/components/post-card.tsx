import { PostWithId } from "src/models/post";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
      <Image
        src={post.image}
        alt={post.title}
        width={720}
        height={400}
        className="rounded-lg w-full h-auto"
      />
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {/* {icon} */}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {post.title}
        </div>
        <div className="font-sans font-medium text-neutral-600 text-xs dark:text-neutral-300">
          {post.description}
        </div>
      </div>
    </div>
  );
}
