import styled from "styled-components";


const Skeleton = styled.div`
opacity: .7;
animation: skeleton-loading 1s linear infinite alternate;
color:transparent;
  `;
export const SkeletonDiv= styled(Skeleton)<{
    height?: number,
    border?: number
}>`
width: 100%;
height:${props => props.height ? props.height : 2}rem;
border-radius: ${props => props.border ? props.border : 0}rem;
overflow: hidden;
&:last-child {
    margin-bottom: 0;
    width: 80%;
    }
`;
export const SkeletonText = styled(Skeleton)<{
    height?: number,
    border?: number
}>`
width: 100%;
height: ${props => props.height ? props.height : 0.5}rem;
margin-bottom: .25rem;
border-radius: ${props => props.border ? props.border : 0}rem;
&:last-child {
    margin-bottom: 0;
    width: 80%;
  }
`;

export const SkeletonImg = styled(Skeleton)<{
    size?: number,
    margin?: string
}>`
width: ${props => props.size ?props.size : 50}px;
height: ${props => props.size ?props.size : 50}px;
object-fit: cover;
border-radius: 100%;
${props => props.margin ? 
`margin-${props.margin}: 1rem;
`: ``}
 `;