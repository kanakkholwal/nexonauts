import SnackBar from "components/SnackBar";
import Button from "components/buttons";
import TextArea from "components/form-elements/TextArea";
import FormElement from "components/form-elements/FormElement";
import Label from "components/form-elements/Label";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { MdDeleteOutline, MdContentCopy } from "react-icons/md";
import { useState } from "react";
import pretty from 'pretty';

export default function HtmlMinifierPrettifier() {

    const [value, SetValue] = useState("");
    const [snackObj, SetSnackObj] = useState({ Message: "Some error Occurred", open: false });

    return (
        <div style={{ maxWidth: "720px", margin: "auto" }}>
            <FormElement>
                <TextArea outlined name="HtmlValue" rows={10} value={value} onChange={(e) => SetValue(e.target.value)} style={{ fontFamily: "var(--code-font)!important" }} />
                <Label htmlFor="HtmlValue">Enter HTML Code Here</Label>
            </FormElement>
            <div className="m-auto d-flex flex-wrap justify-content-center align-items-center">

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
                <Button nature="primary" onClick={() => {
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
            </div>
            <SnackBar {...snackObj} />
        </div >
    )
}