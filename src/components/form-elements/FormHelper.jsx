import styled from 'styled-components';
const FormHelper = styled.div`
margin-left: 0.25rem;
margin-bottom: 0.25rem;
color: rgba(var(--text-color), 0.5);
font-weight: 500;
font-size:75%;
order: 3; 
&:empty{
    margin: 0;
}   
`;
export default FormHelper;