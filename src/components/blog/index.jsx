export { NavBar } from "./navbar";
export { AllArticles } from "./main";
export { PostPageHero,HomePageHero } from "./hero";
export { SideBar  } from "./sidebar";
export { Article } from "./article";
export { PostCard } from "./postCard";

import styled from "styled-components";
import { SidebarWrapper  } from "./sidebar";

export const Wrapper = styled.main`
    width:100%;
    max-width:var(--max-width);
    margin-inline:auto;

    padding: 2rem 1rem;

    @media (max-width:1000px){
        flex-direction:column;
    }
    &:has(> ${SidebarWrapper}){
        display:flex;
        justify-content:space-between;
        align-items:flex-start;
        gap:1rem
    }
`;