import styled from 'styled-components';

const getPosition = (position) => {
  switch (position) {
    case "top-right":
      return `
        top:0;
        right:0;
        transform:translate(50%,-50%);
        z-index:1;`
      break;
    case "top-left":
      return `
        top:0;
        left:0;
        transform:translate(-50%,-50%);
        z-index:1;
        `
      break;
    case "bottom-right":
      return `
        bottom:0;
        right:0;
        transform:translate(50%,50%);
        z-index:1;
        `
      break;
    case "bottom-left":
      return `
        bottom:0;
        left:0;
        transform:translate(-50%,50%);
        z-index:1;
        `
      break;
    case "top-center":
      return `
        top:0;
        left:50%;
        transform:translate(-50%,-50%);
        z-index:1;
        `
      break;
    case "bottom-center":
      return `
        bottom:0;
        left:50%;
        transform:translate(-50%,50%);
        z-index:1;
        `
      break;
    case "center":
      return `
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        z-index:1;
        `
      break;

    default:
      return `
      top:0;
      right:0;
      transform:translate(50%,-50%);
      z-index:1;`

      break;
  }
}
const Badge = styled.span`
  display: inline-flex;
    padding: 0.125rem 0.5rem;
    align-items: center;
    gap: 0.375rem;
  align-items:center;
  justify-content:center;
  margin: 0.125rem;
  transition: all .25s cubic-bezier(.075,.82,.165,1);
  font-weight: 500;
  font-size: 90%;
  text-transform: capitalize;
  mix-blend-mode: multiply;
  background:var(--badge-bg,rgba(var(--theme-rgb),0.1));
  color:var(--badge-text,rgba(var(--theme-rgb),1));
  border: 1px solid var(--badge-border,rgba(var(--theme-rgb),0.6));
  border-radius: ${props => props.pill ? `50px` : `0.375rem`};
  text-align: center;

  ${props => props.nature ? `
    --badge-bg:rgba(var(--${props.nature}-rgb), .1);
    --badge-border:rgba(var(--${props.nature}-rgb), 0.6);
    --badge-text:rgba(var(--${props.nature}-rgb), 1);
  ` : ``}
  ${props => props.noBorder ? `
    --badge-bg:rgba(var(--${props.nature}-rgb), .1);
    --badge-border:rgba(var(--${props.nature}-rgb), 0.1);
    --badge-text:rgba(var(--${props.nature}-rgb), 1);
  ` : ``}
  ${props => props.asButton ? `
    --badge-bg:rgba(var(--${props.nature}-rgb), .85);
    --badge-border:rgba(var(--${props.nature}-rgb), 0.85);
    --badge-text:#ffffff;
  ` : ``}
 
  ${props => props.dot ? `
  border-radius: 50%;
  padding:0.5rem;
  ` : ``}
  ${props => props.rounded ? `
  border-radius: 50px;
  ` : ``}
  ${props => props.notification ? `
  position: absolute;
  ${getPosition(props.position)};

  ` : ``}
  

  
      
  &> svg{
  margin-inline: 0.5rem;
  font-size: inherit;
  line-height: inherit;
  color: currentColor;
}

`;



export default Badge;