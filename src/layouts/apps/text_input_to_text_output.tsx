import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import axios from "axios";
import Button, { IconButton } from "components/buttons";
import CodeBlock from "components/code-block";
import { AutoComplete, CheckBox, FormElement, FormGroup, FormHelper, Label, Select, TextArea } from "components/form-elements";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "components/table";
import { Interweave } from 'interweave';
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styled from "styled-components";

// new ui components
import InputField from "./view/components/input";

export default function TextInputToTextOutput({ app, user }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState(null);
    const [value, handleChange] = useForm(makeInitialObject(app?.formFlow?.inputs));

    const apiCall = async () => {
        setLoading(true);
        setOutput(null);
        // check if all required inputs are filled
        const requiredInputs = app.formFlow.inputs.filter((input) => input.inputRequired);
        const requiredInputIds = requiredInputs.map((input) => input.inputId);
        const missingRequiredInputs = requiredInputIds.filter((inputId) => !value[inputId]);
        if (missingRequiredInputs.length > 0) {
            toast.error(`Please fill in the following required inputs: ${missingRequiredInputs.join(", ")}`);
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post("/api/apps/services", {
                userId: user.id,
                appId: app.appId,
                appData: {
                    ...value
                }
            });
            setOutput(response.data.result);
            console.log(response.data.result);
        } catch (error) {
            console.log(error);
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppWrapper>
        
            <StyledInputContainer>
        
            {/* Inputs */}
            <FormGroup>
                {app.formFlow?.inputs?.map((input, index) => {
                    const { inputType, inputOptions, inputPlaceholder, ...rest } = input;
                    if (inputType === "text_input" || inputType === "number_input")
                    return <InputField input={input} key={index} value={value} onChange={handleChange} />
                    else if (inputType === "text_multiline")
                        return (<FormElement  key={index}>
                            <Label htmlFor={input.inputId}>{input.inputLabel}</Label>
                            <TextArea
                                {...rest}
                                key={"input_" + index}
                                id={input.inputId}
                                name={input.inputName}
                                placeholder={inputPlaceholder}
                                value={value[input.inputId]}
                                level={true}
                                onChange={(event) => handleChange(input.inputId, event.target.value)}
                            />
                             {input.inputHelper && <FormHelper>{input.inputHelper}</FormHelper>}
                        </FormElement>);
                    else if (inputType === "dropdown")
                        return (<FormElement  key={index}>
                            <Label htmlFor={input.inputId}>{input.inputLabel}</Label>
                            <Select
                                {...rest}
                                key={"input_" + index}
                                placeholder={inputPlaceholder}
                                id={input.inputId}
                                name={input.inputName}
                                value={value[input.inputId]}
                                onChange={(option) => handleChange(input.inputId, option.value)}
                                options={inputOptions.map((option) => ({ value: option.value, label: option.label ? option.label : option.value }))}
                            />
                          {input.inputHelper && <FormHelper>{input.inputHelper}</FormHelper>}
                        </FormElement>);

                    else if (inputType === "autoComplete")
                        return (<FormElement key={index}>
                            <Label htmlFor={input.inputId}>{input.inputLabel}</Label>
                            <AutoComplete
                                {...rest}
                                key={"input_" + index}
                                id={input.inputId}
                                name={input.inputName}
                                placeholder={inputPlaceholder}
                                value={value[input.inputId]}
                                onChange={(options) => handleChange(input.inputId, options[0]?.value ?? "")}
                                options={inputOptions.map((option) => ({ value: option.value, label: option.label ? option.label : option.value }))}
                            />
                             {input.inputHelper && <FormHelper>{input.inputHelper}</FormHelper>}
                        </FormElement>);
                    else if (inputType === "checkbox")
                        return (<FormElement key={index}>
                            <CheckBox
                                {...rest}
                                key={"input_" + index}
                                id={input.inputId}
                                name={input.inputName}
                                checked={value[input.inputId]}
                                onChange={(event) => handleChange(input.inputId, event.target.checked)}
                            />
                            <Label htmlFor={input.inputId}>{input.inputLabel}</Label>
                                {input.inputHelper && <FormHelper>{input.inputHelper}</FormHelper>}
                        </FormElement>);

                    return <div  key={index}>
                        this type is not supported
                    </div>
                    ;
                })}
            </FormGroup>
         
            {/* Controls */}
            <div className="d-flex justify-content-center align-items-center g-2 my-2 flex-wrap">
                {app.formFlow?.controls?.map((control) => {
                    if (control.action === "get_output")
                        return (
                            <Button
                                {...control}
                                key={"control_" + control.id}
                                onClick={() => {
                                    !loading && apiCall();
                                }}
                                loading={loading}
                                theme={control.variant}
                            >
                                {control.text} {control.icon && control.icon}
                            </Button>
                        );
                    else if (control.action === "refresh")
                        return (
                            <IconButton
                                {...control}
                                key={"control_" + control.id}
                                onClick={() => {
                                    !loading && console.log("clicked");
                                }}
                                className={loading ? "loading" : ""}
                            >
                                {control.icon}
                            </IconButton>
                        );
                    return null;
                })}
            </div>  
        </StyledInputContainer>
            {loading ? <div className="d-flex justify-content-center align-items-center my-3"> <Loader /></div> : null}
            {/* Output */}
        <RenderOutput output={output} loading={false} />
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                />

        </AppWrapper>
    );
}
export function RenderOutput({ output,loading }) {
    return (<Card>
        <CardHeader className="w-full flex items-start sm:items-center gap-2 sm:flex-row justify-between">
            <div>
            <CardTitle>Output</CardTitle>
            <CardDescription>
                This is the answer of the app
            </CardDescription>
            </div>
            <div>
                <Button level={true}>
                        Copy to Clipboard
                </Button>
            </div>
        </CardHeader>
        <CardContent>   
            {loading && "Generating..."}         
        {output?.map((output, index) => {
            const { outputType, data, subtype, ...rest } = output;
            if (outputType === "ordered_list")
                return (
                    <ol key={"output_" + index}>
                        {data.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ol>
                );
            else if (outputType === "unordered_list")
                return (
                    <ul key={"output_" + index}>
                        {data.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                );
            else if (outputType === "table")
                return (
                    <TableContainer key={"output_" + index}>
                        <Table>
                            <Thead>
                                <Tr>
                                    {data.columns.map((column, index) => (
                                        <Th key={index}>{column}</Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.rows.map((row, index) => (
                                    <Tr key={index}>
                                        {row.map((column, index) => (
                                            <Td key={index}>{column}</Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                );
            else if (outputType === "plaintext")
                return <Interweave content={data.trim()}/>
            else if (outputType === "code" && subtype)
                return (
                    <CodeBlock key={"output_" + index} data={data} language={subtype} />
                );
            else if (outputType === "heading" && subtype)
                return (<span className={subtype} key={"output_" + index}>{data}</span>);
            return <>
                <p>Output Type: {outputType}</p>
                <Interweave content={data}/>
            </>;
        })}
        </CardContent>
    </Card>)
}
function makeInitialObject(inputs: any[]) {
    const obj = {};
    inputs?.forEach((input: any) => {
        obj[input.inputId] = input.defaultValue || "";
    });
    return obj;
}

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    function handleChange(name, value) {
        setValues((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    }

    return [values, handleChange];
};

//  Styled Components
const AppWrapper = styled.div`
margin: 1rem auto;
padding: 1rem;
max-width: 920px;
`;

const StyledInputContainer = styled.div`
margin: 1rem auto;
padding:0.5rem;
border-radius: 0.5rem;
background-color: var(--card-bg);
border-radius: 0.5rem;
`;

const LoaderContainer = styled.div`
    --uib-size: 35px;
    --uib-speed: 0.8s;
    --uib-color: var(--primary);
    position: relative;
    display: inline-block;
    height: var(--uib-size);
    width: var(--uib-size);
    margin:auto;
    animation: spin78236 calc(var(--uib-speed) * 2.5) infinite linear;
   
   .three-body__dot {
    position: absolute;
    height: 100%;
    width: 30%;
   }
   
   .three-body__dot:after {
    content: '';
    position: absolute;
    height: 0%;
    width: 100%;
    padding-bottom: 100%;
    background-color: var(--uib-color);
    border-radius: 50%;
   }
   
   .three-body__dot:nth-child(1) {
    bottom: 5%;
    left: 0;
    transform: rotate(60deg);
    transform-origin: 50% 85%;
   }
   
   .three-body__dot:nth-child(1)::after {
    bottom: 0;
    left: 0;
    animation: wobble1 var(--uib-speed) infinite ease-in-out;
    animation-delay: calc(var(--uib-speed) * -0.3);
   }
   
   .three-body__dot:nth-child(2) {
    bottom: 5%;
    right: 0;
    transform: rotate(-60deg);
    transform-origin: 50% 85%;
   }
   
   .three-body__dot:nth-child(2)::after {
    bottom: 0;
    left: 0;
    animation: wobble1 var(--uib-speed) infinite
       calc(var(--uib-speed) * -0.15) ease-in-out;
   }
   
   .three-body__dot:nth-child(3) {
    bottom: -5%;
    left: 0;
    transform: translateX(116.666%);
   }
   
   .three-body__dot:nth-child(3)::after {
    top: 0;
    left: 0;
    animation: wobble2 var(--uib-speed) infinite ease-in-out;
   }
   
   @keyframes spin78236 {
    0% {
     transform: rotate(0deg);
    }
   
    100% {
     transform: rotate(360deg);
    }
   }
   
   @keyframes wobble1 {
    0%,
     100% {
     transform: translateY(0%) scale(1);
     opacity: 1;
    }
   
    50% {
     transform: translateY(-66%) scale(0.65);
     opacity: 0.8;
    }
   }
   
   @keyframes wobble2 {
    0%,
     100% {
     transform: translateY(0%) scale(1);
     opacity: 1;
    }
   
    50% {
     transform: translateY(66%) scale(0.65);
     opacity: 0.8;
    }
   }
   
`
const Loader = () =>{
    return (
        <LoaderContainer>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
        </LoaderContainer>);
}