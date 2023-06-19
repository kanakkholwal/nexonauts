import { useState } from "react"
import TextArea from "components/form-elements/TextArea";
import FormElement from "components/form-elements/FormElement";
import Label from "components/form-elements/Label";

import Button from "components/buttons";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { MdDeleteOutline, MdContentCopy } from "react-icons/md";
import cssbeautify from 'cssbeautify';


export default function CssMinifierPrettifier() {
    const [value, SetValue] = useState("");



    return (
        <div style={{ maxWidth: "720px", margin: "auto" }}>
            <FormElement>
                <TextArea outlined id="cssField" name="CssValue" rows={10} value={value} onChange={(e) => SetValue(e.target.value)} style={{ fontFamily: "var(--code-font)" }} />
                <Label htmlFor="CssValue">Enter Css Code Here</Label>
            </FormElement>

            <div className="m-auto d-flex flex-wrap justify-content-center align-items-center">
                <Button id="minify" onClick={() => {

                    SetValue(value.replace(/([^0-9a-zA-Z\.#])\s+/g, "$1").replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1").replace(/;}/g, "}").replace(/\/\*.*?\*\//g, ""))
                }}>
                    Minify <FaCompressArrowsAlt />
                </Button>
                <Button nature="primary" id="beautify" onClick={() => SetValue(cssbeautify(value, {
                    indent: '  ',
                    autosemicolon: true
                }))}>
                    Beautify <FaExpandArrowsAlt />
                </Button>
                <Button nature="danger" onClick={() => SetValue("")}>
                    Clear <MdDeleteOutline />
                </Button>
                <Button nature="success" onClick={() => {
                    navigator.clipboard.writeText(value)
                }}>
                    Copy <MdContentCopy />
                </Button>
            </div>


        </div>
    )
}