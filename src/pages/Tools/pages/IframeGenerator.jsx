import { useState } from "react"
import Select from '../../../components/Select_Real';
import TextArea from "../../../components/TextArea.tsx";

export default function IframeGenerator() {
    const SizeType = [
        { id: 0, label: "pixels", value: "px", option: false },
        { id: 1, label: "percentage", value: "%", option: true }
    ]

    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [sizeType, setSizeType] = useState("");


    const handleSizeType = (input) => {
        setSizeType(input)
    }


    const GenerateIframe = () => {
        console.log(sizeType);
    }
    return (
        <div className="row p-2">
            <div className="col-sm-4 col-12">
                <div className="G_Form-element Form_Floating">
                    <input type="text" className="G_Form-input" name="url" placeholder="Enter the Url" value={url} onChange={(e) => setUrl(e.target.value)} />
                    <label className="G_Form-label" htmlFor="url" >Enter the Url</label>
                </div>
            </div>
            <div className="col-sm-4 col-12">
                <div className="G_Form-element Form_Floating">
                    <input type="text" className="G_Form-input" name="name" placeholder="Enter the Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label className="G_Form-label" htmlFor="name" >Enter the Name</label>
                </div>
            </div>
            <div className="col-sm-4 col-12">

                <div className="G_Form-element Form_Floating">
                    <input type="text" className="G_Form-input" name="width" placeholder="Enter width" value={width} onChange={(e) => setWidth(e.target.value)} />
                    <label className="G_Form-label" htmlFor="width" >Enter width</label>
                </div>
            </div>
            <div className="col-sm-4 col-12">

                <div className="G_Form-element Form_Floating">
                    <input type="text" className="G_Form-input" name="height" placeholder="Enter height" value={height} onChange={(e) => setHeight(e.target.value)} />
                    <label className="G_Form-label" htmlFor="height" >Enter height</label>
                </div>
            </div>
            <div className="col-sm-4 col-12">

                <div className="G_Form-element">

                    <Select options={SizeType} onChange={handleSizeType} />
                </div>
            </div>
            <TextArea col={15} row={6} className="G_Form-textarea" />
            <button onClick={GenerateIframe}>generate</button>
        </div>
    )
}