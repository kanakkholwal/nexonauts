import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Card = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 1rem;
  margin-inline: 0.5rem;
  width: 100%;
  &:not(:last-child) {
    padding-block: 1rem;
    border-bottom: 1px solid rgba(var(--grey-rgb), 0.1);
    margin-bottom: 1rem;
  }
  .Thumbnail {
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    object-fit: cover;
    width: 80px;
    height: 80px;
  }
`;

const Author = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  img {
    border-radius: 50%;
    width: 16px;
    object-fit: cover;
  }
  .AuthorName {
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1.25rem;
    color: rgba(var(--secondary-rgb), 0.85);
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  h6 {
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5rem;
    a {
      color: var(--text-color);
      &:hover {
        color: rgba(var(--secondary-rgb), 1);
      }
    }
  }
  span {
    font-weight: 400;
    font-size: 0.8125rem;
    line-height: 1.25rem;
    color: #969696;
    &.Tag {
      letter-spacing: 0.04em;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 0.625rem;
      line-height: 1rem;
      margin-inline-end: 0.5rem;
      padding-right: 0.5rem;
      border-right: 1px solid rgba(var(--grey-rgb), 0.2);
    }
  }
`;

export default function RelatedPosts({ postId }) {
  const [related, setRelated] = useState({
    posts: [],
    loading: true,
    error: null,
  });

  const getRelatedPosts = async () => {
    try {
      const { data } = await axios.get(`/api/posts/${postId}/related`);
      setRelated({
        posts: data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setRelated({
        posts: [],
        loading: false,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    getRelatedPosts();
  }, []);

  return (
    <>
      <h5 className="my-2">Related Posts</h5>
      {related.loading ? (
        "Loading..."
      ) : related.error ? (
        "Error occurred while fetching related posts."
      ) : (<div className="d-flex justify-content-start align-items-start g-2 my-2">
        {related.posts.map((post, index) => (
          <RelatedPostsCard key={index} post={post} />
        ))}</div>
      )}
    </>
  );
}

function RelatedPostsCard({ post }) {
  return (
    <Card>
      <Body>
        <Author>
          <Image src={post.author.profileURL} width={16} height={16} alt={post.author.name} />
          <span className="AuthorName">{post.author.name}</span>
        </Author>
        <div>
          <h6 title={post.title}>
            <Link href={`/blog/posts/${post.slug}`}>{post.title}</Link>
          </h6>
          <div>
            <span className="Tag">{post.labels[0]}</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </Body>
      <Image src={post.image} width={80} height={80} alt={post.title} className="Thumbnail" />
    </Card>
  );
}
