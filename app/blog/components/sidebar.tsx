"use client";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import SideBarPostCard from "../../../src/layouts/blog/sidenavPostCard";


export function SideBar() {
    const [posts, setPosts] = useState({
      popularPosts: [],
      recentPosts: [],
      loading: true,
      error: false,
    });
  
    const getPosts = async (endpoint :string) => {
      try {
        const { data } = await axios.post(endpoint, {
          noOfPost: 5,
        });
  
        setPosts((prevPosts) => ({
          ...prevPosts,
          [endpoint.includes("popular") ? "popularPosts" : "recentPosts"]: data.posts,
          loading: false,
          error: false,
        }));
      } catch (error) {
        console.log(error);
        setPosts({
          popularPosts: [],
          recentPosts: [],
          loading: false,
          error: true,
        });
      }
    };
  
    useEffect(() => {
      getPosts("/api/posts/popular");
      getPosts("/api/posts/recent");
    }, []);
  
    const renderPosts = (postArray) => {

      return <Suspense  fallback={<div>Loading...</div>}>
        {posts.error && <div>Some Error Occurred</div>}
      {!posts.error ? postArray.map((post, index) => (
        <SideBarPostCard key={index} post={post} />
      )): postArray.length === 0 && <div>No Posts Found!!</div>}
    </Suspense>
    };
  
    return (
      <aside className="w-full lg:w-lg flex-1">
        <div className="mb-4">
          <h5 className="uppercase text-lg font-semibold ml-2">Popular Posts</h5>
          <div>{renderPosts(posts.popularPosts)}</div>
        </div>
        <div>
          <h5 className="uppercase text-lg font-semibold ml-2">Recent Posts</h5>
          <div>{renderPosts(posts.recentPosts)}</div>
       
        </div>
      </aside>
    );
  }
  