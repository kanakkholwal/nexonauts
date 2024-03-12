"use client"
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const bgColors = {
    "mono":[
        {
            "name":"White",
            "value":"bg-white"
        },
        {
            "name":"Black",
            "value":"bg-black"
        },
        {
            "name":"Gray",
            "value":"bg-gray-100"
        },
        {
            "name":"Dark Gray",
            "value":"bg-gray-800"
        },
        {
            "name":"Blue",
            "value":"bg-blue-100"
        },
        {
            "name":"Dark Blue",
            "value":"bg-blue-800"
        },
        {
            "name":"Green",
            "value":"bg-green-100"
        },
        {
            "name":"Dark Green",
            "value":"bg-green-800"
        },
        {
            "name":"Red",
            "value":"bg-red-100"
        },
        {
            "name":"Dark Red",
            "value":"bg-red-800"
        },
        {
            "name":"Yellow",
            "value":"bg-yellow-100"
        },
        {
            "name":"Dark Yellow",
            "value":"bg-yellow-800"
        },
        {
            "name":"Purple",
            "value":"bg-purple-100"
        },
        {
            "name":"Dark Purple",
            "value":"bg-purple-800"
        },
        {
            "name":"Cyan",
            "value":"bg-cyan-100"
        },
        {
            "name":"Dark Cyan",
            "value":"bg-cyan-800"
        },
        {
            "name":"Sky",
            "value":"bg-sky-100"
        },
        {
            "name":"Dark Sky",
            "value":"bg-sky-800"
        },
        {
            "name":"Indigo",
            "value":"bg-indigo-100"
        },
        {
            "name":"Dark Indigo",
            "value":"bg-indigo-800"
        },
        {
            "name":"Pink",
            "value":"bg-pink-100"
        },
        {
            "name":"Dark Pink",
            "value":"bg-pink-800"
        },
        {
            "name":"Lime",
            "value":"bg-lime-100"
        },
        {
            "name":"Dark Lime",
            "value":"bg-lime-800"
        },
    ]
}

export default function Tool() {
    const [bgColor, setBgColor] = useState("bottom")


    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Background Color
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {Object.keys(bgColors).map((key) => {
                    return (
                        <div key={key}>
                            <DropdownMenuLabel>
                                {key}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={bgColor} onValueChange={setBgColor}>
                                {bgColors[key].map((color) => {
                                    return (
                                        <DropdownMenuRadioItem key={color.value} value={color.value}>
                                            {color.name}
                                        </DropdownMenuRadioItem>
                                    )
                                })}
                            </DropdownMenuRadioGroup>
                        </div>
                    )
                })}
                
            </DropdownMenuContent>
        </DropdownMenu>

    </>
}