import styled from "styled-components";
import {PostCard} from "./postCard";


const MainWrapper = styled.div`
    display:flex;
    gap:0.75rem;
    align-items:flex-start;
    justify-content:flex-start;
    flex-wrap:wrap;
    max-width:var(--max-width);
    padding:1rem;
    width:100%;
    margin-inline:auto;
    flex:1;
    display: grid;
  @media screen and (width > 1024px) {
  grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (728px <= width <= 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (576px <= width <= 728px) {
    grid-template-columns: repeat(2, 1fr);

  }
  @media screen and (width <= 576px) {
    grid-template-columns: 1fr;
    &>article{
        margin-inline:auto;
    }
  }
`;
export function AllArticles({ posts }) {
    return (
        <MainWrapper>
        {
            posts.map((post) => {
                return (
                    <PostCard key={post.slug} imageSrc={post.image} post={post} />
                )
            })
        }

        </MainWrapper>
    )
}