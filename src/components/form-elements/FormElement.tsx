import styled from 'styled-components';
import FormHelper from "./FormHelper";
import Input from "./Input";
import FormAlert from "./FormAlert";
import Label from "./Label";
import Checkbox from "./CheckBox";
import { SelectWrapper } from "./Select";
import { PasswordWrapper } from "./PasswordInput";
import { TextAreaStyled } from "./TextArea";

const FormElement = styled.div<{
    align?: string;
    outlined?: boolean;
    floating?: boolean;
    size?: string;
    lg?: boolean;
    sm?: boolean;
}>`

    display: flex;
    align-items: ${({ align }) => align || "flex-start"};
    &:not(:has(>input[type="checkbox"],>input[type="radio"])){
        flex-direction: column;
    }
    &:has(>input[type="checkbox"],>input[type="radio"]){
        &>${Label}, &>label {
          margin:0;
        }
    }
    margin: 0.25rem 0.5rem 1.25rem;
    flex:auto;
    &>${Label}, &>label {
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

  
    &>${Input}, &>${TextAreaStyled},
    &>textarea, &>input:not([type="checkbox"]), &>select, &>${SelectWrapper}, &>${PasswordWrapper} {
      order: 2;
      display:flex;
    }
  
  
    &>${FormAlert} {
      order: 3;    
    }
    &>${FormHelper} {
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
  ${({size}) => size === "sm" ?`
    &> ${Input},&>textarea,&>input:not([type="checkbox"])
        font-size: 0.875rem !important;
        line-height: 1rem!important;
        padding: 8px 24px 8px 8px!important;
        border-radius: 0.5rem !important;
        border-width: 1px !important;
    }
   &>${Label}{
        font-size: 0.875rem;
        line-height: 1rem;
    }
   &>${FormHelper}{
        font-size: 0.625rem;
        line-height: 0.875rem;
        margin-top: 0.25rem;
    }
    
  `:
    size === "lg" ? `
    
    
    `:``}
  
  
  
`;
export default FormElement;