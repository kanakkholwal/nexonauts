import styled from 'styled-components';

const getPosition = (position) => {
  switch (position) {
    case "top-right":
      return `
        top:0;
        right:0;
        transform:translate(50%,-50%);
        z-index:1;
      
      `
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
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:0.5rem;
  border: 0;
  margin: 0.25rem;
  transition: all .25s cubic-bezier(.075,.82,.165,1);
  font-weight: 600;
  font-size: 90%;
  text-transform: capitalize;
  padding:0.25rem 0.75rem;
  color:var(--badge-text,#fbfbfb);
  background:var(--badge-bg,var(--theme));
  border-radius: ${props => props.pill ? `50px` : `0.25rem`};
  text-align: center;

  ${props => props.nature ? `
    --badge-bg:rgba(var(--${props.nature}-rgb), 1);
    --badge-box-shadow: 0 4px 9px -4px rgba(var(--${props.nature}-rgb), 0.8);
    --badge-hover-bg:rgba(var(--${props.nature}-rgb), 0.95);
    --badge-border:rgba(var(--${props.nature}-rgb), 0.95);
    --badge-border-hover:rgba(var(--${props.nature}-rgb), 0.95);
  ` : ``}
 
  ${props => props.dot ? `
  border-radius: 50%;
  padding:0.5rem;
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