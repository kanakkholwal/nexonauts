import styled from "styled-components";


export const Card = styled.div`
    flex: 1 1 auto;
    opacity: 0;
    visibility: hidden;
    transition: all 250ms ease-in-out;
    animation-name: pop;
    animation-duration: 0.83s;
    animation-direction: normal;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    &:hover {
        translate:  0 -10px;
    }
`;
export const CardBody = styled.div`
display: flex;
justify-content: space-between;
flex-direction: column;
gap: 0.5rem;
`;
export const CardTitle = styled.h3`
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
text-transform: uppercase;
white-space: wrap;
letter-spacing: 2px;
--webkit-line-clamp: 2;
`;
export const CardDescription = styled.p`
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
-webkit-line-clamp: 3;
`;