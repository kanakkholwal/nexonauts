import styled from "styled-components";

const Wrapper = styled.div`
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