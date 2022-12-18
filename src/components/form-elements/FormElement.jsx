import styled from 'styled-components';
import FormHelper from "./FormHelper";
import Input from "./Input";
import Label from "./Label";
import Checkbox from "./CheckBox";
import { SelectWrapper } from "./Select";
import { TextAreaStyled } from "./TextArea";

const FormElement = styled.div`

    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 0.25rem auto 1.25rem;
    
    &:has(>${Checkbox}){
      flex-direction: row;
      align-items: center;
    }
    
  
    ${Label},label {
      order: 1;
      display:flex;
    }
  
    ${Input},${TextAreaStyled},
  textarea,input,select,${SelectWrapper} {
      order: 2;
      display:flex;
    }
  
  
    ${FormHelper} {
      order: 3;    
    }
    &:has(${FormHelper}){
      &> ${Input},&>textarea{
margin-bottom:0
      }
    }
  ${props => props.outlined ? `
    position: relative;
    label {
      position: absolute;
      top: 1%;
      transition: .25s ease;
      z-index: 0;
    }
  ` : ""}
  ${props => props.floating ? `
    position: relative;
    label {
        position: absolute;
        top: 0;
        left: 0.25rem;
        z-index: 0;
        background-color: var(--form-bg-active);
        transform: translateY(0.5rem);
        padding-inline: 0.5rem;
        transition: .25s ease;
    }
  ` : ""}
   
  
  
  
  
`;
export default FormElement;