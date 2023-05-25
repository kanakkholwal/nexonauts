import styled from "styled-components";

export const Wrapper = styled.main`
    display:flex;
    align-items:flex-start;
    justify-content:center;
    gap:1rem;
    width:100%;
    margin-inline:auto;
    max-width:var(--max-width);
    @media (max-width:1000px){
        flex-direction:column;
    }
`;
export { NavBar } from "./navbar";
export { AllArticles } from "./main";
export { PostPageHero,HomePageHero } from "./hero";
export { SideBar } from "./sidebar";
export { Article } from "./article";
export { PostCard } from "./postCard";