"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import dynamic from 'next/dynamic';
import Image from "next/image";
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from "react-icons/fi";
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownView from 'src/components/markdown/view';
import { PublicToolPricingType, PublicToolStatus, PublicToolTypeWithId } from "src/models/tool";
import { useFormStore } from "./store";

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

export default function Form() {
    const tool = useFormStore((state) => state.tool) as PublicToolTypeWithId;
    const editorRef = React.useRef(null);

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {
            if (!file) {
                throw new Error(`${file} was not a file`);
            }


        });

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (<>
        <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text"
                    value={tool?.name}
                    placeholder="Name of the tool"
                    onChange={(e) => {
                        useFormStore.setState({ tool: { ...tool, name: e.target.value } })
                    }}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" type="text"
                    value={tool?.slug}
                    placeholder="Slug of the tool"
                    onChange={(e) => {
                        useFormStore.setState({ tool: { ...tool, slug: e.target.value } })
                    }}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="link">Link</Label>
                <Input id="link" name="link" type="url"
                    value={tool?.link}
                    placeholder="Link of the tool website"
                    onChange={(e) => {
                        useFormStore.setState({ tool: { ...tool, link: e.target.value } })
                    }}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="status">Status</Label>

                <Select name="status"
                    value={tool?.status}
                    onValueChange={(value) => {
                        useFormStore.setState({ tool: { ...tool, status: value as PublicToolStatus } })
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {['draft', 'published', 'archived', 'deleted', 'pending', 'rejected'].map((status) => {
                            return <SelectItem key={`tool_status_${status}`} value={status}>{status}</SelectItem>
                        })}
                    </SelectContent>
                </Select>

            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="pricing_type">Pricing Type</Label>

                <Select name="pricing_type"
                    value={tool?.pricing_type}
                    onValueChange={(value) => {
                        useFormStore.setState({ tool: { ...tool, pricing_type: value as PublicToolPricingType } })
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Pricing" />
                    </SelectTrigger>
                    <SelectContent>
                        {['free', 'paid', 'freemium', 'one_time_license', 'subscription', 'open_source', 'other'].map((pricing_type) => {
                            return <SelectItem key={`tool_pricing_${pricing_type}`} value={pricing_type}>{pricing_type}</SelectItem>
                        })}
                    </SelectContent>
                </Select>

            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                    htmlFor="verified"
                    className="flex items-center gap-2"
                >
                    <Switch id="verified" aria-label="Verified"
                        checked={tool?.verified}
                        onCheckedChange={(checked) => {
                            useFormStore.setState({ tool: { ...tool, verified: checked } })
                        }}
                    />
                    Verified
                </Label>
            </div>

        </div>
        <div className="grid w-full items-center gap-1.5 my-4">
            <Label
                htmlFor="description">
                Description
            </Label>
            <MdEditor
                className="w-full h-96  rounded-lg shadow-md p-2"
                value={tool?.description || ""}
                onChange={({ html, text }) => {
                    console.log('onChange', html, text);
                    useFormStore.setState({ tool: { ...tool, description: text } })
                }}
                renderHTML={(text: string) => <MarkdownView>{text}</MarkdownView>}
                ref={editorRef}
            />
        </div>
        <div className="grid w-full items-center gap-1.5 my-4">
            <Label htmlFor="coverImage">
                Cover Image
            </Label>
            <Input id="coverImage" name="coverImage" type="url"
                value={tool?.coverImage}
                placeholder="Cover Image URL"
                onChange={(e) => {
                    useFormStore.setState({ tool: { ...tool, coverImage: e.target.value } })
                }}
            />
            <div className="p-4">
                {tool?.coverImage && <Image
                    src={tool?.coverImage}
                    alt={tool?.name}
                    width={800}
                    height={400}
                    className="aspect-square rounded-lg shadow-md max-w-32"
                />}
            </div>

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

        </div>
        <div className="grid w-full items-center gap-1.5 my-4">
            <Label htmlFor="coverImage">
                Banner Image
            </Label>
            <Input id="bannerImage" name="bannerImage" type="url"
                value={tool?.bannerImage}
                placeholder="Banner Image URL"
                onChange={(e) => {
                    useFormStore.setState({ tool: { ...tool, bannerImage: e.target.value } })
                }}
            />
            <div className="w-full h-40 bg-gray-200">
                {tool?.bannerImage && <Image
                    src={tool?.bannerImage}
                    alt={tool?.name}
                    width={800}
                    height={400}
                    className="rounded-lg shadow-md w-full h-full object-cover"
                />}
            </div>
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

        </div>
        <div className="grid w-full items-center gap-1.5 my-4">
                    <Button size="lg" className="w-full">
                        Save Changes
                    </Button>
        </div>

    </>)
}