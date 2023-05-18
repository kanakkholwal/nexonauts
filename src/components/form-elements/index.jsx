import input from "./Input";
import textarea from "./TextArea";
import select from "./Select";
import label from "./Label";
import checkbox from "./CheckBox";
import formElement from "./FormElement";
import formHelper from "./FormHelper";
import fileInput from "./FileInput";
import passwordInput from "./PasswordInput";
import inputWithIcon from "./InputWithIcon";
import styled from "styled-components";
import formAlert from "./FormAlert";
export const FormGroup = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: flex-start;
gap: 1rem;
flex-wrap: wrap;
`;

export {Switch} from "./Switch";
export const FormElement = formElement;
export const FormHelper = formHelper;
export const FormAlert = formAlert;
export const Label = label;

export const Input = input;
export const CheckBox = checkbox;

export const PasswordInput = passwordInput;
export const TextArea = textarea;
export const Select = select;
export const FileInput = fileInput;
export const InputWithIcon = inputWithIcon;