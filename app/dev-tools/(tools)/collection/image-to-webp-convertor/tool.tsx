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

import { useCallback, useState } from "react";

import Image from "next/image";
import { useDropzone } from "react-dropzone";

import { Badge } from "@/components/ui/badge";
import { FiUpload } from "react-icons/fi";
import { Download,LoaderCircle,Ban  } from "lucide-react";

function formatFileSize(sizeInBytes: number): string {
  const KB = 1024;
  const fileSizeInKB = sizeInBytes / KB;
  return `${fileSizeInKB.toFixed(2)} KB`;
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


  const [scaledImg, setScaledImg] = useState<
    {
      id:number,
      image: string;
      name: string;
      org_size?: string;
      optimized_size?: string;
      processing: boolean;
      failed: boolean;
    }[]
  >([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      if (!file) {
        throw new Error(`${file} was not a file`);
      }
      // console.log(file)



      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.addEventListener("progress", async (event) => {
        if (event.loaded && event.total) {
          const progress = (event.loaded / event.total) * 100;

          if (progress === 100) {
            // console.log("uploaded");

            setScaledImg((prev) => [
              ...prev, {
                id: file.lastModified,
                image: URL.createObjectURL(file),
                name: file.name,
                org_size: formatFileSize(file.size),
                optimized_size: "",
                processing: true,
                failed: false
              }]);
            let name = file.name;
            if (name.length >= 12) {
              const splitName = name.split(".");
              name = splitName[0];
            }

            const processImage = async (file: File): Promise<[boolean, string]> => {
              try {
                const rawImage = await loadImage(file);
                const webpUrl = await convertToWebp(rawImage);
                return [false, webpUrl];
              } catch (error) {
                console.error("Error processing image:", error);
                return [true, ""];
              }
            };

            const [failed, webpUrl] = await processImage(file);
            if (failed) {
              setScaledImg((prev) => {
                const updated = prev.map((img) => {
                  if (img.id === file.lastModified) {
                    return {
                      ...img,
                      processing: false,
                      failed,name
                    };
                  }
                  return img;
                });
                return updated;
              });
            } else {
              setScaledImg((prev) => {
                const updated = prev.map((img) => {
                  if (img.id === file.lastModified) {
                    return {
                      ...img,
                      image: webpUrl,
                      processing: false,
                      failed,name
                    };
                  }
                  return img;
                });
                return updated;
              });

            }
            console.log("completed");

          }
        }
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="p-2">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          {...getRootProps()}
          className="flex flex-col items-center justify-center w-full h-64 border border-border border-dashed rounded-lg cursor-pointer bg-gray-100 dark:bg-white/5 hover:bg-primary/10 backdrop-blur-lg hover:border-primary group"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FiUpload
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 group-hover:text-primary"
              aria-hidden="true"
            />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary/80">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-primary/80">
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

      <div className="w-full h-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-3 mt-8">
        {scaledImg.map((element) => {
          return (
            <Card
              key={element.id}
              className="rounded-lg w-auto flex flex-col justify-between"
            >
              <CardHeader className="!p-4">
                <CardTitle className="break-words text-md">{element.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500 font-semibold">
                  <span>
                    {element.org_size}
                  </span>
                  <Badge
                    size="sm"
                    variant={element.processing ?  "warning" : element.failed ?"destructive" : "success"}
                    className="ml-2"
                  >
                    {element.processing ? "Processing" : element.failed ?  "Failed" : "Done"}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="!p-4">
                <Image
                  alt={element.name}
                  width={480}
                  height={320}
                  src={element.image}
                  className="max-h-56 shadow rounded-md"
                />
              </CardContent>
              <CardFooter className="!p-4">
                <Button size="sm" width="full"
                  disabled={element.processing}
                  rounded="full" asChild>
                  <a
                    href={element.image}
                    download={`${element.name}.[Converted by nexonauts.com].webp`}
                    title="Download Image in WEBP Format"
                    className={element.processing ? "pointer-events-none cursor-wait" : element.failed ?  "cursor-not-allowed" : "cursor-pointer"}
                  >
                    {element.processing ? <LoaderCircle className="animate-spin"/> : element.failed ?  <Ban/> :  <Download />}
                    {element.processing ? "Processing" : element.failed ?  "Error !" : "Download"}
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
