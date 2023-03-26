import styled from 'styled-components'
import { FiUpload } from "react-icons/fi";
import { useEffect, useRef, useState } from 'react';
import Input from './Input';


const Icon = styled.div`
width:auto;
border-left:0;
padding:0.5rem 1.75rem;
`;
const InputFile = styled.input.attrs({ type: 'file' })`
visibility: hidden;
display:none!important;
`;
const ReadOnlyInput = styled(Input)`
user-select: none;
pointer-events: none;
border-radius:0;
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
display:flex;
transition: all .3s ease-in-out;
overflow:hidden;
border-radius: 0.5rem;
border:2px solid var(--border-color);
cursor:pointer;
width: max-content;
max-width: 100%!important;
&:focus-within,&:hover,&:focus{ 
    border-color: var(--theme);
}
`



export default function FileInput({ multiple = false, accept = "image/*", style = null, id, ...props }) {
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
            e.stopPropagation();
        }}
            {...props}>
            <InputFile ref={InputRef} id={id} accept={accept} multiple={multiple} onChange={(e) => SetFiles(e.target.files)} />
            <Icon><FiUpload /></Icon>
            <ReadOnlyInput placeholder='No files chosen...' value={fileNames} readOnly onClick={handleClick} />
        </InputContainer>
    )


}