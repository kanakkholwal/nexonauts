"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { uploadImagefromClient } from "src/utils/cloudinary";




export function UploadImage({ onUpload }: { onUpload: (fileUrl: string) => void }) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
        const file = acceptedFiles[0];
        if (!file) {
            toast.error('Not a file');
            console.error(file, ' was not a file');
            return;
        }
        console.log(file);

        toast.promise(uploadImagefromClient(file), {
            loading: 'Uploading Image...',
            success: (data) => {
                onUpload(data);
                return 'Image Uploaded';
            },
            error: (error) => {
                console.error(error);
                return 'Error Uploading Image';
            }
        })

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (<Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" size="sm">
                <FiUpload className="w-4 h-4 mr-2" aria-hidden="true" />
                Upload an Image
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Upload an Image
                </DialogTitle>
                <DialogDescription>
                    Upload an image to use as cover or banner
                </DialogDescription>
            </DialogHeader>
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
        </DialogContent>
    </Dialog>
    )
}