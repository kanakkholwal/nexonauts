import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

const WidgetTitle = styled.h5`
width:100%;
font-size:1.5rem;
`;
const WidgetContent = styled.div`
width:100%;
padding-block:10px;
display:flex;
flex-direction:column;
justify-content:flex-start;
align-items:flex-start;
gap:0.5rem;
img{
    object-fit:cover;
    width:100%;
    height:auto;
    border-radius:10px;
    margin-bottom:10px;
}
a{
    font-size:1rem;
    font-weight:600;
    color:rgba(var(--text-rgb),0.88);
}
`;
const Widget = styled.div`
width:100%;
padding:0.75rem 0.5rem;
border-radius:0.5rem;
background:var(--card-bg);
`;


const SidebarWrapper = styled.aside`
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    gap:1rem;
    width:100%;
    flex: 1 1 auto;
    @media (min-width:1000px){
    max-width:calc(var(--max-width) * 0.25);
    }
`;

export function SideBar({ post }) {
    const [popularPosts, setPopularPosts] = useState({
        posts: [],
        loading:true,
        error:false,
    });
    const [recentPosts, setRecentPosts] = useState({
        posts: [],
        loading:true,
        error:false,
    });

    const getPopularPosts = async () => {
        await axios.post("/api/posts/popular", {
            noOfPost: 5
        }).then(({ data }) => {
                setPopularPosts({
                    posts: data.posts,
                    loading:false,
                    error:false,
                });
            })
            .catch((error) => {
                console.log(error);
                setPopularPosts({
                    posts: [],
                    loading:false,
                    error:true,
                })
            })

    }
    const getRecentPosts = async () => {
        await axios.post("/api/posts/recent", {
            noOfPost: 5
        }).then(({ data }) => {
                setRecentPosts({
                    posts: data.posts,
                    loading:false,
                    error:false,
                });
            })
            .catch((error) => {
                console.log(error);
                setRecentPosts({
                    posts: [],
                    loading:false,
                    error:true,
                    })
            })

    }

    useEffect(() => {
        // getPopularPosts();
        // getRecentPosts()
    }, [])

    return (
        <SidebarWrapper>
            <Widget>
                <WidgetTitle>Popular Posts</WidgetTitle>
                <WidgetContent>
                    {popularPosts.loading ? "Loading..." : null}
                    {popularPosts.error ? "Some Error Occurred" : null}
                    {popularPosts.posts.length > 0 ? popularPosts.posts.map((post,index) => {
                        if (index === 0) {
                            return (<div key={post._id}>
                            <Image src={post.image} alt={post.title} height={400} width={600} />
                                <a href={`/blog/posts/${post.slug}`}>{post.title}</a>
                            </div>)

                        }

                        return (<div key={post._id}>
                            <a href={`/blog/posts/${post.slug}`}>{post.title}</a>
                        </div>)
                    }) : (!popularPosts.error && !popularPosts.loading) && <div>No Posts Found!!</div>}
                </WidgetContent>
            </Widget>
            {/* <Widget>
                <WidgetTitle>Recent Posts</WidgetTitle>
                <WidgetContent>
                    {recentPosts.loading ? "Loading..." : null}
                    {recentPosts.error ? "Some Error Occurred" : null}
                    {recentPosts.posts.length > 0 ? recentPosts.posts.map((post) => (
                        <div key={post._id}>
                            <a href={`/blog/posts/${post.slug}`}>{post.title}</a>
                        </div>
                    )) : (!recentPosts.error && !recentPosts.loading) && <div>No Posts Found!!</div>}
                </WidgetContent>
            </Widget> */}
        </SidebarWrapper>)
}