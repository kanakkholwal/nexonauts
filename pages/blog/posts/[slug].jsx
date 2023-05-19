import axios from "axios";
import { Interweave } from 'interweave';

export async function getStaticPaths() {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/all`);

  const paths = response?.data?.posts?.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/${params.slug}`);

  if (!response?.data?.post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: response?.data?.post,
    },
    revalidate: 10, // Revalidate the page every 10 seconds
  };
}

export default function Post({ post }) {
  return (
    <div className="BlogPost">
      <p>{post?.slug}</p>
      <Interweave content={post.content}/>
    </div>
  );
}
