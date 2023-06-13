import axios from 'axios';
import { useEffect,useState } from 'react';
import { NavBar, PostPageHero, Article, Wrapper, SideBar } from 'components/blog';
import { registerView } from 'lib/analytics';
import { NextSeo } from 'next-seo';
import { Post } from 'types/post';

export async function getStaticPaths() {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/all`);
        const paths = data.posts?.map((post: Post) => ({
            params: {
                slug: post.slug,
            },
        }));

        return {
            paths,
            fallback: true,
        };
    } catch (error) {
        console.log("Error during path generation:", error);

        return {
            paths: [],
            fallback: true,
        };
    }
}

export async function getStaticProps({ params }) {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/${params.slug ?? ""}`);

        const post: Post = data.post;
        if (!(post?.title && post?.description && post?.image && post?.content && post?.slug)) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                post,
            },
            revalidate: 10,
        };
    } catch (error) {
        console.log("Error during page generation using slug:", error);
        return {
            notFound: true,
            props: {
                post: null,
              },
            revalidate: 60,
        };
    }
}

export default function Post(
    { post }
        : {
            post: Post
        }
) {
    const  [isClapped, setIsClapped] = useState(false);
    const clapThePost = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/${post?._id}/clap`);
        } catch (error) {
            console.log("Error during clapping the post:", error);
        }
    }

    useEffect(() => {
        registerView({ title: post?.title, type: 'article', slug: `/blog/posts/${post?.slug}` ,postId: post?._id});
    
        const clappedPosts = JSON.parse(localStorage.getItem('clappedPosts') ?? '[]');
        if (clappedPosts.includes(post?._id)) {
            setIsClapped(true);
        }
        if (!isClapped) {
            clapThePost();
            setIsClapped(true);
            const clappedPosts = JSON.parse(localStorage.getItem('clappedPosts') ?? '[]');
            clappedPosts.push(post?._id);
            localStorage.setItem('clappedPosts', JSON.stringify(clappedPosts));
        }
        
    }, []);
    const isFallback = !post;
    if (isFallback) {
        return (
            <div className='Blog'>
                <NavBar />
                <PostPageHero title='Loading...' description='Loading...' />
                <Wrapper>
                    <Article post={post} />
                    <SideBar />
                </Wrapper>
            </div>
        );

    }
    return (
        <div className='Blog'>
            <NextSeo
                title={post?.title}
                description={post?.description}
                canonical={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/blog/posts/${post?.slug}`}
                openGraph={{
                    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/blog/posts/${post?.slug}`,
                    title: post?.title,
                    description: post?.description,
                    images: [
                        {
                            url: post?.image,
                            width: 800,
                            height: 600,
                            alt: post?.title,
                            type: 'image/png',
                        },
                        {
                            url: post?.image,
                            width: 900,
                            height: 800,
                            alt: post?.title,
                            type: 'image/png',
                        },
                    ],
                    siteName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
                }}
                twitter={{
                    handle: '@kanakkholwal',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />
            <NavBar />
            <PostPageHero title={post?.title} description={post?.description} />
            <Wrapper>
                <Article post={post} />
                <SideBar />
            </Wrapper>
        </div>
    );
}
