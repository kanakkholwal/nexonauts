import styled from 'styled-components';

const Button = styled.button`
   display:inline-flex;
   align-items:center;
   user-select: none;
    border: 0;
    margin: 0.25rem;
    transition: all .25s cubic-bezier(.075,.82,.165,1);
    font-family: var(--btn-font);
    font-weight: 600;
    letter-spacing:0.0825rem;
    padding: ${props => props.size ? `var(--${props.size}-btn-padding-top) var(--${props.size}-btn-padding-x) var(--${props.size}-btn-padding-bottom)` : `var(--btn-padding-y) var(--btn-padding-x)`};
   line-height: ${props => props.size ? `var(--${props.size}-btn-line-height)` : `var(--btn-line-height)`};
  color:${props => props.outlined ? `var(--btn-bg)` : `var(--btn-text)`};
   background:${props => props.outlined ? `none` : `var(--btn-bg)`};
  box-shadow: var(--btn-box-shadow);
   border-radius: ${props => props.rounded ? `10rem` : `var(--btn-border-radius)`};
  border: 2px solid var(--btn-bg);

    &:hover{
    color:${props => props.outlined ? `var(--btn-hover-bg)` : `var(--btn-hover-color)`};
    background:${props => props.outlined ? `none` : `var(--btn-hover-bg)`};
    border-color: var(--btn-hover-bg);
   }


    ${props => props.nature ? `
    --btn-text:var(--btn${"-" + props.nature}-text);
    --btn-bg:var(--btn${"-" + props.nature}-bg);
    --btn-box-shadow:var(--btn${"-" + props.nature}-box-shadow);
    --btn-hover-color:var(--btn${"-" + props.nature}-hover-color);
    --btn-hover-bg:var(--btn${"-" + props.nature}-hover-bg);
     ` : ""
   }
      
     &> svg{
  margin-inline: 0.5rem;
  font-size: inherit;
  line-height: inherit;
  color: currentColor;
}

opacity:${props => props.disabled ? "0.5" : "1"}
pointer-events:${props => props.disabled ? "none" : "all"}
cursor:${props => props.disabled ? "not-allowed" : "pointer"}



`;
export default Button;