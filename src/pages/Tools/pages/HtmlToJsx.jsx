import { useState, useCallback, useEffect } from "react";
import isSvg from "is-svg";
import TextArea from "@/components/form-elements/TextArea";
import FormElement from "@/components/form-elements/FormElement";
import Label from "@/components/form-elements/Label";
import CodeBlock from "@/components/CodeBlock";
import HTMLtoJSX from '@erikwithuhk/html-to-jsx';
import Button from "@/components/buttons/Button";
import { MdDeleteOutline, MdContentCopy, MdOutlineCode } from "react-icons/md";
import { SlRefresh } from "react-icons/sl";

const name = "HTML to JSX";

// var converter = new HTMLtoJSX({
//     createClass: true,
//     outputClassName: 'AwesomeComponent'
// });
const rawHtml = `
<!-- Hello world -->
<div class="awesome" style="border: 1px solid red">
  <label for="name">Enter your name: </label>
  <input type="text" id="name" />
</div>
<p>Enter your HTML here</p>
`
export default function HtmlToJsxTool() {
    const [settings, setSettings] = useState(name, {
        createFunction: false
    });
    const [state, setState] = useState({
        convertedData: '',
        rawData: '',
        loading: false,
        copying: false,
        error: false,
        output: false
    });
    const [_isSvg, setSvg] = useState(false);

    if (_isSvg)
        console.log("it is a svg")

    const ConvertToJSX = async () => {

        setSvg(isSvg(state.rawData));
        const converter = new HTMLtoJSX({
            createClass: false
        });
        let result = converter.convert(state.rawData);
        if (settings.createFunction) {
            result = `export const Foo = () => (${result})`;
        }

        setState({ ...state, convertedData: result })
    }



    return (
        <div style={{ maxWidth: "720px", margin: "auto" }}>
            <FormElement>
                <TextArea outlined value={state.rawData} name="rawData" onChange={(e) => setState({
                    ...state,
                    rawData: e.target.value
                })} />
                <Label for="rawData">Enter Raw HTML Here</Label>
            </FormElement>
            <div className="m-auto d-flex flex-wrap justify-content-center align-items-center my-3">
                <Button onClick={() => setState({ ...state, convertedData: "", rawData: rawHtml })}> RawData <MdOutlineCode /></Button>
                <Button onClick={ConvertToJSX}> Convert <SlRefresh /></Button>
                <Button nature="danger" onClick={() => setState({ ...state, convertedData: "", rawData: "" })}>
                    Clear <MdDeleteOutline />
                </Button>

            </div>
            <CodeBlock content={state.convertedData} title={"Converted Jsx"} language="html" />
        </div>)
}