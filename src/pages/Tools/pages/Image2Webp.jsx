import { useEffect, useState, useCallback, useRef } from "react";

import { useDropzone } from 'react-dropzone'
import FileInput from "@/components/form-elements/FileInput"
import classes from "./style/_image.module.scss";
import styled from "styled-components";
import { FiUpload } from "react-icons/fi";

const UploadLabel = styled.label`
margin: auto;
display: grid;
align-items: center;
border: 2px solid var(--form-border);
border-radius: 0.25rem;
aspect-ratio: 16/9;
margin-inline: auto;
max-width: 35rem;
background:var(--form-bg);
padding-top: 1rem;

svg{
    margin:2rem auto;
    font-size: 2em;
}
&:is(:focus, :active) {
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


const ProgressCard = ({ progress, file, url }) => {
    const [type, SetType] = useState("var(--primary)");

    const CurrentValue = progress.toFixed(2);
    useEffect(() => {
        if (CurrentValue >= 60 && CurrentValue <= 90) {
            SetType("var(--warning)")
        }
        else if (CurrentValue >= 90) {
            SetType("var(--success)")
        }
        else if (CurrentValue <= 60 && CurrentValue >= 25) {
            SetType("var(--primary)")
        }
        else {
            SetType("var(--primary-hvr)")
        }
    }, [CurrentValue]);


    const FileSize = (() => {
        let size = file.size;
        if (file.size / 1024 > 1024)
            size = (file.size / (1024 * 1024)).toFixed(3).toString() + "M.B."
        else
            size = (file.size / 1024).toFixed(3).toString() + "K.B."

        return size;
    })();

    return (
        <>

            <div className={"G_Card " + classes.ProgressCard} >
                <img class="G_Card-imgTop" src={url} />

                <div className={classes.Details}>
                    <div className={classes.Info}>
                        <span className={classes.Name}>
                            {file.name ? file.name.substring(0, 18) + "... " : " "}
                        </span>
                        <span className={classes.Size}>
                            {FileSize}
                        </span>

                    </div>
                    <div className={classes.ProgressMeter}>{CurrentValue + "%"}</div>
                </div>
                <div className={classes.Progress}>
                    <div className={classes.ProgressBar} style={{ width: `${CurrentValue}%`, background: type }}></div>
                </div>

            </div>
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
                                    fileName = splitName[0].substring(0, 13) + "...";
                                }
                                const imageCard = `
                        <div class="G_Card ${classes.imageCard}">
                           <img class="G_Card-imgTop" src="${data.imageURL}"/>
                          <div class="G_Card-footer ${classes.Footer}">
                          <span title="${file.name.split(".")[0]}.webp">
                          ${fileName}
                          </span>
                           <a href="${data.imageURL}" class="Badge" download="${file.name.split(".")[0]}.[Converted by kkupgrader.eu.org].webp" title="Download Image in WEBP Format">
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
        <>



            <UploadLabel {...getRootProps()}>
                <FiUpload />
                <span> {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files :</p>
                }</span>
                <div>
                    <FileInput accept="image/*" ref={InputRef} multiple={true} {...getInputProps()} />
                </div>
            </UploadLabel>


            {file && <div className={classes.ProgressArea}>
                <ProgressCard progress={progress} file={file} url={fileUrl} />
            </div>}


            <div className={classes.imageArea} id="preview">

            </div>


        </>
    )
}