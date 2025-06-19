
import { PostCard } from 'app/blog/components/post-card'
import Link from 'next/link'
import { getPostsByAuthor } from 'src/lib/blog/actions'

interface PageProps {
    params: Promise<{
        username: string
    }>
}

export default async function AuthorPage(props: PageProps) {
    const { username } = await props.params
    const { profile, posts } = await getPostsByAuthor(username)

    if (!profile) {
        return <div>Author not found</div>
    }

    return <section className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">

        <h2 className="text-2xl md:text-3xl font-bold mb-8 pb-2 border-b border-border">
            Latest Articles by {profile.user.name}
        </h2>

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
    </section>
}