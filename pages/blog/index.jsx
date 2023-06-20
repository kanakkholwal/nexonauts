import { useState, useEffect } from "react";
import { NavBar, AllArticles, HomePageHero} from "components/blog";
import axios from "axios";
import {registerView} from "lib/analytics";
import Footer from "components/footer";
import Button from "components/buttons";
import { BiDownArrowAlt } from "react-icons/bi";
import { CgSpinnerTwo } from "react-icons/cg";
import Head from "next/head";


export default function BlogHomePage({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [loading, setLoading] = useState(false);

  const fetchMorePosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts/all?page=${currentPage + 1}`);
      const newPosts = response.data.posts;
      const totalPages = response.data.totalPages;
      setCurrentPage(currentPage + 1);
      setTotalPages(totalPages);
      setPosts([...posts, ...newPosts]);
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    registerView({ title: "K K UPGRADER BLOG", type: "article", slug: "/blog" })
  }, []);

  return (
    <div className={" Blog"}>
      <Head>
        <title>K K UPGRADER BLOG</title>
        <meta name="description" content="K K UPGRADER BLOG" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/blog`} />

      </Head>
      <NavBar />
      <HomePageHero />
      <AllArticles posts={posts} />
      <div className="d-flex justify-content-around align-items-center">
        {currentPage === totalPages ? <>No More Posts !!!</>
        :<Button nature="blog-theme" fill="true" onClick={fetchMorePosts}>
          {loading ? <> <CgSpinnerTwo style={{
            animation: "spinner 1s linear infinite",
          }}/> Loading...</> : <><BiDownArrowAlt /> Load More </>}
        </Button>}
        </div>
      <Footer only="true" />
   
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/all`);
    const initialPosts = response.data.posts;
    return {
      props: { initialPosts },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { initialPosts: [] },
    };
  }
}
