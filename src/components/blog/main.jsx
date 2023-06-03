import styled from "styled-components";
import {PostCard} from "./postCard";


const MainWrapper = styled.div`
    display:grid;
    grid-gap:0.75rem;
    grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
    max-width:var(--max-width);
    align-items:flex-start;
    justify-content:center;
    padding:1rem;
    text-align:center;
    width:100%;
    margin-inline:auto;
    flex:1;
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
                    <PostCard key={post.slug} imageSrc={post.image} post={post} />
                )
            })
        }

        </MainWrapper>
    )
}