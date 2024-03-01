"use client";
import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';
import { customAlphabet } from 'nanoid';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { CgSpinnerAlt } from "react-icons/cg";
import { LuImage } from 'react-icons/lu';
import { PublicToolType } from "src/models/tool";

interface UserSubmitProps extends React.HTMLAttributes<HTMLDivElement> {
    submit: (tool:PublicToolType) => Promise<boolean>
}

export function ToolSubmitForm({ className,submit, ...props }: UserSubmitProps) {
    const { data: session } = useSession();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [imageStatus, setImageStatus] = useState("idle" as "idle" | "loading" | "success" | "error");

    const [tool, setTool] = useState<PublicToolType>({
        name: "",
        description: "",
        link: "",
        author: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            public_link: session?.user?.username ? `/developers/${session?.user?.username}` : "",
            userId: session?.user?._id || null,
        },
        status: "pending",
        categories: [],
        coverImage: "",
        slug: customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 16)(),
        verified: false,
        pricing_type: "free"
    })






    return (
        <>

            <CardContent className={cn("grid gap-6 text-left", className)} {...props}>
                <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="author_name">Your Name</Label>
                        <Input type="text" id="author_name" placeholder="Your name" variant="fluid"
                            value={tool.author?.name || ""}
                            onChange={(e) => setTool({ ...tool, author: { ...tool.author, name: e.target.value } })} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Your Email" variant="fluid"
                            value={tool.author?.email || ""}
                            onChange={(e) => setTool({ ...tool, author: { ...tool.author, email: e.target.value } })} />
                    </div>
                </div>
                <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Tool Name</Label>
                        <Input type="text" id="name" placeholder="Tool Name" variant="fluid"
                            value={tool.name || ""}
                            onChange={(e) => setTool({ ...tool, name: e.target.value })} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="link">Tool Link</Label>
                        <Input type="text" id="link" placeholder="Tool Link" variant="fluid"
                            value={tool.link || ""}
                            onChange={(e) => setTool({ ...tool, link: e.target.value })} />
                    </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Description" variant="fluid"
                        rows={5}
                        value={tool.description || ""}
                        onChange={(e) => setTool({ ...tool, description: e.target.value })} />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="coverImage">
                    {imageStatus === "loading" ? <CgSpinnerAlt className="w-4 h-4 animate-spin inline-block mr-2 " /> : <LuImage className={`w-4 h-4 inline-block mr-2 S ${imageStatus === "success" && "text-green-500"} ${imageStatus === "error" && "text-red-500"}`} />}
                        Cover Image</Label>
                    <Input type="text" id="coverImage" placeholder="Cover Image" variant="fluid"
                        value={tool.coverImage || ""}
                        onChange={async (e) => {
                            const url = e.target.value;
                            setImageStatus("loading");
                            await isImageURLValid(url).then(valid => {
                                if (valid) {
                                    setImageStatus("success");
                                    setTool({ ...tool, coverImage: url });
                                }
                                else {
                                    toast.error("Invalid Image URL");
                                }
                            }).catch(err => {
                                console.log(err);
                                setImageStatus("error");
                                toast.error("Invalid Image URL");
                            }).finally(() => {
                                setImageStatus("idle");
                            })

                        }} />
                </div>

            </CardContent>
            <p className="text-center text-green-500">{success? "Tool submitted successfully, you'll get a mail when your tool is published":null}</p>

            <CardFooter className="justify-center">

                <Button disabled={isLoading} type="submit" className="mt-2 tracking-wide" variant="gradient_blue"
                onClick={async () => {
                    setIsLoading(true);
                    toast.promise(submit(tool), {
                        loading: 'Submitting Tool...',
                        success: (res) => {
                            setSuccess(res ? "Tool submitted successfully" : null);
                            return res ? "Tool submitted successfully" : "Failed to submit tool";
                        },
                        error: (err) => {
                            setError(err);
                            return "Some error occurred while submitting tool. Please try again later."
                        }
                    });
                    setIsLoading(false);
                }}
                >
                    {isLoading && (
                        <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit Tool
                </Button>

            </CardFooter>
        </>)
}

async function isImageURLValid(url:string):Promise<boolean> {
    return fetch(url)
        .then((response) => {
            // Check if the HTTP status code is in the 200 range (success)
            if (response.status >= 200 && response.status < 300) {
                // Check the content type in the response headers
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.startsWith('image/')) {
                    return true; // It's a valid image URL
                }
            }
            return false; // It's not a valid image URL
        })
        .catch(() => {
            return false; // An error occurred (e.g., network issue)
        });
}