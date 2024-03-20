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
import axios from "axios";
import { ExternalLink, Loader2, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from "next/link";
import React from 'react';
import toast from "react-hot-toast";
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownView from 'src/components/markdown/view';
import { UploadImage } from "src/components/uploader";
import { PublicToolPricingType, PublicToolStatus, PublicToolTypeWithId } from "src/models/tool";
import { useFormStore } from "./store";

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

export default function Form({ updateTool }: {
    updateTool: (id: string, data: Record<string, any>) => Promise<any>
}) {
    const tool = useFormStore((state) => state.tool) as PublicToolTypeWithId;
    const [loading, setLoading] = React.useState(false);
    const editorRef = React.useRef(null);
    const [generating, setGenerating] = React.useState(false);


    return (<>
        <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text"
                    value={tool?.name}
                    placeholder="Name of the tool" disabled={loading}
                    onChange={(e) => {
                        useFormStore.setState({ tool: { ...tool, name: e.target.value } })
                    }}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="slug">Slug
                    <Link href={"/scout/tools/" + tool.slug} target="_blank" className="text-xs text-slate-500">
                        <ExternalLink className="w-4 h-4 inline-block ml-1 -mt-1" />
                    </Link>
                </Label>
                <Input id="slug" name="slug" type="text"
                    value={tool?.slug}
                    placeholder="Slug of the tool" disabled={true}
                    onChange={(e) => {
                        useFormStore.setState({ tool: { ...tool, slug: e.target.value } })
                    }}
                />

            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="link">Link</Label>
                <Input id="link" name="link" type="url"
                    value={tool?.link}
                    placeholder="Link of the tool website" disabled={loading}
                    onChange={(e) => {
                        useFormStore.setState({ tool: { ...tool, link: e.target.value } })
                    }}
                />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="status">Status</Label>

                <Select name="status"
                    value={tool?.status} disabled={loading}
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
                    value={tool?.pricing_type} disabled={loading}
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
                        checked={tool?.verified} disabled={loading}
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
                disabled={loading || generating}
                onChange={({ html, text }) => {
                    // console.log('onChange', html, text);
                    useFormStore.setState({ tool: { ...tool, description: text } })
                }}
                renderHTML={(text: string) => <MarkdownView className="prose lg:prose-xl">{text}</MarkdownView>}
                ref={editorRef}
            />
            <div className="flex justify-end gap-2">
                <Button 
                variant="default_light"
                disabled={generating}
                    onClick={(e) => {
                        e.preventDefault();
                        const name = tool?.name;
                        const link = tool?.link;
                        if (!name || !link) {
                            toast.error('Name and Link are required');
                            return;
                        }
                        setGenerating(true);
                        toast.promise(axios.post('/api/tools/generate', { name, link }), {
                            loading: 'Generating Description...',
                            success: (response) => {
                                useFormStore.setState({ tool: { ...tool, description: response.data.data } });
                                return 'Description Generated';
                            },
                            error: (error) => {
                                console.error(error);
                                return 'Error Generating Description';
                            }
                        })
                            .finally(() => {
                                setGenerating(false);
                            });
                
                    }}
                >
                {generating ? <Loader2 className="h5 w-5 mr-2 animate-spin"/>:<Sparkles className="w-4 h-4 mr-2"/>}
                {generating ? "Generating...":"Generate"}
                </Button>
            </div>
        </div>
        <div className="grid w-full items-center gap-1.5 my-4">
            <Label htmlFor="coverImage">
                Cover Image
            </Label>
            <Input id="coverImage" name="coverImage" type="url"
                value={tool?.coverImage}
                disabled={loading}
                placeholder="Cover Image URL"
                onChange={(e) => {
                    useFormStore.setState({ tool: { ...tool, coverImage: e.target.value } })
                }}
            />
            <div>

                <UploadImage
                    key={"coverImage_upload"}
                    onUpload={(fileUrl) => {
                        useFormStore.setState({ tool: { ...tool, coverImage: fileUrl } })
                    }}
                />
            </div>
            <div className="p-4">
                {tool?.coverImage && <Image
                    src={tool?.coverImage}
                    alt={tool?.name}
                    width={800}
                    height={400}
                    className="aspect-square rounded-lg shadow-md max-w-32"
                />}
            </div>


        </div>
        <div className="grid w-full items-center gap-1.5 my-4">
            <Label htmlFor="coverImage">
                Banner Image
            </Label>
            <Input id="bannerImage" name="bannerImage" type="url"
                value={tool?.bannerImage}
                disabled={loading}

                placeholder="Banner Image URL"
                onChange={(e) => {
                    useFormStore.setState({ tool: { ...tool, bannerImage: e.target.value } })
                }}
            />
            <div>

                <UploadImage
                    key={"bannerImage_upload"}
                    onUpload={(fileUrl) => {
                        useFormStore.setState({ tool: { ...tool, bannerImage: fileUrl } })
                    }}
                />
            </div>
            <div className="w-full h-40 bg-gray-200">
                {tool?.bannerImage && <Image
                    src={tool?.bannerImage}
                    alt={tool?.name}
                    width={800}
                    height={400}
                    className="rounded-lg shadow-md w-full h-full object-cover"
                />}
            </div>


        </div>
        <div className="grid w-full items-center gap-1.5 my-4">
            <Button size="lg" className="w-full" disabled={loading}

                onClick={(e) => {
                    e.preventDefault();
                    console.log('Save Changes', tool);
                    setLoading(true);
                    toast.promise(updateTool(tool._id, {
                        name: tool.name,
                        slug: tool.slug,
                        link: tool.link,
                        status: tool.status,
                        pricing_type: tool.pricing_type,
                        verified: tool.verified,
                        description: tool.description,
                        coverImage: tool.coverImage,
                        bannerImage: tool.bannerImage
                    }), {
                        loading: 'Saving Changes...',
                        success: (data) => {
                            return 'Changes Saved';
                        },
                        error: (error) => {
                            console.error(error);
                            return 'Error Saving Changes';
                        }
                    })
                        .finally(() => {
                            setLoading(false);
                        });
                }}
            >
                {loading ? <Loader2 className="h5 w-5 mr-2  animate-spin"/>:null}
                {loading ? "Saving...":"Save Changes"}
                
            </Button>
        </div>

    </>)
}

