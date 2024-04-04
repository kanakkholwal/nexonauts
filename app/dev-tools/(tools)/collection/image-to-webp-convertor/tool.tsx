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

import { useCallback, useRef, useState } from "react";

import Image from "next/image";
import { useDropzone } from 'react-dropzone';

import { FiUpload } from "react-icons/fi";
import { HiDownload } from "react-icons/hi";



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
        <label htmlFor="dropzone-file" {...getRootProps()} className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-white/5 hover:bg-white/10 backdrop-blur-lg dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
