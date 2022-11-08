import { useEffect, useState, useCallback } from "react";

import { useDropzone } from 'react-dropzone'

import classes from "./style/_image.module.scss";

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
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })






    return (
        <>
            <div className={classes.ActiveArea}>

                <div className={"G_Form-element m-auto " + classes.uploadArea}  {...getRootProps()}>

                    <div className={classes.Label}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#6658d3" stroke="#6658d3" width={64} height={64} viewBox="0 0 32 32"><path d="M26.052 15.998c-.086 0-.17 0-.252.002.132-.658.2-1.33.2-2 0-5.514-4.486-10-10-10-5.51 0-10 4.442-10.006 9.898l.016.202C2.584 14.59 0 17.556 0 21c0 3.492 2.516 6.496 6 7h5a1 1 0 0 0 0-2l-4.854.01C3.822 25.668 2 23.466 2 21c0-2.456 1.844-4.57 4.292-4.92l.86-.124a1 1 0 0 0 .858-.99l-.016-1.064C8 9.544 11.59 6 16 6c4.412 0 8 3.588 8 8 0 .542-.054 1.088-.164 1.618l-.264 1.272c-.066.318.028.646.248.884.22.236.536.358.864.308.022-.002.648-.084 1.368-.084C28.23 17.998 30 19.792 30 22c0 2.206-1.794 4-4 4h-7c-2.8 0-2.99-1.678-3-2v-6.636l2.366 2.364a1 1 0 0 0 1.414-1.414l-4.024-4.022a1.002 1.002 0 0 0-.712-.292c-.016 0-.028-.008-.044-.008a.987.987 0 0 0-.724.318l-4.028 4.024a1 1 0 0 0 1.414 1.414L14 17.412V24c0 1.382 1.044 4 5 4h7c3.308 0 6-2.692 6-6s-2.668-6.002-5.948-6.002z" /></svg>
                        <label className="G_Form-label">{
                            isDragActive ?
                                <p>Drop the files here ...</p> :
                                <p>Drag 'n' drop some files here, or click to select files :</p>

                        }</label>
                    </div>

                    <input accept="image/*" className={"G_Form-File " + classes.Input} multiple type="file" {...getInputProps()} />
                </div>
                {file && <div className={classes.ProgressArea}>
                    <ProgressCard progress={progress} file={file} url={fileUrl} />
                </div>}

            </div>

            <div className={classes.imageArea} id="preview">

            </div>


        </>
    )
}