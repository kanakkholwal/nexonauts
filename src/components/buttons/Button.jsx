import styled from 'styled-components';

const Button = styled.button`
   display:inline-flex;
   user-select: none;
    border: 0;
    padding: 0.625rem 1.5rem 0.5rem;
    margin: 0.25rem;
    transition: all .25s cubic-bezier(.075,.82,.165,1);
    font-family: var(--btn-font);
    font-weight: 600;
    letter-spacing:0.0825rem;

    color:var(--btn-text);
    background:var(--btn-bg); 
    box-shadow: var(--btn-box-shadow);
    border-radius: var(--btn-border-radius);
   
    &:hover{
      color:var(--btn-hover-color);
      background:var(--btn-hover-bg);
    }


    ${props => props.nature ? `
    --btn-text:var(--btn${"-" + props.nature}-text);
    --btn-bg:var(--btn${"-" + props.nature}-bg);
    --btn-box-shadow:var(--btn${"-" + props.nature}-box-shadow);
    --btn-hover-color:var(--btn${"-" + props.nature}-hover-color);
    --btn-hover-bg:var(--btn${"-" + props.nature}-hover-bg);
     ` : ""}
      
   
   
      

`;
export default Button;