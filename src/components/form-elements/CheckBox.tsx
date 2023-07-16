import styled, { keyframes } from 'styled-components'

const ScaleOut = keyframes`
from{
    transform:scale(1)
}
to{
    transform:scale(0)
}`

const Checkbox = styled.input.attrs({ type: 'checkbox' })<{
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'xs'
}>`
--checkbox-width: ${(props) => {
    if(props.size === undefined) return '1.25rem'
    switch (props.size) {
        case 'sm':
            return '1rem'
        case 'md':
            return '1.25rem'
        case 'lg':
            return '1.5rem'
        case 'xl':
            return '1.75rem'
        case 'xs':
            return '0.875rem'
        default:
            return '1.25rem'
    }
}};
width: var(--checkbox-width,1.75rem);
height: var(--checkbox-width,1.75rem);
position: relative;
background: var(--form-checkbox-bg);
border: none;
border-radius: 0.25rem;
transition: .3s;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
margin: 0;
aspect-ratio: 1;
cursor: pointer;
box-shadow: inset 0 0 0 2px var(--form-checkbox-border);
margin-inline:0.5rem;
&::before {
    position: absolute;
    left:50%;
    top:50%;
    translate:-50% -35%;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18px' height='18px' fill='none' stroke-width='2px' stroke='white' stroke-linecap='round' viewBox='0 0 21 21'%3E%3Cpolyline points='5 10.75 8.5 14.25 16 6'%3E%3C/polyline%3E%3C/svg%3E");
    transform: scale(1);
    z-index:2;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background: var(--form-caret);
    border-radius: inherit;
    box-shadow: var(--form-checkbox-shadow) 0 4px 9px -4px;
    transition: .2s;
    z-index:1;

  }
  &:hover {
    box-shadow: inset 0 0 0 2px var(--form-caret);

  }
  &:not(:checked)::before {
    animation: ${ScaleOut} .1s .2s linear forwards;
  }
  
  &:not(:checked)::after {
    transform: scale(0)
  }
  
  &:disabled {
    --checkbox-bg: var(--form-disabled-bg);
    --checkbox-checked-bg: var(--form-disabled-checked-bg);
    cursor: not-allowed
  }
  &:indeterminate::after {
    transform: scale(.5)
  }
`


export default Checkbox