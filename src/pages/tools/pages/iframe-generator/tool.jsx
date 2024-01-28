"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CodeBlock from "components/CodeBlock";


export default function IframeGenerator() {
    const SizeType = [
        { label: "pixels", value: "px", option: false },
        { label: "percentage", value: "%", option: true }
    ]
    const Border = [
        { label: "Yes", value: true, option: false },
        { label: "No", value: false, option: true }
    ]
    const BorderType = [
        { label: "none", value: "none", option: false },
        { label: "hidden", value: "hidden", option: false },
        { label: "solid", value: "solid", option: true },
        { label: "dotted", value: "dotted", option: false },
        { label: "dashed", value: "dashed", option: false },
    ]

    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [width, setWidth] = useState("640");
    const [height, setHeight] = useState("480");
    const [sizeType, setSizeType] = useState("px");
    const [isBorder, setBorder] = useState(false);
    const [borderType, setBorderType] = useState("hidden");
    const [borderColor, SetBorderColor] = useState("#eee");
    const [borderSize, SetBorderSize] = useState("1");

    const [Code, SetCode] = useState("");




    const GenerateIframe = () => {
        SetCode(`
<iframe 
      src="${url}"  
 ${isBorder && `     style="${isBorder && `border:${borderSize + "px"} ${borderColor} ${borderType ?? "solid"};`}"`} 
      name="${name}" 
      height="${height + (sizeType ?? "px")}" 
      width="${width + (sizeType ?? "px")}"
      allowfullscreen>
    </iframe>`)
    }

    return (
        <div className="row p-2">
            <div className="col-sm-4 col-12">
                <div className="grid w-full gap-2">
                    <Input outlined type="text" name="url" placeholder="Enter the Url" value={url} onChange={(e) => setUrl(e.target.value)} />
                    <Label htmlFor="url" >Enter the Url</Label>
                </div>
            </div>
            <div className="col-sm-4 col-12">
                <div className="grid w-full gap-2">
                    <Input outlined type="text" name="name" placeholder="Enter the Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Label htmlFor="name" >Enter the Name</Label>
                </div>
            </div>
            <div className="col-sm-4 col-12">

                <div className="grid w-full gap-2">
                    <Input outlined type="text" name="width" placeholder="Enter width" value={width} onChange={(e) => setWidth(e.target.value)} />
                    <Label htmlFor="width" >Enter width</Label>
                </div>
            </div>
            <div className="col-sm-4 col-12">

                <div className="grid w-full gap-2">
                    <Input outlined type="text" name="height" placeholder="Enter height" value={height} onChange={(e) => setHeight(e.target.value)} />
                    <Label htmlFor="height" >Enter height</Label>
                </div>
            </div>
            <div className="col-sm-4 col-12">
                <div className="grid w-full gap-2">
                    <Label htmlFor="sizeType" >Size Type</Label>

                    <Select
                        name="sizeType"
                        onValueChange={(value) => {
                            setSizeType(value)

                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Size Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {SizeType.map((item) => {
                                return (
                                    <SelectItem
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </SelectItem>
                                )
                            })}
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>


                </div>
            </div>
            <div className="col-sm-4 col-12">
                <div className="grid w-full gap-2">
                    <Label htmlFor="Border" >Border</Label>
                    <Select
                        name="Border"

                        onValueChange={(value) => {
                            setBorder(value)

                        }
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Border" />
                        </SelectTrigger>
                        <SelectContent>
                            {Border.map((item) => {
                                return (
                                    <SelectItem
                                        key={item.value}
                                        value={item.value}
                                    >
                                        {item.label}
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>


                </div>
            </div>
            {
                isBorder && (<>
                    <div className="col-sm-4 col-12">
                        <div className="grid w-full gap-2">
                            <Label htmlFor="BorderType" >BorderType</Label>
                            <Select
                                name="BorderType"
                                onValueChange={(value) => {
                                    setBorderType(value)

                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="BorderType" />
                                </SelectTrigger>
                                <SelectContent>
                                    {BorderType.map((item) => {
                                        return (
                                            <SelectItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        )
                                    }
                                    )}
                                </SelectContent>
                            </Select>
                        
                        </div>
                    </div>
                    <div className="col-sm-4 col-12">
                        <div className="grid w-full gap-2">
                            <Label htmlFor="BorderColor">BorderColor</Label>
                            <Input type="color" name="BorderColor" value={borderColor} onChange={(e) => SetBorderColor(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-sm-4 col-12">
                        <div className="grid w-full gap-2">
                            <Input type="text" value={borderSize} onChange={(e) => SetBorderSize(e.target.value)} name="BorderWidth" />
                            <Label htmlFor="BorderWidth" >Border Width</Label>
                        </div>
                    </div>
                </>)
            }
            <div className="m-auto">
                <Button onClick={GenerateIframe}>Generate</Button>
            </div>
            {
                Code && <CodeBlock content={Code} language="html" title="Iframe Generated Code" />
            }

        </div>
    )
}