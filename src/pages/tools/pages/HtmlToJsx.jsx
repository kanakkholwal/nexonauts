import React, { useState, useCallback, useEffect } from "react";
import TextArea from "components/form-elements/TextArea";
import FormElement from "components/form-elements/FormElement";
import Label from "components/form-elements/Label";
import CodeBlock from "components/CodeBlock";
import Button from "components/buttons";
import { MdDeleteOutline, MdContentCopy, MdOutlineCode } from "react-icons/md";
import HTMLtoJSX from 'html-2-jsx';


const rawHtml = `
<!-- Hello world -->
<div class="awesome" style="border: 1px solid red">
  <label for="name">Enter your name: </label>
  <input type="text" id="name" />
</div>
<p>Enter your HTML here</p>
`;
export default function HtmlToJsxTool() {
    const [settings, setSettings] = useState({
        createFunction: false
    });
    const [state, setState] = useState({
        rawData: rawHtml,
        convertedData: "",
        loading: false,
        copying: false,
        error: false,
        output: false
    });

    useEffect(() => {
        const convertToJSX = async () => {

            const options = {
                createClass: false,
                indent: '\t'
            };

            const convertor = new HTMLtoJSX(options);

            setState({ ...state, convertedData: convertor.convert(state.rawData) });
        };

        convertToJSX();
    }, [state.rawData]);

    return (
        <div style={{ maxWidth: "720px", margin: "auto" }}>
            <FormElement>
                <TextArea outlined value={state.rawData} rows="8" name="rawData" onChange={(e) => setState({ ...state, rawData: e.target.value })} />
                <Label htmlFor="rawData">Enter Raw HTML Here</Label>
            </FormElement>
            <div className="m-auto d-flex flex-wrap justify-content-center align-items-center my-3">
                <Button onClick={() => setState({ ...state, convertedData: "", rawData: rawHtml })} size="sm" low="true" >
                    Reset Raw Data <MdOutlineCode />
                </Button>
                <Button nature="danger" onClick={() => setState({ ...state, convertedData: "", rawData: "" })} size="sm" low="true">
                    Clear <MdDeleteOutline />
                </Button>
            </div>
            {state.convertedData && <CodeBlock content={state.convertedData} title={"Converted JSX"} language="html" />}
        </div>
    );
}