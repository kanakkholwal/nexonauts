import styled from "styled-components";

export const Wrapper = styled.main`
    display:flex;
    align-items:flex-start;
    justify-content:center;
    gap:1rem;
    width:100%;
    max-width:var(--max-width);
    margin-inline:auto;
`;
export { NavBar } from "./navbar";
export { PostPageHero } from "./hero";
export { SideBar } from "./sidebar";
export { Article } from "./article";
export { PostCard } from "./postCard";