import styled from "styled-components";
import {PostCard} from "./postCard";


const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding:1rem;
    text-align:center;
    width:100%;
    margin-inline:auto;
    flex:1;
    background:var(--card-bg);
    @media (min-width:1000px){
        max-width:calc(var(--max-width) * 0.75);
    }
    .ArticleCard{
        text-align:initial;
        width:100%;
        max-width:var(--max-width);
        margin-inline:auto;
        display:block;
    }
`;
export function AllArticles({ posts }) {
    return (
        <MainWrapper>
        {
            posts.map((post) => {
                return (
                    <PostCard key={post.slug} imageSrc={post.image} {...post} />
                )
            })
        }

        </MainWrapper>
    )
}