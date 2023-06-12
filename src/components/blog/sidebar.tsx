import styled from "styled-components";
import axios from "axios";
import SideBarPostCard from "./sidenavPostCard";
import { useEffect, useState } from "react";

const WidgetTitle = styled.h5`
  width: 100%;
  font-size: 1.5rem;
`;

const WidgetContent = styled.div`
  width: 100%;
  padding-block: 10px;
`;

const Widget = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background: var(--card-bg);
//   box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 1px rgba(0, 0, 0, 0.06),
//     0px 1px 1px rgba(0, 0, 0, 0.08);
box-shadow: var(--card-shadow);
`;

export const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;

`;

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
      <SidebarWrapper>
        <Widget>
          <WidgetTitle>Popular Posts</WidgetTitle>
          <WidgetContent>{renderPosts(posts.popularPosts)}</WidgetContent>
        </Widget>
        <Widget>
          <WidgetTitle>Recent Posts</WidgetTitle>
          <WidgetContent>{renderPosts(posts.recentPosts)}</WidgetContent>
        </Widget>
      </SidebarWrapper>
    );
  }
  