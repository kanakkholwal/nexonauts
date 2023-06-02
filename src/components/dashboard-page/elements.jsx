import styled from 'styled-components';
import { Card } from "components/Card"

export const Header = styled.div`
padding:0.75rem;
border-radius: 0.625rem;
background: #fff;
display: flex;
align-items: center;
width:${({width}) => width ? width : 'auto'};
justify-content: ${({align}) => align ? align : 'space-between'};
gap:0.75rem;
margin-bottom: 1rem;
font-size:100%;
svg{
    margin-inline:0.5rem;
}
`;

export const DashCard = styled(Card)`
max-width:${({width}) => width ? width : '350px'};
flex:1 1 auto;
display:flex;
align-items:center;
justify-content:space-between;
flex-direction:row;
gap:0.75rem;
padding:1.5rem 1.5rem;
background:var(--card-bg);
${'' /* box-shadow:var(--card-shadow-single); */}
span{
    font-size:1rem;
    font-weight:500;
    letter-spacing:0.025rem;
    margin:0;
    color:rgba(var(--text-rgb),0.6);
}
`;
export const Icon = styled.div`
color:rgba(var(--text-rgb),0.9);
display:inline-flex;
align-items:center;
justify-content:center;
border-radius:0.5rem;
aspect-ratio:1;
max-width:120px;
max-height:60px;
svg{
    font-size:48px;
    margin:auto;
    aspect-ratio:1;
}
`;

export const AnalyticCard = styled(Card)`
width:max-content;
max-width:100%;
flex:1 1 auto;
--padding:1.5rem;
padding:var(--padding);

${({maxWidth}) =>{
    if(maxWidth){
        return `
        max-width:calc(${maxWidth} + var(--padding) * 2);
        `
    }
}}
${({maxHeight}) =>{
    if(maxHeight){
        return `
        max-height:calc(${maxHeight} + var(--padding) * 2);
        `
    }
}}
`;