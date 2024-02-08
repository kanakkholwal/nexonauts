"use client";
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
import React from 'react';
import ReactMarkdown from "react-markdown";
import 'react-markdown-editor-lite/lib/index.css';
import { PublicToolPricingType, PublicToolStatus, PublicToolTypeWithId } from "src/models/tool";
import { useFormStore } from "./store";


const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

export default function Form() {
    const tool = useFormStore((state) => state.tool) as PublicToolTypeWithId;
    const editorRef = React.useRef(null);

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
                renderHTML={(text: string) => <ReactMarkdown>{text}</ReactMarkdown>}

                ref={editorRef}
            />
        </div>
    </>)
}