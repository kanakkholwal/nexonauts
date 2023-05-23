import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const SidebarWrapper = styled.aside`
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    gap:1rem;
    width:100%;
    max-width:calc(var(--max-width) * 0.25);
`;

export function SideBar({ post }) {
    const [popularPosts, setPopularPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);

    const getPopularPosts = async () => {
        await axios.post("/api/posts/popular", {
            noOfPost: 5
        })
            .then(({ data }) => {
                setPopularPosts(data.posts);
            })
            .catch((error) => {
                console.log(error);
            })

    }
    const getRecentPosts = async () => {
        await axios.post("/api/posts/recent", {
            noOfPost: 5
        })
            .then(({ data }) => {
                setRecentPosts(data.posts);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        getPopularPosts();
        getRecentPosts()
    }, [])

    return (
        <SidebarWrapper>

                        <h5>Popular Posts</h5>
            {
              
                    <div>
                        <ul>
                            {
                                popularPosts ? popularPosts.map((post) => (
                                    <li key={post._id}>
                                        <a href={`/blog/posts/${post.slug}`}>{post.title}</a>
                                    </li>
                                )):"Loading...."
                            }
                        </ul>
                    </div>
                
            }
                        <h5>Recent Posts</h5>
            {
               
                    <div>
                        <ul>
                            {
                                recentPosts ? recentPosts.map((post) => (
                                    <li key={post._id}>
                                        <a href={`/blog/posts/${post.slug}`}>{post.title}</a>
                                    </li>
                                )):"Loading..."
                            }
                        </ul>
                    </div>
                }

        </SidebarWrapper>)
}