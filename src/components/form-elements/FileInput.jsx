import styled from 'styled-components'
import { MdFileUpload } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';



const Icon = styled.div`
width:auto;
border-left:0;
padding:0.5rem 0.75rem;

`
const InputFile = styled.input.attrs({ type: 'file' })`
visibility: hidden;
display:none;
`
const Input = styled.input.attrs({ type: 'text' })`
border-right:0;
background:var(--form-bg);
font-weight: 600;
padding: calc(0.33rem + 1px) calc(0.75rem + 1px);
position:relative;
color:inherit;
cursor:pointer;

&:before{
    background:none;
-webkit-user-select: none;
-ms-user-select: none;
z-index:2;
user-select: none; 
position:absolute;
inset:0;
}
`

const InputContainer = styled.label`
position:relative;
display:grid;
margin-inline: auto;
grid-auto-flow: column;
grid-template-columns: 1fr auto;
transition: all .2s linear;
overflow:hidden;
border-radius: 0.5rem;
border:2px solid var(--border-color);
cursor:pointer;
&:focus-within ,&:focus{ 
    border-color: var(--form-border-active);

    ${Input}{
    background:var(--form-border)
}
${Icon}{
    background:var(--form-bg)
}


}
`



export default function FileInput({ multiple, accept, style, isChild, ...props }) {
    const [files, SetFiles] = useState(null);
    const [fileNames, SetFileNames] = useState('No files chosen...');
    const InputRef = useRef(null);


    const handleClick = (e) => {
        e.preventDefault();
        InputRef.current.click();
    }
    useEffect(() => {
        SetFileNames(() => {
            if (files)
                return Array.from(files).map(file => file.name).join(",")
            else
                return 'No files chosen...'

        })
    }, [files])

    return (
        <InputContainer style={style} onClick={(e) => {
            if (isChild) e.stopPropagation();
        }}>
            <InputFile ref={InputRef} accept={accept} multiple={multiple}  {...props} onChange={(e) => SetFiles(e.target.files)} />
            <Input placeholder='No files chosen...' value={fileNames} readOnly onClick={handleClick} />
            <Icon><MdFileUpload /></Icon>
        </InputContainer>
    )


}