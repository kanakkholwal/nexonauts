"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CodeBlock from "components/CodeBlock";
import { useState } from "react";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { MdContentCopy, MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";

export default function JsonMinifierPrettifier() {
    const [value, setValue] = useState("");
    const [output, setOutput] = useState("");

    return (
        <div className="flex gap-2 justify-around items-start w-full flex-col lg:flex-row">
            <Card className="grow w-full">
                <CardHeader>
                    <CardTitle>Input</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="JsonValue">Enter Json Code Here</Label>
                    <Textarea
                        variant="fluid"
                        name="JsonValue"
                        rows={10}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        style={{ fontFamily: "var(--code-font)!important" }}
                    />
                </CardContent>

                <CardFooter className="justify-center gap-4">
                    <Button
                        onClick={() => {
                            setOutput(
                                value
                                    .replace(/([^0-9a-zA-Z\.#])\s+/g, "$1")
                                    .replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1")
                                    .replace(/;}/g, "}")
                                    .replace(/\/\*.*?\*\//g, "")
                            );
                            toast.success("Minified!!!");
                        }}
                    >
                        Minify <FaCompressArrowsAlt className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                        variant="dark"
                        onClick={() => {
                            function replace(matchedStr: string) {
                                return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
                            }
                            let beautified = JSON.stringify(value, null, 4).replace(/(\w+:)|(\w+ :)/g, replace);
                            setOutput(beautified);
                        }}
                    >
                        Beautify <FaExpandArrowsAlt className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="destructive" onClick={() => setValue("")}>
                        Clear <MdDeleteOutline className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            navigator.clipboard
                                .writeText(value)
                                .then(() => {
                                    toast.success("Copied!!");
                                })
                                .catch(() => {
                                    toast.error("Something went wrong!!");
                                });
                        }}
                    >
                        Copy <MdContentCopy className="w-4 h-4 ml-2" />
                    </Button>
                </CardFooter>
            </Card>
            <Card className="grow w-full">
                <CardHeader>
                    <CardTitle>Output</CardTitle>
                </CardHeader>
                <CardContent>
                    {output ? (
                        <CodeBlock language="js" title="Output JSON" content={output} />
                    ) : (
                        "Paste JSON in input box to get started"
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
