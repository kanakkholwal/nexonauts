import Image from 'next/image';
import Link from 'next/link';

export default function SideBarPostCard({ post }) {
  return (
    <div className="w-full p-4 flex justify-around items-center gap-4">
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-1">
          <Image
            src={post.author.profileURL}
            width={16}
            height={16}
            alt={post.author.name}
          />
          <span className="inline-block font-semibold text-sm text-foreground">
            {post.author.name}
          </span>
        </div>
        <div>
          <h6 title={post.title}>
            {' '}
            <Link href={'/blog/posts/' + post.slug}>{post.title}</Link>
          </h6>
          <div>
            <span className="inline-block text-sm font-semibold">
              {post.labels[0]}
            </span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long', // Full month name (e.g., September)
                day: 'numeric', // Day of the month (e.g., 29)
                year: 'numeric', // 4-digit year (e.g., 2021)
              })}
            </span>
          </div>
        </div>
      </div>
      <Image
        src={post.image}
        width={200}
        height={120}
        alt={post.title}
        className="w-40 h-28"
      />
    </div>
  );
}
