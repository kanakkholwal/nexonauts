import { Input, FormElement, Label, CheckBox, FormHelper, Switch, TextArea, Select, AutoComplete, InputWithIcon } from "components/form-elements"
import Button, { IconButton } from "components/buttons"
import {useState} from "react"
import axios from "axios";

export default function TextInputToTextOutput({ app }) {

    const [message, setMsg] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState("");
    const [value, handleChange] = useForm(makeInitialObject(app.formFlow.inputs));

    const apiCall = async () => {
        setLoading(true);
        try {
            const response = await axios.post(app.apiEndpoint, value);
            setOutput(response.data);
            setMsg("Success");
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            {app.name}
            {app.shortDescription}
            <hr />


            {/* Inputs */}


            {app.formFlow.inputs.map((input:any, index:number) => {

                if (input.inputType == "text_input")
                    return <Input {...input} key={"input_" + index} value={value} onChange={handleChange} />
                else if (input.inputType == "text_multiline")
                    return <TextArea {...input} key={"input_" + index} value={value} onChange={handleChange} />
                else if (input.inputType == "dropdown")
                    return <Select {...input} key={"input_" + index} value={value} onChange={(option:any) => handleChange(option.value)} options={input.inputOptions} />
            })}


            {/* Controls */}


            {app.formFlow.controls.map((control: any, index: number) => {
                if (control.controlType == "button")
                    return <Button {...control} key={"control_" + control.id} 
                    onClick={() => {
                        !loading && console.log("clicked")
                    }}
                    className={loading ? "loading" : ""}
                    theme={control.variant}
                    >{control.text} {control.icon}</Button>
                else if (control.controlType == "icon_button")
                    return <IconButton {...control} key={"control_" + control.id}
                    onClick={() => {
                       !loading && console.log("clicked")
                    }}
                    className={loading ? "loading" : ""}
                    >{control.icon}</IconButton>
            })}


            {/* Output */}


            {app.formFlow.controls.map((control: any, index: number) => {
                if (control.controlType == "button")
                    return <Button {...control} key={"control_" + control.id} 
                    onClick={() => {
                        !loading && console.log("clicked")
                    }}
                    className={loading ? "loading" : ""}
                    theme={control.variant}
                    >{control.text} {control.icon}</Button>
                else if (control.controlType == "icon_button")
                    return <IconButton {...control} key={"control_" + control.id}
                    onClick={() => {
                       !loading && console.log("clicked")
                    }}
                    className={loading ? "loading" : ""}
                    >{control.icon}</IconButton>
            })}
        </>
    )
}

function makeInitialObject(inputs: any[]) {
    let obj = {};
    inputs.forEach(input => {
        obj["name"] = input.inputName;
        obj["defaultValue"] = input.defaultValue;
        obj["id"] = input.inputId;
        obj["placeholder"] = input.inputPlaceholder;
        obj["required"] = input.inputRequired;
    });
    return obj;
}
const useForm = (initialValues: any) => {
    const [values, setValues] = useState(initialValues);
    return [
        values,
        (e: any) => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }
    ];
}