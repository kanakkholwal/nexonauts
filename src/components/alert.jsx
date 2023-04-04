import styled from "styled-components";


const Alert = styled.div`
flex:auto;
width: 100%;
padding: 1rem;
border-radius: 0.625rem;
transition: all 0.3s ease-in-out;
font-weight: 600;
font-size: 100%;
letter-spacing:0.0625rem;
background:${props => props.nature ? `var(--${props.nature});` : `#fff`};
border: 2px solid ${props => props.nature ? `var(--${props.nature});` : `#fff`};
color:${props => props.nature ? `#fff` : `var(--text-color)`};
${props => props.open ? `
    opacity:1;
    transform:rotateX(0) scale(1);
    ` : `
    opacity:0;
    transform:rotateX(-90deg) scale(0);
    `
    }
`;

export default Alert;