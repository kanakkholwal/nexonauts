"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useDropzone } from 'react-dropzone';
import { CgFileDocument } from "react-icons/cg";
import { FiUpload } from "react-icons/fi";
import { HiDownload } from "react-icons/hi";
import styled from "styled-components";


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
            <span className="fileSize"><CgFileDocument />{FileSize}</span>
          </ProgressCardDetails>
        </div>
        <ProgressBar>
          <ProgressMeter style={{ width: `${CurrentValue}%`, background: type }} />
        </ProgressBar>
      </ProgressCardWrapper>
    </>)
}
function formatFileSize(sizeInBytes) {
  const KB = 1024;
  const fileSizeInKB = sizeInBytes / KB;
  return fileSizeInKB.toFixed(2) + ' KB';
}

export default function Image2Webp() {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File |null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [scaledImg, setScaledImg] = useState<{
    image: string;
    fileName: string;
    fileSize?:string;
  }[]>([]);
  const inputRef = useRef(null);



  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file :File) => {
      if (!file) {
        throw new Error(`${file} was not a file`);
      }

      setFile(file);
      setFileUrl(URL.createObjectURL(file));

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener('progress', async (event) => {
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
            let fileSize = file.size

            const processImage = async () => {
              const rawImage = new window.Image();
              return new Promise((resolve, reject) => {
                rawImage.addEventListener("load", () => {
                  resolve(rawImage);
                });
                rawImage.src = URL.createObjectURL(file)
              })
                .then((rawImage: any) => {
                  return new Promise((resolve, reject) => {
                    const canvas = document.createElement('canvas') as HTMLCanvasElement;
                    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

                    canvas.width = rawImage.width;
                    canvas.height = rawImage.height;
                    ctx.drawImage(rawImage, 0, 0);

                    canvas.toBlob((blob) => {
                      return resolve(URL.createObjectURL(blob ?? new Blob()));
                    }, "image/webp");
                  });
                })
                .then((imageURL: string) => {
                  setScaledImg((prev) => [...prev, {
                    image: imageURL,
                    fileName: fileName,
                    fileSize:formatFileSize(file.size)
                  }]);
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

      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" {...getRootProps()} className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-slate-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone" type="file" className="hidden" accept="image/*" multiple={true} {...getInputProps()} />
        </label>
      </div>

      {/* {file && <ProgressCard progress={progress} file={file} url={fileUrl} />} */}

      <div className="w-full h-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-3 mt-8">
        {scaledImg.map(({ image, fileName,fileSize }, index) => {
          return (
            <Card key={index} className="rounded-lg w-auto mb-4 " >
              <CardHeader>
                <CardTitle>{fileName}</CardTitle>
                <CardDescription>{fileSize}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image alt={fileName} width={480} height={320} src={image}  className="max-h-56"/>
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded-full" size="sm"  asChild>
                  <a href={image} download={`${fileName}.[Converted by nexonauts.com].webp`} title="Download Image in WEBP Format">
                    Download <HiDownload  className="w-4 h-5 ml-2"/>
                  </a>
                </Button>

              </CardFooter>
            </Card>)
        })}
      </div>


    </div>
  );
}
