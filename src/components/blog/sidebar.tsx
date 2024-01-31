
import axios from "axios";
import { useEffect, useState } from "react";
import SideBarPostCard from "./sidenavPostCard";



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
      if (posts.loading) {
        return "Loading...";
      }
  
      if (posts.error) {
        return "Some Error Occurred";
      }
  
      if (postArray.length === 0 && !posts.error && !posts.loading) {
        return <div>No Posts Found!!</div>;
      }
  
      return postArray.map((post, index) => (
        <SideBarPostCard key={index} post={post} />
      ));
    };
  
    return (
      <aside className="">
        <div className="w-full p-4 rounded-lg bg-slate-50">
          <h5 className="text-lg">Popular Posts</h5>
          <div className="py-5">{renderPosts(posts.popularPosts)}</div>
        </div>
        <div className="w-full p-4 rounded-lg bg-slate-50">
          <h5 className="text-lg">Recent Posts</h5>
          <div className="py-5">{renderPosts(posts.recentPosts)}</div>
        </div>
      </aside>
    );
  }
  