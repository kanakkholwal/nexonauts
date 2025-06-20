
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PostCard } from 'app/blog/components/post-card';
import Link from 'next/link';
import { notFound } from "next/navigation";
import { getPostsByAuthor } from 'src/lib/blog/actions';

interface PageProps {
    params: Promise<{
        username: string
    }>
}

export default async function AuthorPage(props: PageProps) {
    const { username } = await props.params
    const { profile, posts } = await getPostsByAuthor(username)

    if (!profile) {
        return notFound()
    }

    return <div className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">

        <section className="mb-12 md:mb-16 mt-5">
            <div className="flex flex-col items-center text-center gap-4">
                <Avatar className="size-24 md:size-32">
                    <AvatarImage
                        src={profile.user?.profilePicture}
                        alt={profile.user?.name || "Author"}
                        className="size-24 md:size-32"
                    />
                    <AvatarFallback>
                        {profile.username?.split("")?.[0]?.toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">
                        {profile.user?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground -mt-2">
                        @{profile.username}
                    </p>

                    <p className="text-base text-muted-foreground font-medium max-w-96">
                        <Badge>
                            {posts.length} {posts.length === 1 ? 'article' : 'articles'} published 
                        </Badge> 
                    </p>
                </div>
            </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => (
                <Link
                    href={`/blog/articles/${post.slug}`}
                    key={index}
                    className="group"
                >
                    <PostCard post={post} />
                </Link>
            ))}
        </div>
    </div>
}