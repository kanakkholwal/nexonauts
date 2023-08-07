import styled from 'styled-components';
import Checkbox from './CheckBox';

const Label = styled.label<{
    sm?: boolean;
    lg?: boolean;
}>`
margin-bottom: 0.25rem;
padding-left: 0.25rem;
color: var(--form-label);
align-items: center;
font-weight:500;
&:has(>${Checkbox}){
    display: inline-flex;
    align-items: center;
    cursor:pointer;
}
&:has( ~ input[required]){
    &:after{
        content: " * ";
        color: var(--danger);
        margin-left: 0.25rem;
    }
}
${({sm}) => sm ? `
font-size: 0.875rem;
line-height: 1rem;

` :""}
${({lg}) => lg ? `
font-size: 1.25rem;
line-height: 1.25rem;

` :""}
`;
export default Label;