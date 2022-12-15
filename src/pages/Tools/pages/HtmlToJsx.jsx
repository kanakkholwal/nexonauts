import { useState, useCallback, useEffect } from "react";
import isSvg from "is-svg";
import TextArea from "@/components/form-elements/TextArea";
import FormElement from "@/components/form-elements/Label";
import Label from "@/components/form-elements/Label";
import CodeBlock from "@/components/CodeBlock";
import HTMLtoJSX from '@erikwithuhk/html-to-jsx';
import Button from "@/components/buttons/Button";
import { MdDeleteOutline, MdContentCopy } from "react-icons/md";

const name = "HTML to JSX";

// var converter = new HTMLtoJSX({
//     createClass: true,
//     outputClassName: 'AwesomeComponent'
// });
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



    return (<>
        <FormElement>
            <TextArea outlined value={state.rawData} name="rawData" onChange={(e) => setState({
                ...state,
                rawData: e.target.value
            })} />
            <Label for="rawData">Enter Raw HTML Here</Label>
        </FormElement>
        <div className="m-auto d-flex flex-wrap justify-content-center align-items-center">
            <Button onClick={ConvertToJSX}> Convert</Button>
            <Button nature="danger" onClick={() => setState({ ...state, convertedData: "", rawData: "" })}>
                Clear <MdDeleteOutline />
            </Button>
            <Button nature="success" onClick={() => {
                navigator.clipboard.writeText(state.convertedData)
            }}>
                Copy <MdContentCopy />
            </Button>
        </div>
        <CodeBlock content={state.convertedData} title={"Converted Jsx"} language="html" />
    </>)
}