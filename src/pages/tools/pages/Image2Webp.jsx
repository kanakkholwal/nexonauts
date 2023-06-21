import { useEffect, useState, useCallback, useRef } from "react";

import { useDropzone } from 'react-dropzone'
import FileInput from "@/components/form-elements/FileInput"
import FormElement from "@/components/form-elements/FormElement"
import FormHelper from "@/components/form-elements/FormHelper"
import {IconButton} from "components/buttons"
import {Card,CardBody, CardFooter} from "components/Card"
import styled from "styled-components";
import { FiUpload } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import { HiDownload } from "react-icons/hi";
import Image from "next/image";


const UploadLabel = styled.div`
margin: auto;
display: grid!important;
align-items: center;
border: 2px solid var(--form-border);
border-radius: 0.25rem;
aspect-ratio: 16/9;
background:var(--form-bg);
padding-top: 1rem;
max-width:${props => props.size ? props.size : "100%"};
svg{
    margin:2rem auto;
    font-size: 2em;
}
&:is(:focus, :active,:hover,:focus-within) {
    border-color: var(--form-border-active);
    svg{
        color: var(--form-caret);
    }
}
span{
    display:flex;
    text-align:center;
    margin:auto;
    padding:2rem;
}
`
const ProgressCardWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    border-radius: 0.5rem;
    background: var(--card-bg);
    max-width: 29rem;
    margin-inline: auto;
    padding:0.75rem 1rem;
    margin-bottom:0.75rem;
    border: 1px solid rgba(var(--grey-rgb), 0.25);
    border-radius: 7px;
    &>div{
        flex:1 1 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const ProgressCardDetails = styled.div`
padding: 1.25rem 0.75rem;
text-align: center;
display: flex;
align-items: center;
justify-content: space-between;
gap: 0.5rem;
width:100%;
.fileSize{
    font-weight: 400;
font-size: 0.875rem;
line-height: 1.25rem;
svg{
    font-size: 1.25rem;
    margin-inline: 0.5rem;
    margin-top: -0.25rem;
}
}
.fileProgress{
    font-weight: 500;
font-size: 1rem;
line-height: 1.5rem;
color:var(--text-color);
}
`
const ProgressBar = styled.div`
width:100%;
height:8px;
position: relative;
overflow: hidden;
transition: all 0.2s linear;
border-radius: 0.25rem;
margin-bottom:1rem;
`
const ProgressMeter = styled.div`
border-radius:inherit;
width:auto;
position:absolute;
inset:0;
background:var(--progress);
`
const PreviewArea = styled.div`
margin-inline: auto;
display: flex;
flex-wrap: wrap;
align-items: stretch;
justify-content: space-evenly;
gap: 1rem;

`


const ProgressCard = ({ progress, file, url }) => {
    const [type, SetType] = useState("var(--theme)");

    const CurrentValue = progress.toFixed(2);
    useEffect(() => {
        if (CurrentValue >= 98) {
            SetType("var(--success)")
        }
        else if (CurrentValue >= 60 && CurrentValue <= 90) {
            SetType("var(--warning)")
        }
        else if (CurrentValue >= 90) {
            SetType("var(--info)")
        } 
        else if (CurrentValue <= 60 && CurrentValue >= 25) {
            SetType("var(--secondary)")
        }
        else {
            SetType("var(--theme)")
        }
    }, [CurrentValue]);


    const FileSize = (() => {
        let size = file.size;
        if (file.size / 1024 > 1024)
            size = (file.size / (1024 * 1024)).toFixed(3).toString() + " M.B."
        else
            size = (file.size / 1024).toFixed(3).toString() + " K.B."

        return size;
    })();

    return (
        <>
            <ProgressCardWrapper>
                <div>
                    <ProgressCardDetails>
                        <span className="fileProgress">{CurrentValue + " %"} Completed</span>
                        <span className="fileSize"><CgFileDocument/>{FileSize}</span>
                    </ProgressCardDetails>
                </div>
                <ProgressBar>
                    <ProgressMeter style={{ width: `${CurrentValue}%`, background: type }} />
                </ProgressBar>
            </ProgressCardWrapper>
        </>)
}

export default function Image2Webp() {
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [scaledImg, setScaledImg] = useState([]);
  
    const inputRef = useRef(null);
  
    
  
    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (!file) {
          throw new Error(`${file} was not a file`);
        }
  
        setFile(file);
        setFileUrl(URL.createObjectURL(file));
  
        const reader = new FileReader();
  
        reader.readAsDataURL(file);
        reader.addEventListener('progress', async(event) => {
          if (event.loaded && event.total) {
            const percent = (event.loaded / event.total) * 100;
            setProgress(percent);
            if (percent === 100) {
              console.log("complete");
  
              const { name } = file;
              let fileName = name;
              if (fileName.length >= 12) {
                const splitName = fileName.split('.');
                fileName = splitName[0];
              }
  
              const processImage = async () => {
                const rawImage = new window.Image();
                return new Promise((resolve, reject) => {
                  rawImage.addEventListener("load", () => {
                    resolve(rawImage);
                  });
                  rawImage.src = URL.createObjectURL(file);
                })
                  .then((rawImage) => {
                    return new Promise((resolve, reject) => {
                      const canvas = document.createElement('canvas');
                      const ctx = canvas.getContext("2d");
              
                      canvas.width = rawImage.width;
                      canvas.height = rawImage.height;
                      ctx.drawImage(rawImage, 0, 0);
              
                      canvas.toBlob((blob) => {
                        resolve(URL.createObjectURL(blob));
                      }, "image/webp");
                    });
                  })
                  .then((imageURL) => {
                    setScaledImg((prev) => [
                      ...prev,
                      {
                        image: imageURL,
                        fileName: fileName,
                      },
                    ]);
                  });
              };
              
             await processImage();
            }
          }
        });
      });

    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
    return (
      <div className="p-2">
        <FormElement style={{ alignItems: "center",maxWidth: "720px", marginInline: "auto" }}>
          <UploadLabel {...getRootProps()} size="45rem">
            <FiUpload />
            <span>
              {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files :</p>}
            </span>
            <div>
              <FileInput accept="image/*" ref={inputRef} isChild multiple={true} {...getInputProps()} />
            </div>
          </UploadLabel>
          <FormHelper>Upload Your Image Here</FormHelper>
        </FormElement>
  
        {file && <ProgressCard progress={progress} file={file} url={fileUrl} />}
  
        <PreviewArea>
            {scaledImg.map(({image,fileName}, index) => {
                return (
                    <Card key={index}  style={{ maxWidth: "30rem",border:"1px solid rgba(var(--grey-rgb),0.25)",padding:"1rem" }}>
                        <CardBody>
                            <Image  alt={fileName} width={480} height={320} src={image} />
                        </CardBody>
                        <CardFooter style={{
                            margin:"0",
                        }}>
                        <span>
                            {fileName}
                        </span>
                            <IconButton nature="success" as="a" href={image} download={`${fileName}.[Converted by kkupgrader.eu.org].webp`} title="Download Image in WEBP Format">
                            <HiDownload/>
                            </IconButton>

                        </CardFooter>
                </Card>)
            } )}
        </PreviewArea>
      </div>
    );
  }
  