import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Wrapper = styled.div`
width:100%;
max-width:var(--max-width);
margin-inline:auto;
`;
const CardWrapper = styled.div`
width:100%;
max-width:var(--max-width);
margin-inline:auto;
display:flex;
justify-content:flex-start;
align-items:center;
flex-wrap:wrap;
gap:0.5rem;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  background-color: var(--card-bg);
  box-shadow: var(--card-shadow);
  border-radius: 8px;
  flex: 0 1 30%;

  .Thumbnail {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    object-fit: cover;
    width: 100%;
    height: auto;
    border-bottom: 1px solid rgba(var(--grey-rgb), 0.15);
  }
`;

const Author = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  img {
    border-radius: 50%;
    width: 20px;
    object-fit: cover;
  }
  .AuthorName {
    font-weight: 500;
font-size: 0.8125rem;
line-height: 1.25rem;
padding-inline:0.5rem 1rem;
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding:1rem;
  text-align: initial;
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
    font-weight: 500;
    font-size: 0.8125rem;
    line-height: 1.25rem;
    color: #969696;
    &.Tag {
        font-weight: 600;
    font-size: 0.8125rem;
    line-height: 1.25rem;
    color: rgba(var(--secondary-rgb), 0.85);
    }
  }
  .metadata{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        margin-top: 0.5rem;
        gap: 0.5rem;
        .date{
            border-left: 1px solid rgba(var(--grey-rgb), 0.25);
            padding-left: 0.5rem;

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
        <Wrapper>
            <h4 className="my-2 text-center">Related Posts</h4>
            {related.loading ? (
                "Loading..."
            ) : related.error ? (
                "Error occurred while fetching related posts."
            ) : (<CardWrapper>
                {related.posts.map((post, index) => (
                    <RelatedPostsCard key={index} post={post} />
                ))}</CardWrapper>
            )}
        </Wrapper>
    );
}

function RelatedPostsCard({ post }) {
    return (
        <Card>
            <Image src={post.image} width={360} height={240} alt={post.title} className="Thumbnail"  />
            <Body>

                <span className="Tag">{post.labels[0]}</span>
                <div>
                    <h6 title={post.title}>
                        <Link href={`/blog/posts/${post.slug}`}>{post.title}</Link>
                    </h6>
                    <div className="metadata">
                        <Author>
                            <Image src={post.author.profileURL} width={20} height={20} alt={post.author.name} />
                            <span className="AuthorName">{post.author.name}</span>
                        </Author>
                        <span className="date">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </div>
            </Body>
        </Card>
    );
}
