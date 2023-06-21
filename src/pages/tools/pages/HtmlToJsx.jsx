import React, { useState,useRef } from "react";
import {FormElement,FormGroup, Select,Input,Label,TextArea} from "components/form-elements";
import CodeBlock from "components/CodeBlock";
import Button, { IconButton } from "components/buttons";
import { MdDeleteOutline, MdContentCopy,MdSettings, MdOutlineCode } from "react-icons/md";
import HTMLtoJSX from 'html-2-jsx';

import {useModal,Modal} from "components/dialog/modal";
import Collapse from "components/collapse";

const rawHtml = `<!-- Hello world -->
<div class="awesome" style="border: 1px solid red">
  <label for="name">Enter your name: </label>
  <input type="text" id="name" />
</div>
<p>Enter your HTML here</p>
`;
export default function HtmlToJsxTool() {
    const modalRef = useRef(null);
    const settingRef    = useRef(null);
    const { open :openOutput, close:closeOutput } = useModal(modalRef);
    const { open :openSettings, close:closeSettings } = useModal(settingRef);

    
    const [settings,setSettings] = useState({
        indent: '\t',
        hideComment: false,
        createClass: false,
        outputClassName: 'MyAwesomeComponent'
    })
    const [state, setState] = useState({
        rawData: rawHtml,
        convertedData: "",
        loading: false,
        copying: false,
        error: false,
        output: false,
    });

    const convertToJSX = async () => {

        openOutput();
        setState({ ...state, loading: true, error: false, output: false });
        try{
            
    
            const convertor = new HTMLtoJSX(settings);
    
            setState({ ...state, convertedData: convertor.convert(state.rawData), loading: false });
        }
        catch(e){
            console.log(e);
            setState({ ...state, loading: false, error: true });
            closeOutput();
        }

    };
   

    return (
        <div style={{ maxWidth: "720px", margin: "auto" }}>
          
            <FormElement>
                <TextArea outlined value={state.rawData} rows="8" id="rawData" onChange={(e) => setState({ ...state, rawData: e.target.value })}  placeholder="Enter raw Html to convert "/>
                <Label htmlFor="rawData">Enter Raw HTML Here</Label>
            </FormElement>
            <div className="m-auto d-flex flex-wrap justify-content-center align-items-center my-3">
                <Button onClick={() => {
                    if (state.rawData.length > 0)
                    convertToJSX();
                }} >
                    Convert
                </Button>
                <Button  nature="secondary" onClick={() => setState({ ...state, convertedData: "", rawData: rawHtml })} >
                    Reset Raw Data <MdOutlineCode />
                </Button>
                <Button nature="danger" level="low" onClick={() => setState({ ...state, convertedData: "", rawData: "" })}>
                    Clear <MdDeleteOutline />
                </Button>
                <IconButton onClick={() =>{
                openSettings()
            }}>
                <MdSettings/>
            </IconButton>
            </div>

            <Modal ref={modalRef}>
                {state.loading ? "Loading...":<CodeBlock content={state.convertedData} title={"Converted JSX"} language={settings.createClass ? "javascript":"html"} />}
            </Modal>
            <Modal ref={settingRef} ariaLabel="Settings Modal">
                <h6 className="ms-3">
                    Settings
                </h6>
                <FormGroup className="my-3">
                    <FormElement>
                        <Label htmlFor="Indentation">Indentation</Label>
                        <Select
                            name="Indentation"
                            id="Indentation"
                            options={[
                                { value: "\t", label: "Tab" },
                                { value: " ", label: "Space" }
                            ]}
                            value={settings.indent}
                            onChange={(option) => setSettings({ ...settings, indent: option.value })}


                        /></FormElement>
                    <FormElement>
                        <Label htmlFor="hideComment">Hide Comment</Label>
                        <Select
                            name="hideComment"
                            id="hideComment"
                            options={[
                                { value: true, label: "Yes" },
                                { value: false, label: "No" }
                            ]}
                            value={settings.hideComment}
                            onChange={(option) => setSettings({ ...settings, hideComment: option.value })}
                        /></FormElement>
                    <FormElement>
                        <Label htmlFor="createClass">Create Class</Label>
                        <Select
                            name="createClass"
                            id="createClass"
                            options={[
                                { value: true, label: "Yes" },
                                { value: false, label: "No" }
                            ]}
                            value={settings.createClass}
                            onChange={(option) => setSettings({ ...settings, createClass: option.value })}
                        /></FormElement>
                    <FormElement>
                        <Label htmlFor="outputClassName">Output Class Name</Label>
                        <Input
                            type="text"
                            name="outputClassName"
                            id="outputClassName"
                            value={settings.outputClassName}
                            onChange={(e) => setSettings({ ...settings, outputClassName: e.target.value })}
                            disabled={!settings.createClass}
                        /></FormElement>


                </FormGroup>

            </Modal>
        </div>
    );
}