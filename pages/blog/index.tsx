import { registerView } from "lib/analytics";
import { useEffect } from "react";
import { NavBar,AllArticles, HomePageHero, Article, Wrapper, SideBar } from "components/blog";
import axios from "axios";
import Footer from "components/footer";


export default function BlogHomePage({posts}) {

    useEffect(() => {
        registerView({ title: "K K UPGRADER BLOG", type: "article", slug: "/blog" })
    }, [])

    return (<>
        <NavBar />
        <HomePageHero/>
        <Wrapper>
            <AllArticles posts={posts} />
        <SideBar post={posts[0]} /> 
        </Wrapper>
        <Footer only="true" />

    </>)
}
export async function getServerSideProps() {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/posts/all`);
    const posts = response.data.posts;
    return {
        props: { posts },
    }
}