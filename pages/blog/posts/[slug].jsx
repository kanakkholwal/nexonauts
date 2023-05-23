import axios from "axios";
import { NavBar, PostPageHero, Article, Wrapper, SideBar } from "components/blog";
import { useEffect } from "react";
export async function getStaticPaths() {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/all`);

  const paths = response?.data?.posts?.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return { paths, fallback: false };
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
  useEffect(() =>{
    const addView = async() =>{
      await axios.post("/api/pages",{
        slug:post.slug,
        type:"article",
        name:post.title,
        increase:["view"]
        })
        .then(({data}) =>{
          console.log(data.message);
        })
        .catch((error) =>{
          console.log(error);
        })
    }
    addView()

  },[])
  return (
    <>
      <NavBar />
      <PostPageHero title={post.title} description={post.description} />
      <Wrapper>
        <Article post={post} />
        <SideBar post={post} />
      </Wrapper>
    </>
  );
}
