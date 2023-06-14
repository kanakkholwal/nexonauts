import styled from "styled-components";
import Image from 'next/image';
import { FiUploadCloud } from "react-icons/fi"


const FileUploader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: auto;
    max-width: 640px;
    aspect-ratio: 16/9;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    background: rgba(var(--light-rgb),1);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-inline:auto;
    label{
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.125rem;
        font-size: 1em;
        font-weight: 500;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        background: rgba(var(--light-rgb),0.05);
        color: rgba(var(--dark-rgb),1);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease-in-out;
        svg{
            font-size: 1.5em;
        }
    }
    &:hover {
        label{
            opacity: 1;
            visibility: visible;
        }
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;

    }
`;




export default function ImageUpload({ label, onChange, value = "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp", ...props }){


    return (<FileUploader {...props}>
        {value ?
            <Image height={120} width={220}
                alt={"title"} src={value}
            /> : <Image height={120} width={220}
                alt={"Placeholder image"} src={"https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp"} />}
        <label htmlFor="imageUpload">
            <FiUploadCloud/>
            <span>{label}</span>
            <input type="file" hidden accept="image/*" id="imageUpload" onChange={onChange} />
        </label>
    </FileUploader>)
}