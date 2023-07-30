import styled from 'styled-components';
import Input from './Input';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useState } from 'react';
const PasswordInput = styled(Input)`
padding-right:2.25rem;
`
export const PasswordWrapper = styled.div`
position:relative;
width:100%;
`;
const Toggle = styled.button`
position:absolute;
top:50%;
left:auto;
border-radius:0.5rem;
right:1rem;
transform:translateY(-50%);
background-color:transparent;
border:none;
outline:none;
cursor:pointer;
&:hover{
    color:rgba(0, 0, 0, 0.75);
    background: rgba(0, 0, 0, 0.04);
}
`;


export default function _Input({ className, inputRef = null, InputClassName, ButtonClassName, ...props }) {

    const [type, setType] = useState("password");

    return (
        <PasswordWrapper className={className}>
            <PasswordInput className={InputClassName} {...props} type={type} ref={inputRef} />
            <Toggle onClick={(e) => {
                e.preventDefault();
                setType((type) => {
                    return type === "password" ? "text" : "password"
                })
            }} className={ButtonClassName}>
                {type === "password" ? <BsEye /> : <BsEyeSlash />}
            </Toggle>
        </PasswordWrapper>
    )

}