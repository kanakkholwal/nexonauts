import styled from 'styled-components';


import Input from "./Input";

const InputWrapper = styled.div`
display:grid;
grid-auto-flow: column;
margin-inline: auto;
grid-template-columns: 1fr auto;
${Input}{
    margin-bottom:0;
}
`
const IconWrapper = styled.div`
display:flex;
align-items: center;
justify-content: center;
padding:0.5rem 0.75rem;
`


export default function InputWithIcon({ icon, ...props }) {



    return (
        <InputWrapper>
            <Input  {...props} />
            <IconWrapper>
                {icon}
            </IconWrapper>
        </InputWrapper>
    )
}