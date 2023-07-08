import {useState} from "react"
import axios from "axios";
import { Input, FormElement, Label, CheckBox, FormHelper, Switch, TextArea, Select, AutoComplete, InputWithIcon } from "components/form-elements"
import Button, { IconButton } from "components/buttons";
import {Table,TableContainer,Tbody,Thead,Td,Tr,Th} from "components/table";
import CodeBlock from "components/code-block";



export default function TextInputToTextOutput({ app,user }) {


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState("");
    const [value, handleChange] = useForm(makeInitialObject(app.formFlow.inputs));

    const apiCall = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/apps/services", {
                "userId": user.id,
                "appData": {
                    "appId": app.appId,
                    ...value
                }
            });
            setOutput(response.data);

        } catch (error) {
            console.log(error);
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

                if (input.inputType === "text_input" || input.inputType === "number_input")
                    return <Input {...input} key={"input_" + index} type={input.inputType === "text_input"? "text":"number"} value={value} onChange={handleChange} />
                else if (input.inputType === "text_multiline")
                    return <TextArea {...input} key={"input_" + index} value={value} onChange={handleChange} />
                else if (input.inputType === "dropdown")
                    return <Select {...input} key={"input_" + index} value={value} onChange={(option:any) => handleChange(option.value)} options={input.inputOptions} />
                else if (input.inputType == "autoComplete")
                    return <AutoComplete {...input} key={"input_" + index} value={value} onChange={(option:any) => handleChange(option.value)} options={input.inputOptions} />
            })}


            {/* Controls */}


            {app.formFlow.controls.map((control: any) => {
                if (control.action === "get_output")
                    return <Button {...control} key={"control_" + control.id} 
                    onClick={() => {
                        !loading && apiCall()
                    }}
                    className={loading ? "loading" : ""}
                    theme={control.variant}
                    >{control.text} {control.icon && control.icon}</Button>
                else if (control.action == "refresh")
                    return <IconButton {...control} key={"control_" + control.id}
                    onClick={() => {
                       !loading && console.log("clicked")
                    }}
                    className={loading ? "loading" : ""}
                    >{control.icon}</IconButton>
            })}


            {/* Output */}


             {app.formFlow.outputs.map((output: any, index: number) => {
                if (output.type == "ordered_list")
                    return <ol key={"output_" + index}>{output.data.map((item:string,index:number) => <li key={index}>{item}</li>)}</ol>
                else if (output.type == "unordered_list")
                    return <ul key={"output_" + index}>{output.data.map((item:string,index:number) => <li key={index}>{item}</li>)}</ul>
                else if  (output.type == "table")
                    return <TableContainer key={"output_" + index}>
                        <Table>
                            <Thead>
                                <Tr>
                                    {output.data.columns.map((column:string, index:number) => <Th key={index}>{column}</Th>)}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {output.data.rows.map((row:any, index:number) => <Tr key={index}>
                                    {row.map((column:string, index:number) => <Td key={index}>{column}</Td>)}
                                </Tr>)}
                            </Tbody>
                        </Table>
                    </TableContainer>
                else if (output.type == "plaintext")
                    return <p key={"output_" + index}>{output.data}</p>
                else if (output.type == "code" && output.subtype)
                    return <CodeBlock key={"output_" + index} data={output.data} language={output.subtype}/>
                
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