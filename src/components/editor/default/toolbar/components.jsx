import styled from "styled-components";


export const Button = styled.button`
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: rgb(33, 43, 54);
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  height: 24px;
  width: 28px;
  margin: 0 2px;
  opacity: 0.8;
  &:hover,
  &.isActive {
    opacity: 1;
    color: rgba(var(--${({nature}) => nature? nature : "theme"}-rgb), 0.9);
    background: rgba(var(--${({nature}) => nature? nature : "theme"}-rgb), 0.1);
  }
  &:active,
  &.isClicked {
    opacity: 1;
    color: rgba(var(--${({nature}) => nature? nature : "theme"}-rgb), 0.9);
  }
`;

export const ToolBarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 8px;
  width:100%;
  border-bottom:1px solid rgba(145, 158, 171, 0.32);

`;
export const Span = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  &:not(:empty){
  margin-right: 0.25rem;
  padding: 0.25rem;
  }
`;

export const PopUpWrapper = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
`;
export const PopUp = styled.div`
position: absolute;
left:0;
display: flex;
align-items: center;
justify-content: center;
flex-direction:column;
flex-wrap:wrap;
top: calc(100% + 3px);
-webkit-tap-highlight-color: transparent;
background-color: rgba(var(--light-rgb), 1);
box-shadow:var(--drop-shadow);
border-radius:0.25rem;
height:min-content;
min-width:8rem;
max-width:12rem;
width:max-content;
z-index: 20;
`;
export const LinkedWrapper = styled.span`
display:inline;
cursor:pointer;
position:relative;
`;
export const LinkedContainer = styled.div`
    position: absolute;
    left: 0;
    top:calc(100% + 3px);
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 6px 10px;
    grid-gap: 10px;
    gap: 10px;
    border-radius: 6px;
    border: 1px solid #eee;
    background-color: rgba(var(--light-rgb), 1);
    box-shadow:var(--drop-shadow);
    border-radius:0.25rem;
`;
export const TableOptions = styled.div`
    position: absolute;
    left: 0;
    top:calc(100% + 3px);
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 6px 10px;
    grid-gap: 10px;
    gap: 10px;
    border-radius: 6px;
    border: 1px solid #eee;
    background-color: rgba(var(--light-rgb), 1);
    box-shadow:var(--drop-shadow);
    border-radius:0.25rem;
`;
export const TableContainer = styled.div`
overflow:auto;
position: relative;
--border-radius: 0.5rem;
overflow-x:auto;
-webkit-overflow-scrolling: touch;
scroll-behavior: smooth;

&::-webkit-scrollbar {
        display: none;
}

`;


export const EmbedWrapper = styled.div`
position:relative;
display:flex;
width:100%;
height:auto;
${({active}) =>{
  if(active){
    return `
    box-shadow:var(--drop-shadow);
    `
  }
}}
`;
export const EmbedSetting = styled.div`
position:absolute;
top:100%;
left:0;
display:flex;
align-items:center;
justify-content:center;
border:2px dashed #eee;
width:100%;
height:100%;

`;

export const ColorOptions = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap:0.25rem;
padding:0.25rem;
width:100%;
max-width:10rem;
`;
export const ColorOption = styled.div`
padding:0.5rem;
border-radius:0.25rem;
cursor:pointer;
`;
export const TableInput = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    grid-gap: 3px;
    gap: 3px;
`;
export const TableUnit = styled.div`
padding:0.5rem;
border-radius:0.25rem;
cursor:pointer;
border: 1px solid rgba(var(--mute-rgb),1);
&:hover{
  background:rgba(var(--theme-rgb),.05);
}
`;
export const ContextMenuWrapper = styled.div`
  position: fixed;
  z-index: 999;
  width: auto;
  max-width: 15rem;
  transition: all .15s cubic-bezier(0, 0, .2, 1) 0ms;
  overflow: hidden auto;
  min-height: 16px;
  max-width: calc(100% - 32px);
  outline: 0px;
  box-shadow: rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px;
  border-radius: 12px;
  max-height: 280px;
  transform: scale(0);
  transform-origin: top;
  opacity: 0;
  pointer-events:none;
  border-radius: 0.25rem;
  background: #fbfbfb;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:0.25rem;
  padding:0.25rem 0;      
  &.isOpen {
    top:var(--top);
    left:var(--left);
    transform: scale(1) translate(calc(0% + -50px),calc(-175% + 5px));
    opacity: 1;
    pointer-events:auto;

  }
  
`;
export const ContextMenuItem = styled.div`
    display: flex;
    justify-content:flex-start;
    gap:0.5rem;
    padding-block: 0.5rem;
    padding-inline: 1.5rem;
    color: rgba(0, 0, 0, 0.87);
    transition: all 0.25s ease-in-out;
    opacity: 0.85;
    box-sizing: border-box;
    white-space: nowrap;
    border-radius: 6px;
    line-height: 1.57143;
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: capitalize;
    width: 100%;
    cursor: pointer;
    margin: 0px 8px;
    svg{
      color:inherit;
    }
    
    &:is(:hover, :active ) {
      opacity:1;
      background:rgba(0,0,0,0.05);
    }

    &.isActive{
      color:var(--theme)
    }


    &:first-child {
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
    }

    &:last-child {
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }

    ${props => props.size === "sm" ? 
    `padding-block: 0.25rem;
    padding-inline: 0.75rem;
    font-size: 0.775rem;
    line-height: 1.6;
    `: ""}
`;
export const DragArea = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
padding:1rem;
width:100%;
max-width:15rem;
border-radius:0.25rem;
flex-direction:column;
background:rgba(var(--mute-bg-rgb),1);
&:hover,&:focus{
  background:rgba(var(--theme-rgb),.05);
}
h5{
  font-size:0.875rem;
  font-weight:600;
  margin-bottom:0.5rem;
  text-align:center;
}
h6{
  font-size:0.75rem;

}
`;
export const InputWrapper = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap:0.25rem;
padding:0.25rem 0.5rem;
width:100%;
max-width:15rem;
`;
export const TabHeader = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap:0.25rem;
padding:0.25rem;
width:100%;
`;
export const TabButton = styled.button`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: rgb(33, 43, 54);
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight:600;
  margin: 0 2px;
  opacity: 0.8;
  &:hover,
  &.isActive {
    opacity: 1;
    color: rgba(var(--${({nature}) => nature? nature : "theme"}-rgb), 0.9);
    background: rgba(var(--${({nature}) => nature? nature : "theme"}-rgb), 0.1);
  }
  &:active,
  &.isClicked {
    opacity: 1;
    color: rgba(var(--${({nature}) => nature? nature : "theme"}-rgb), 0.9);
  }
`;
export const ActionButton = styled.button`
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
  font-size: var(--btn-font-size,0.875rem);
  padding:0.25rem .5rem;
  color:var(--btn-text,#fbfbfb);
  background:var(--btn-bg,var(--theme));
  border-radius: 0.25rem;
  text-align: center;
  
  &:hover{
    color:var(--btn-hover-text,var(--btn-text));
    background:var(--btn-bg,var(--theme));
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