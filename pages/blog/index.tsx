import axios from "axios";
import { AllArticles, HomePageHero, NavBar } from "components/blog";
import Button from "components/buttons";
import Footer from "components/footer";
import { registerView } from "lib/analytics";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BiDownArrowAlt } from "react-icons/bi";
import { CgSpinnerTwo } from "react-icons/cg";

export default function BlogHomePage({ initialPosts ,
  noOfPages,
  currentIndex,
  total
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(currentIndex);
  const [totalPages, setTotalPages] = useState(noOfPages);
  const [loading, setLoading] = useState(false);

  const fetchMorePosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts/all?page=${currentPage + 1}`, {
        headers: {
          "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`,
          'Content-Type': 'application/json'
        }
      });
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
          : <Button nature="blog-theme" fill={true} onClick={fetchMorePosts}>
            {loading ? <> <CgSpinnerTwo style={{
              animation: "spinner 1s linear infinite",
            }} /> Loading...</> : <><BiDownArrowAlt /> Load More </>}
          </Button>}
      </div>
      <Footer only="true" />

    </div>
  );
}

export async function getServerSideProps() {
  // await dbConnect();

  // const {posts,totalPages,total,currentPage} = await getHomePagePosts()

  // return {
  //   props: {
  //     initialPosts:JSON.parse(JSON.stringify(posts)) as PubliewViewPostType[] || [] ,
  //     noOfPages:totalPages || 2,
  //     total:total || 0,
  //     currentIndex:currentPage || 1
  //   }
  // }

  // // not found, return
  return {
    redirect: {
      destination: 'https://kanakkholwal.medium.com/',
      permanent: true
  }
  }


}
