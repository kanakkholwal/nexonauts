import { useEffect, useState, useCallback, useRef } from "react";

import { useDropzone } from 'react-dropzone'
import FileInput from "@/components/form-elements/FileInput"
import FormElement from "@/components/form-elements/FormElement"
import FormHelper from "@/components/form-elements/FormHelper"
import styled from "styled-components";
import { FiUpload } from "react-icons/fi";


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
    box-shadow: var(--card-shadow);
    max-width: 45rem;
    margin-inline:auto;
    margin-block:1rem 2rem;
    &>div{
        flex:1 1 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;
const ProgressCardTitle = styled.h4`
flex:1 1 auto;
padding: 0.5rem 0.75rem;
text-overflow: ellipsis;
line-height: 2;
`
const ProgressCardDetails = styled.div`
padding: 1.25rem 0.75rem;
text-align: center;
display: flex;
flex-direction: column;
align-items: flex-end;
gap: 0.5rem;
`
const ProgressBar = styled.div`
width:100%;
height:3px;
position: relative;
overflow: hidden;
transition: all 0.2s linear;
border-radius: 0.25rem;
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
    align-items: flex-start;
    justify-content: space-evenly;
        gap: 1rem;

`


const ProgressCard = ({ progress, file, url }) => {
    const [type, SetType] = useState("#6658d3");

    const CurrentValue = progress.toFixed(2);
    useEffect(() => {
        if (CurrentValue >= 60 && CurrentValue <= 90) {
            SetType("#d7c814")
        }
        else if (CurrentValue >= 90) {
            SetType("#6ec48e")
        }
        else if (CurrentValue <= 60 && CurrentValue >= 25) {
            SetType("#1082b9")
        }
        else {
            SetType("#6658d3")
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
                    <ProgressCardTitle>{file.name ?? "Your File"}</ProgressCardTitle>
                    <ProgressCardDetails>
                        <span className="Badge Badge_info">{FileSize}</span>
                        <span className="Badge Badge_success">{CurrentValue + " %"}</span>
                    </ProgressCardDetails>
                </div>
                <ProgressBar>
                    <ProgressMeter style={{ width: `${CurrentValue}%`, background: type }} />
                </ProgressBar>
            </ProgressCardWrapper>
        </>)
}

export default function Image2Webp() {
    const [progress, SetProgress] = useState(0);
    const [file, SetFile] = useState(null);
    const [fileUrl, SetFileUrl] = useState("");

    const InputRef = useRef(null);

    function addImageBox(container) {
        return container;
    }



    const onDrop = useCallback((acceptedFiles) => {

        acceptedFiles.forEach(async (file) => {
            if (!file) {
                throw new Error(file + "was not a file");
            }

            console.log(file);
            SetFile(file);
            SetFileUrl(URL.createObjectURL(file));
            const imageBox = addImageBox(document.getElementById("preview"));

            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.addEventListener('progress', async (event) => {
                if (event.loaded && event.total) {
                    const percent = (event.loaded / event.total) * 100;
                    SetProgress(percent)
                    if (percent === 100) {
                        console.log("complete")

                        // Load the data into an image
                        await new Promise(function (resolve, reject) {
                            const rawImage = new Image();

                            rawImage.addEventListener("load", function () {
                                resolve(rawImage);
                            });

                            rawImage.src = URL.createObjectURL(file);
                        })
                            .then(function (rawImage) {
                                // Convert image to webp ObjectURL via a canvas blob
                                return new Promise(function (resolve, reject) {
                                    let canvas = document.createElement('canvas');
                                    let ctx = canvas.getContext("2d");

                                    canvas.width = rawImage.width;
                                    canvas.height = rawImage.height;
                                    ctx.drawImage(rawImage, 0, 0);

                                    canvas.toBlob(function (blob) {
                                        resolve(URL.createObjectURL(blob));
                                    }, "image/webp");
                                });
                            })
                            .then(function (imageURL) {
                                // Load image for display on the page
                                return new Promise(function (resolve, reject) {
                                    let scaledImg = new Image();

                                    scaledImg.addEventListener("load", function () {
                                        resolve({ imageURL, scaledImg });
                                    });

                                    scaledImg.setAttribute("src", imageURL);
                                });
                            })
                            .then(function (data) {
                                // Inject into the DOM
                                // const imageCard = document.createElement("a");
                                // imageCard.setAttribute("href", data.imageURL);
                                // imageCard.setAttribute('download', `${file.name.split(".")[0]}.[Converted by kkupgrader.eu.org].webp`);
                                // imageCard.appendChild(data.scaledImg);

                                // imageBox.innerHTML = "";
                                // console.log(imageCard)
                                let fileName = file.name;
                                if (fileName.length >= 12) {
                                    let splitName = fileName.split('.');
                                    fileName = splitName[0];
                                }
                                const imageCard = `
                        <div class="Fui_Card" style="max-width:30rem;">
                        <div class="Fui_Card-body">
                           <img class="Fui_Card-ImgTop" src="${data.imageURL}"/>
                           </div>
                          <div class="Fui_Card-footer" style="display: flex;justify-content: space-between;align-items:center">
                          <span title="${fileName}.webp" style="text-overflow: ellipsis;word-break:nowrap;overflow:hidden ">
                          ${fileName}
                          </span>
                           <a href="${data.imageURL}" class="Badge" style="color: var(--btn-text);background: var(--btn-bg);box-shadow: var(--btn-box-shadow);border-radius: var(--btn-border-radius);border: 2px solid var(--btn-bg);" download="${fileName}.[Converted by kkupgrader.eu.org].webp" title="Download Image in WEBP Format">
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                           </a>
                          </div>
                        
                     </div>  `
                                imageBox.insertAdjacentHTML("beforeend", imageCard)
                            });
                    }
                }
            });
        })
        console.log(InputRef?.current)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })






    return (
        <div style={{ maxWidth: "720px", marginInline: "auto" }}>

            <FormElement style={{ alignItems: "center" }}>
                <UploadLabel {...getRootProps()} size="45rem">
                    <FiUpload />
                    <span> {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files :</p>
                    }</span>
                    <div>
                        <FileInput accept="image/*" ref={InputRef} isChild multiple={true} {...getInputProps()} />
                    </div>
                </UploadLabel>
                <FormHelper>Upload Your Image Here</FormHelper>
            </FormElement>


            {file && <ProgressCard progress={progress} file={file} url={fileUrl} />}


            <PreviewArea id="preview">

            </PreviewArea>


        </div>
    )
}