import styled from 'styled-components';


import Input from "./Input";

const InputWrapper = styled.div`
display:grid;
grid-auto-flow: column;
margin-inline: auto;
grid-template-columns: 1fr auto;
position: relative;
${Input}{
    margin-bottom:0;
}
`
const IconWrapper = styled.div`
display:flex;
align-items: center;
justify-content: center;
padding:0.5rem;
aspect-ratio: 1;
border-radius:25px;
right:0px;
inset-block: 0;
position: absolute;
/* transform:translateY(-50%); */
background-color:transparent;
border:none;
outline:none;
cursor:pointer;
&:hover{
    color:rgba(0, 0, 0, 0.75);
    background: rgba(var(--theme-rgb),.1);
}
`


export default function InputWithIcon({ icon,IconEvents, ...props }) {



    return (
        <InputWrapper>
            <Input  {...props} />
            <IconWrapper {...IconEvents}>
                {icon}
            </IconWrapper>
        </InputWrapper>
    )
}