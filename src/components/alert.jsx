import styled from "styled-components";


const Alert = styled.div`
flex:auto;
width: 100%;
padding:0.5rem 0.865rem;
border-radius: 0.5rem;
transition: all 0.3s ease-in-out;
font-weight: 600;
font-size: 100%;
letter-spacing:0.0625rem;
background:${props => props.nature ? `rgba(var(--${props.nature}-rgb),0.2);` : `rgba(var(--theme-rgb),0.2)`};
color:${props => props.nature ? `rgba(var(--${props.nature}-rgb),1);` : `rgba(var(--theme-rgb),1)`};
${props => props.open ? `
    opacity:1;
    transform:scale(1);
    ` : `
    opacity:0;
    transform: scale(0);
    `
    }
`;

export default Alert;