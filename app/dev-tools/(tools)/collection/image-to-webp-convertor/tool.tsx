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
import { useDropzone } from "react-dropzone";

import { FiUpload } from "react-icons/fi";
import { HiDownload } from "react-icons/hi";

function formatFileSize(sizeInBytes: number): string {
  const KB = 1024;
  const fileSizeInKB = sizeInBytes / KB;
  return fileSizeInKB.toFixed(2) + " KB";
}

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const rawImage = new window.Image();
    rawImage.onload = () => resolve(rawImage);
    rawImage.onerror = reject;
    rawImage.src = URL.createObjectURL(file);
  });
};

const convertToWebp = (image: HTMLImageElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      } else {
        reject(new Error("Failed to create blob"));
      }
    }, "image/webp");
  });
};

export default function Image2Webp() {
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [scaledImg, setScaledImg] = useState<
    {
      image: string;
      fileName: string;
      fileSize?: string;
    }[]
  >([]);
  const inputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      if (!file) {
        throw new Error(`${file} was not a file`);
      }

      setFile(file);
      setFileUrl(URL.createObjectURL(file));

      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener("progress", async (event) => {
        if (event.loaded && event.total) {
          const percent = (event.loaded / event.total) * 100;
          setProgress(percent);
          if (percent === 100) {
            console.log("complete");

            const { name } = file;
            let fileName = name;
            if (fileName.length >= 12) {
              const splitName = fileName.split(".");
              fileName = splitName[0];
            }
            let fileSize = file.size;

            const processImage = async (): Promise<void> => {
              try {
                const rawImage = await loadImage(file);
                const webpUrl = await convertToWebp(rawImage);

                setScaledImg((prev) => [
                  ...prev,
                  {
                    image: webpUrl,
                    fileName,
                    fileSize: formatFileSize(file.size),
                  },
                ]);
              } catch (error) {
                console.error("Error processing image:", error);
              }
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
        <label
          htmlFor="dropzone-file"
          {...getRootProps()}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-white/5 hover:bg-white/10 backdrop-blur-lg dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiUpload
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone"
            type="file"
            className="hidden"
            accept="image/*"
            multiple={true}
            {...getInputProps()}
          />
        </label>
      </div>

      {/* {file && <ProgressCard progress={progress} file={file} url={fileUrl} />} */}

      <div className="w-full h-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-3 mt-8">
        {scaledImg.map(({ image, fileName, fileSize }, index) => {
          return (
            <Card
              key={index}
              className="rounded-lg w-auto mb-4 flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle>{fileName}</CardTitle>
                <CardDescription>{fileSize}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  alt={fileName}
                  width={480}
                  height={320}
                  src={image}
                  className="max-h-56 shadow"
                />
              </CardContent>
              <CardFooter>
                <Button size="sm" width="full" rounded="full" asChild>
                  <a
                    href={image}
                    download={`${fileName}.[Converted by nexonauts.com].webp`}
                    title="Download Image in WEBP Format"
                  >
                    Download <HiDownload />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
