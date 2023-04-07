import styled from 'styled-components';
import FormHelper from "./FormHelper";
import Input from "./Input";
import FormAlert from "./FormAlert";
import Label from "./Label";
import Checkbox from "./CheckBox";
import { SelectWrapper } from "./Select";
import { PasswordWrapper } from "./PasswordInput";
import { TextAreaStyled } from "./TextArea";

const FormElement = styled.div`

    display: flex;
    align-items: ${({ align }) => align || "flex-start"};
    flex-direction: column;
    margin: 0.25rem 0.5rem 1.25rem;
    flex:auto;
    ${Label},label {
      order: 1;
      display:flex;
    }
  
    &:has(>${Checkbox}){
      flex-direction: row;
      align-items: center;
      ${Checkbox} {
        margin-right: 0.5rem;
        order: 1;
    }
  }
  
    ${Input},${TextAreaStyled},
    textarea,input,select,${SelectWrapper},${PasswordWrapper} {
      order: 2;
      display:flex;
    }

  
    ${Input},${TextAreaStyled},
  textarea,input,select,${SelectWrapper},${PasswordWrapper} {
      order: 2;
      display:flex;
    }
  
  
    ${FormAlert} {
      order: 3;    
    }
    ${FormHelper} {
      order: 3;    
      &:has(~${FormAlert})~${FormAlert} {
          margin-top:0.5rem;
          order: 4;    
    }
      
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
  ${props => props.floating && props.outlined ? `
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