"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SnackBar from "components/SnackBar";
import Button from "components/buttons";
import { useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import pretty from 'pretty';
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { MdContentCopy, MdDeleteOutline } from "react-icons/md";

export default function HtmlMinifierPrettifier() {

    const [value, SetValue] = useState("");
    const [snackObj, SetSnackObj] = useState({ Message: "Some error Occurred", open: false });

    return (
        <div className="flex gap-2 justify-around items-start">
            <Card>
  <CardHeader>
    <CardTitle>
        HTML Minifier Prettifier
    </CardTitle>
    <CardDescription>
        Minify or Beautify your HTML code
    </CardDescription>
  </CardHeader>
  <CardContent>
    <Label htmlFor="HtmlValue">
        Enter HTML Code Here
    </Label>
  <Textarea variant="ghost" name="HtmlValue" rows={10} 
    placeholder="Enter HTML Code Here"
  value={value} onChange={(e) => SetValue(e.target.value)} style={{ fontFamily: "var(--code-font)!important" }} />
  </CardContent>
  <CardFooter>
  <Button nature="primary" onClick={() => {
                    SetValue(value.replace(/([^0-9a-zA-Z\.#])\s+/g, "$1").replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1").replace(/;}/g, "}").replace(/\/\*.*?\*\//g, ""))
                    SetSnackObj({
                        ...SnackBar,
                        Message: "Minified Successfully",
                        open: true,
                    })
                    setTimeout(() => {
                        SetSnackObj({
                            ...SnackBar,
                            open: false
                        })
                    }, 1500);
                }}>
                    Minify <FaCompressArrowsAlt />
                </Button>
                <Button nature="secondary" onClick={() => {
                    SetValue(pretty(value, { ocd: true }))
                    SetSnackObj({
                        ...SnackBar,
                        Message: "Beautified Successfully",
                        open: true,
                    })
                    setTimeout(() => {
                        SetSnackObj({
                            ...SnackBar,
                            open: false
                        })
                    }, 1500);
                }}>
                    Beautify <FaExpandArrowsAlt />

                </Button>
                <Button nature="danger" onClick={() => SetValue("")}>
                    Clear <MdDeleteOutline />
                </Button>
                <Button nature="success" onClick={() => {
                    navigator.clipboard.writeText(value).then(() => {
                        SetSnackObj({
                            ...SnackBar,
                            Message: "Copied!!",
                            open: true,

                        })
                        setTimeout(() => {
                            SetSnackObj({
                                ...SnackBar,
                                open: false
                            })
                        }, 1500);
                    }).catch(() => {
                        SetSnackObj({
                            ...SnackBar,
                            Message: "Some Error Occurred",
                            open: true,

                        })

                        setTimeout(() => {
                            SetSnackObj({
                                ...SnackBar,
                                open: false
                            })
                        }, 1500);

                    })
                }}>
                    Copy <MdContentCopy />
                </Button>
  </CardFooter>
</Card>

  
            <SnackBar {...snackObj} />
        </div >
    )
}