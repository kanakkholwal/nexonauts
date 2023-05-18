import styled from 'styled-components';
import Checkbox from './CheckBox';
import {Switch} from './Switch';
const Label = styled.label`
margin-bottom: 0.25rem;
padding-left: 0.25rem;
color: var(--form-label);
align-items: center;
font-weight:600;
&:has(>${Checkbox},${Switch}){
    display: inline-flex;
    align-items: center;
    cursor:pointer;
}

`;
export default Label;