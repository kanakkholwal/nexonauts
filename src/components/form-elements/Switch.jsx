import { useId } from 'react';
import styled from 'styled-components';

const SwitchToggle = styled.label`
margin-bottom: 0.25rem;
padding-left: 0.25rem;
color: var(--form-label);
align-items: center;
font-weight:600;
display:inline-flex;
align-items: center;
width:${({width}) => width ? width : 'auto'};
justify-content: ${({align}) => align ? align : 'space-between'};
overflow: hidden;
box-sizing: border-box;
position: relative;
flex-shrink: 0;
z-index: 0;
vertical-align: middle;
gap:0.5rem;
cursor: pointer;
font:inherit;
`;
const SwitchSlider = styled.span`
  display:inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  width: ${({ size }) => size * 2}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: #cad0d7;
  transition: background-color 250ms ease-in-out;
&:before{
    content: '';
    position: absolute;
    inset-block: calc(${({ size }) => size }px * 0.1);
    left: calc(${({ size }) => size }px * 0.1);
    right: auto;
    width: calc(${({ size }) => size }px * 0.85);
    height: calc(${({ size }) => size }px * 0.85);
    background-color: #fff;
    border-radius: calc(${({ size }) => size }px * 0.9);
    transition: all 250ms ease-in-out;
    
  ${SwitchToggle}:hover & {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  ${SwitchToggle}:active & {
    transform: scale(0.95);
  }
}
`;
const SwitchInput = styled.input.attrs({ type: 'checkbox' })`
position: absolute;
opacity: 0;
width: 0;
height: 0;

  &:checked + ${SwitchSlider}{
    background: rgba(var(--theme-rgb),0.9);
     &::before {
        left:100%;
         transform: translateX(calc(${({ size }) => size }px * -.95));
     }
  }
`;
export function Switch({checked,size = 24,id,label,...props}) {
    const randomId = useId()


    return (<SwitchToggle htmlFor={id} {...props}>
             {label}
            <SwitchInput size={size}  id={id} ariaLabelledBy={randomId}  checked={checked}  {...props}/>
            <SwitchSlider size={size} id={randomId} role="label"/>
        </SwitchToggle>)
}
