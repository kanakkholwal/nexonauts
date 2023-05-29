import styled from 'styled-components';

const Button = styled.button`
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:0.25rem;
  user-select: none;
  border: 0;
  margin: 0.25rem;
  transition: all .25s cubic-bezier(.075,.82,.165,1);
  font-family: var(--btn-font,inherit);
  font-weight: 600;
  letter-spacing:0.0625rem;
  padding:var(--btn-padding-y,0.5rem) var(--btn-padding-x,1.25rem);
  line-height:var(--btn-line-height,1.75);
  color:var(--btn-text,#fbfbfb);
  background:var(--btn-bg,var(--theme));
  border: 2px solid var(--btn-border,var(--theme));
  box-shadow:var(--btn-box-shadow,0 4px 9px -4px rgba(var(--theme-rgb), 0.8));
  border-radius: var(--btn-border-radius,0.5rem);
  text-align: center;
  
  &:hover{
    box-shadow: var(--btn-hover-box-shadow,0 4px 9px -4px rgba(var(--theme-rgb), 0.8));
    color:var(--btn-hover-text,var(--btn-text));
    background:var(--btn-bg,var(--theme));
    border-color:var(--btn-border-hover,var(--theme));
  }
  ${props => props.rounded ? `
  --btn-border-radius:2rem;
  ` : ``}
  ${props => props.pill ? `
  --btn-border-radius:10rem;
  ` : ``}
  ${props => props.nature ? `
    --btn-bg:rgba(var(--${props.nature}-rgb), 1);
    --btn-box-shadow: 0 4px 9px -4px rgba(var(--${props.nature}-rgb), 0.8);
    --btn-hover-bg:rgba(var(--${props.nature}-rgb), 0.95);
    --btn-border:rgba(var(--${props.nature}-rgb), 0.95);
    --btn-border-hover:rgba(var(--${props.nature}-rgb), 0.95);
  ` : ``}
  ${props => props.outlined ? `
    --btn-text:rgba(var(--${props.nature || "theme"}-rgb), 1);
    --btn-hover-text:var(--btn-text,#fbfbfb);
    --btn-bg:none;
    --btn-box-shadow: none;
    --btn-hover-bg:rgba(var(--${props.nature || "theme"}-rgb), 1);
    --btn-hover-box-shadow:none;
  ` : ``}
  ${props => props.level ? `
    --btn-text:rgba(var(--${props.nature || "theme"}-rgb), 1);
    --btn-hover-text:rgba(var(--${props.nature || "theme"}-rgb), 1);
    --btn-bg:rgba(var(--${props.nature || "theme"}-rgb), 0.25);
    --btn-box-shadow: none;
    --btn-hover-box-shadow: none;
    --btn-hover-bg:rgba(var(--${props.nature || "theme"}-rgb), 0.3);
    --btn-border:transparent;
    --btn-border-hover:transparent;
  ` : ``
  }
  
  ${props => props.size ? `
  --btn-padding-y:var(--${props.size || "normal"}-btn-padding-y,0.75rem);
  --btn-padding-x:var(--${props.size || "normal"}-btn-padding-x,1.5rem);
  --btn-line-height:var(--${props.size || "normal"}-btn-line-height,1.75);
  --btn-border-radius:var(--${props.size || "normal"}-btn-border-radius,0.5rem);
  ` : ``
  }
  ${props => props.low ? `
  --btn-box-shadow: none;
  --btn-hover-box-shadow: none;
  ` : ``
  }
  
      
  &> svg{
  font-size: inherit;
  line-height: inherit;
  color: currentColor;
}

opacity:${props => props.disabled ? "0.5" : "1"};
pointer-events:${props => props.disabled ? "none" : "all"};
cursor:${props => props.disabled ? "not-allowed" : "pointer"};

`;
const ButtonWithIcon = styled(Button) 
`
padding-inline:0.5rem;
user-select: none;
&>svg{
  font-size: inherit;
  line-height: inherit;
  color: currentColor;
}
${({direction}) =>{
  direction ? `
  flex-direction:row-reverse;`
  :
  `
  flex-direction:row;
  `
}}
@media (max-width:${({breakpoint}) => breakpoint ? breakpoint : "768px"}){
  &>span{
    display:none;
  }
}

`;
export const ResponsiveButton = ({icon,direction, children,...props }) => {
  return (
    <ButtonWithIcon direction={direction} {...props}>
      {icon}
      <span>
        {children}
      </span>
    </ButtonWithIcon>
    )

}


export default Button;