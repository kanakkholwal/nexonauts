import axios from 'axios';
import { useEffect } from 'react';
import { NavBar, PostPageHero, Article, Wrapper, SideBar } from 'components/blog';
import { registerView } from 'lib/analytics';
import { Inter } from 'next/font/google';
import { NextSeo } from 'next-seo';

const inter = Inter({
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export async function getStaticPaths() {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/all`);
    const paths = data.posts?.map((post) => ({
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
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/${params.slug}`);

    if (!data.post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: data.post,
      },
      revalidate: 10, // Revalidate the page every 10 seconds
    };
  } catch (error) {
    console.log("Error during page generation using slug:", error);
    return {
      notFound: true,
    };
  }
}

export default function Post({ post }) {
  useEffect(() => {
    registerView({ title: post.title, type: 'article', slug: '/blog/posts/' + post.slug });
  }, []);

  return (
    <div className={inter.className}>
      <NextSeo
        title={post.title}
        description={post.description}
        canonical={process.env.NEXT_PUBLIC_WEBSITE_URL + '/blog/posts/' + post.slug}
        openGraph={{
          url: process.env.NEXT_PUBLIC_WEBSITE_URL + '/blog/posts/' + post.slug,
          title: post.title,
          description: post.description,
          images: [
            {
              url: post.image,
              width: 800,
              height: 600,
              alt: post.title,
              type: 'image/png',
            },
            {
              url: post.image,
              width: 900,
              height: 800,
              alt: post.title,
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
      <PostPageHero title={post.title} description={post.description} />
      <Wrapper>
        <Article post={post} />
        <SideBar post={post} />
      </Wrapper>
    </div>
  );
}
