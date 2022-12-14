import styled from 'styled-components';
import Checkbox from './CheckBox';
const Label = styled.label`
margin-bottom: 0.25rem;
padding-left: 0.25rem;
color: var(--form-label);
font-weight:600;
&:has(>${Checkbox}){
    display: inline-flex;
    align-items: center;
    cursor:pointer;
}

`;
export default Label;