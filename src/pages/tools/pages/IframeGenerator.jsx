import { useState } from "react"
import Select from 'components/form-elements/Select';
import CodeBlock from "components/CodeBlock";
import FormElement from "components/form-elements/FormElement";
import Input from "components/form-elements/Input";
import Label from "components/form-elements/Label";
import Button from "components/buttons";

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
                <FormElement>
                    <Input outlined type="text" name="url" placeholder="Enter the Url" value={url} onChange={(e) => setUrl(e.target.value)} />
                    <Label htmlFor="url" >Enter the Url</Label>
                </FormElement>
            </div>
            <div className="col-sm-4 col-12">
                <FormElement>
                    <Input outlined type="text" name="name" placeholder="Enter the Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Label htmlFor="name" >Enter the Name</Label>
                </FormElement>
            </div>
            <div className="col-sm-4 col-12">

                <FormElement>
                    <Input outlined type="text" name="width" placeholder="Enter width" value={width} onChange={(e) => setWidth(e.target.value)} />
                    <Label htmlFor="width" >Enter width</Label>
                </FormElement>
            </div>
            <div className="col-sm-4 col-12">

                <FormElement>
                    <Input outlined type="text" name="height" placeholder="Enter height" value={height} onChange={(e) => setHeight(e.target.value)} />
                    <Label htmlFor="height" >Enter height</Label>
                </FormElement>
            </div>
            <div className="col-sm-4 col-12">
                <FormElement>
                    <Select options={SizeType} onChange={(option) =>{
                        setSizeType(option.value) 
                    }} name="sizeType" />
                    <Label htmlFor="sizeType" >Size Type</Label>
                </FormElement>
            </div>
            <div className="col-sm-4 col-12">
                <FormElement>
                    <Select options={Border} onChange={(option =>{
                        setBorder(option.value)
                    })} name="Border" />
                    <Label htmlFor="Border" >Border</Label>
                </FormElement>
            </div>
            {
                isBorder && (<>
                    <div className="col-sm-4 col-12">
                        <FormElement>
                            <Select options={BorderType} onChange={option =>{
                                setBorderType(option.value)
                            }} name="BorderType" />
                            <Label htmlFor="BorderType" >BorderType</Label>
                        </FormElement>
                    </div>
                    <div className="col-sm-4 col-12">
                        <FormElement>
                            <input type="color" name="BorderColor" value={borderColor} onChange={(e) => SetBorderColor(e.target.value)} />
                            <Label htmlFor="BorderColor">BorderColor</Label>
                        </FormElement>
                    </div>
                    <div className="col-sm-4 col-12">
                        <FormElement>
                            <Input type="text" value={borderSize} onChange={(e) => SetBorderSize(e.target.value)} name="BorderWidth" />
                            <Label htmlFor="BorderWidth" >Border Width</Label>
                        </FormElement>
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