export { NavBar } from "./navbar";
export { AllArticles } from "./main";
export { PostPageHero,HomePageHero } from "./hero";
export { SideBar  } from "./sidebar";
export { Article } from "./article";
export { PostCard } from "./postCard";
export { FloatingMenu } from "./floatingMenu";

import styled from "styled-components";
import { SidebarWrapper  } from "./sidebar";
import { ArticleWrapper  } from "./article";

export const Wrapper = styled.main`
    width:100%;
    max-width:var(--max-width);
    margin-inline:auto;
    padding: 2rem 1rem;
    display:flex;
    gap:1rem;
    flex-direction:row;

   

 
    @media (1440px <= width){
        & > ${ArticleWrapper}{
            width:73%;
        }
      
      & > ${SidebarWrapper}{
        width:27%;
        }
    }
    @media (1024px <= width <= 1440px){
        & > ${ArticleWrapper}{
            width:70%;
        }
      
      & > ${SidebarWrapper}{
        width:30%;
        }
    }
    @media (width <= 1024px){
        flex-wrap:wrap;
        & > ${ArticleWrapper}{
            width:100%;
        }
      
      & > ${SidebarWrapper}{
        width:100%;
        }
    }
`;