"use client";
import SnackBar from "components/SnackBar";
import Button from "components/buttons";
import TextArea from "components/form-elements/TextArea";
import FormElement from "components/form-elements/FormElement";
import Label from "components/form-elements/Label";
import { SlRefresh } from "react-icons/sl";
import { MdDeleteOutline, MdContentCopy } from "react-icons/md";
import { useState } from "react";

export default function HtmlParser() {

    const [value, SetValue] = useState("");
    const [snackObj, SetSnackObj] = useState({ Message: "Some error Occurred", open: false });

    return (
        <div style={{ maxWidth: "720px", margin: "auto" }}>
            <FormElement>
                <TextArea outlined name="HtmlValue" rows={10} value={value} onChange={(e) => SetValue(e.target.value)} style={{ fontFamily: "var(--code-font)!important" }} />
                <Label htmlFor="HtmlValue">Enter HTML Unparsed Code Here</Label>
            </FormElement>
            <div className="m-auto d-flex flex-wrap justify-content-center align-items-center">

                <Button nature="primary" onClick={() => {
                    SetValue(value.replace(/&/ig, "&amp;").replace(/</ig, "&lt;").replace(/>/ig, "&gt;").replace(/"/ig, "&quot;").replace(/'/ig, "&#039;").replace(/&#177;/ig, "&plusmn;").replace(/&#169;/ig, "&copy;").replace(/&#174;/ig, "&reg;").replace(/ya'll/ig, "ya'll"))
                    SetSnackObj({
                        ...SnackBar,
                        Message: "Parsed Successfully",
                        open: true,
                    })
                    setTimeout(() => {
                        SetSnackObj({
                            ...SnackBar,
                            open: false
                        })
                    }, 1500);
                }}>
                    Convert <SlRefresh />
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
            </div>
            <SnackBar {...snackObj} />
        </div>
    )
}