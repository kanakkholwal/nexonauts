import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:auto;
    margin-top:80px;
    padding:3rem 2rem;
    text-align:center;
    max-width:var(--max-width);
    margin-inline:auto;
`;


export function PostPageHero({title,description}){

    return (
        <Wrapper>
            <h1>{title}</h1>
            <p>{description}</p>
        </Wrapper>
        )


}
export function HomePageHero(){

    return (
        <Wrapper>
            <h1>Blog</h1>
            <p>Tech Tips and Tricks , Tutorials, News...</p>
        </Wrapper>
        )


}