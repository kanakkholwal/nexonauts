
import { InputType } from "src/types/app";
import InputField from "./components/input";
import TextBoxField from "./components/textarea";
import ComboBox from "./view/combobox";
import DropDownField from "./view/dropdown";
import RadioButtonField from "./view/radio";
import SliderField from "./view/slider";


interface TextInputToTextOutputProps {
    inputs: InputType[]
    value: any,
    handleChange: any
}
export default function TextInputToTextOutput({inputs,value,handleChange}:TextInputToTextOutputProps) {
    return <div className="flex flex-col gap-2">
        {inputs.map((input, index) => {
                        if (input.inputType === "text_input")
                            return <InputField input={input} key={index} value={value} onChange={handleChange} />
                        else if (input.inputType === "number_input")
                            return <SliderField input={input} key={index} type="number" value={value} onChange={handleChange} />
                        else if (input.inputType === "radio")
                            return <RadioButtonField input={input} key={index} value={value} onChange={handleChange} />
                        else if (input.inputType === "dropdown")
                            return <DropDownField input={input} key={index} value={value} onChange={handleChange} />
                        else if (input.inputType === "dropdown_editable")
                            return <ComboBox input={input} key={index} value={value} onChange={handleChange} />
                        else if (input.inputType === "text_multiline")
                            return <TextBoxField input={input} key={index} value={value} onChange={handleChange} />
                        else
                            return (<div key={index}>
                                <p>Field type not supported</p>
                                {input.inputType}
                            </div>)
                    })}
    
    </div>
}