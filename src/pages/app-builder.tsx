import TextInputToTextOutput from 'layouts/text_input_to_text_output';

// Types
import { newApp, } from 'types/app';
// utilities
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import type {Input as InputType,Options} from "types/app"
// Components
import styled from 'styled-components';
import Tabs from 'components/Tabs';
import Button, { IconButton } from 'components/buttons';
import toast, { Toaster } from 'react-hot-toast';
import { Input, FormElement, FormGroup, Label, CheckBox, FormHelper, Switch, TextArea, Select, AutoComplete, InputWithIcon } from "components/form-elements"

// Icons 
import { TbCircleMinus,TbCirclePlus } from 'react-icons/tb';



export default function AppBuilder({ user ,app : defaultApp,type = "submit"}:{
    user: any,
    app?: newApp,
    type?: "submit" | "update",
}) {
    const initialState = {
        app: defaultApp ? defaultApp :{
            appId: "",
            enabled: false,
            name: "",
            shortDescription: "",
            description: "",
            type: "text_input_to_text_output",
            membership: "free",
            category: "",
            tags: [],
            author: {
                name: user.name,
                id: user.id,
                username: user.username,
            },
            path: "/apps/",
            version: "0.0.1",
            recommended: false,
            createdAt: new Date(),
            ratings: [],
            reviews: [],
            usage: [],
            formFlow: {
                menuType: "text_input_to_text_output",
                inputs: [],
                outputs: [],
                controls: [],
            }
        } as newApp,
    };

    function reducer(state: any, action: any) {
        switch (action.type) {
            case 'setApp':
                return { ...state, app: action.payload };
            case 'setAppId':
                return { ...state, app: { ...state.app, appId: action.payload, path: "/apps/" + action.payload.split("_").join("-") } };
            case 'setAppEnabled':
                return { ...state, app: { ...state.app, enabled: action.payload } };
            case 'setAppName':
                return { ...state, app: { ...state.app, name: action.payload } };
            case 'setAppShortDescription':
                return { ...state, app: { ...state.app, shortDescription: action.payload } };
            case 'setAppDescription':
                return { ...state, app: { ...state.app, description: action.payload } };
            case 'setAppType':
                return { ...state, app: { ...state.app, type: action.payload, formFlow: { ...state.app.formFlow, menuType: action.payload } } };
            case 'setAppMembership':
                return { ...state, app: { ...state.app, membership: action.payload } };
            case 'setAppCategory':
                return { ...state, app: { ...state.app, category: action.payload } };
            case 'setAppTags':
                return { ...state, app: { ...state.app, tags: action.payload } };
            case 'setAppAuthor':
                return { ...state, app: { ...state.app, author: action.payload } };
            case 'setAppPath':
                return { ...state, app: { ...state.app, path: action.payload } };
            case 'setAppVersion':
                return { ...state, app: { ...state.app, version: action.payload } };
            case 'setAppRecommended':
                return { ...state, app: { ...state.app, recommended: action.payload } };
            case 'setAppCreatedAt':
                return { ...state, app: { ...state.app, createdAt: action.payload } };
            case 'setAppRatings':
                return { ...state, app: { ...state.app, ratings: action.payload } };
            case 'setAppReviews':
                return { ...state, app: { ...state.app, reviews: action.payload } };
            case 'setAppUsage':
                return { ...state, app: { ...state.app, usage: action.payload } };
            case 'setAppFormFlowInput':
                return { ...state, app: { ...state.app, formFlow: { ...state.app.formFlow, inputs: action.payload } } };
            case 'setAppFormFlowOutput':
                return { ...state, app: { ...state.app, formFlow: { ...state.app.formFlow, outputs: action.payload } } };
            case 'setAppFormFlowControl':
                return { ...state, app: { ...state.app, formFlow: { ...state.app.formFlow, controls: action.payload } } };

            default:
                return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { app } = state;

    console.log(app);

    return (
        <PageWrapper>
            <PreviewWrapper>
                {(app.type === "text_input_to_text_output") && <TextInputToTextOutput user={user} app={app} />}
            </PreviewWrapper>
            <EditorWrapper>
                <Tabs
                    TabList={[
                        { title: "General", id: "general", content: <GeneralTab app={app} dispatch={dispatch} /> },
                        { title: "Inputs", id: "input-flow", content: <InputFlowTab app={app} dispatch={dispatch} /> },
                        { title: "Controls ", id: "control-flow", content: <ControlFlowTab app={app} dispatch={dispatch} /> },
                        { title: "Final", id: "final", content: <FinalTab app={app} user={user}  type={type}/> },
                    ]}

                    align={"space-evenly"} 
                    filled={true}
                    variant={"dark"}
                    sm={true}
                    
                    />
            </EditorWrapper>

        </PageWrapper>)
}
// generate Form Flow Input and controls
function InputFlowTab({ app, dispatch }) {

    const [newInput, setNewInput] = useState<InputType>({
    inputType: "",
    inputName: "",
    inputId: "",
    inputLabel:"",
    inputValue: "",
    inputPlaceholder: "",
    inputRequired:false,
    inputHelper: "",
    constraints:{},
    inputOptions: [],
    });
   

    return (<>
        {/* new Input */}
        <FormGroup className='g-0'>
            <FormElement>
                <Label sm={true} htmlFor="InputType">Type</Label>
                <Select id="InputType" value={newInput.inputType} onChange={(option) => setNewInput({ ...newInput, inputType: option.value })}
                    options={[
                        { label: "Text", value: "text_input" },
                        { label: "Number", value: "number_input" },
                        { label: "TextArea", value: "text_multiline" },
                        { label: "Select", value: "dropdown" },
                        { label: "Auto Complete", value: "autoComplete" },
                        { label: "Radio", value: "radio" },
                        { label: "Checkbox", value: "checkbox" },
                    ]}
                    size='sm'
                />
            </FormElement>
        </FormGroup>
        {newInput.inputType.length > 0 && <>
            <FormGroup className='g-0'>
                <FormElement>
                    <Label sm={true} htmlFor="InputName">Name</Label>
                    <Input sm={true} value={newInput.inputName}  id='InputName' placeholder='Enter the name' onChange={(e) => setNewInput({ ...newInput, inputName: e.target.value })} />
                </FormElement>
                <FormElement>
                    <Label sm={true} htmlFor="InputId">Id</Label>
                    <Input sm={true} value={newInput.inputId} id='InputId'  placeholder='@variable' required onChange={(e) => setNewInput({ ...newInput, inputId: e.target.value })} />
                </FormElement>
                <FormElement>
                    <Label sm={true} htmlFor="InputLabel">Label</Label>
                    <Input sm={true} value={newInput.inputLabel} id='InputLabel'  placeholder='Enter the label' onChange={(e) => setNewInput({ ...newInput, inputLabel: e.target.value })} />
                </FormElement>
                <FormElement>
                    <Label sm={true} htmlFor="InputValue">Value</Label>
                    <Input sm={true} value={newInput.inputValue} id='InputValue' 
                    placeholder='Enter the value'
                    onChange={(e) => setNewInput({ ...newInput, inputValue: e.target.value })} />
                </FormElement>
                {(newInput.inputType === "dropdown" || newInput.inputType === "autoComplete" || newInput.inputType === "radio") && <div>
                    <Label>Options </Label>
                    <FormGroup className='g-0'>
                        {newInput.inputOptions.map((option, index) => {
                            return (<div className='d-flex align-items-center g-1' key={index}>

                                <Input
                                    id='InputOptionLabel'
                                    onChange={(e) => {
                                        let temp = [...newInput.inputOptions]
                                        temp[index].label = e.target.value
                                        setNewInput({ ...newInput, inputOptions: temp })
                                    }}
                                    value={option.label}
                                    placeholder='label'
                                    sm={true}
                                />
                                <Input
                                    id='InputOptionValue'
                                    value={option.value}
                                    placeholder='value'
                                    onChange={(e) => {
                                        let temp = [...newInput.inputOptions]
                                        temp[index].value = e.target.value
                                        setNewInput({ ...newInput, inputOptions: temp })
                                    }} sm={true} />
                                <IconButton
                                    onClick={() => {
                                        let temp = [...newInput.inputOptions]
                                        temp.splice(index, 1)
                                        setNewInput({ ...newInput, inputOptions: temp })
                                    }}
                                    size='sm'
                                    nature='danger'
                                ><TbCircleMinus size={16} /></IconButton>
                            </div>)
                        })
                        }
                    </FormGroup>
                    <Button
                        onClick={() => {
                            let temp = [...newInput.inputOptions]
                            temp.push({ label: "", value: "" })
                            setNewInput({ ...newInput, inputOptions: temp })
                        }}
                        type='button'
                        nature="info"
                        size="sm"
                        level={true}

                    >Add New <TbCirclePlus size={16} /></Button>

                </div>}
              {(newInput.inputType === "text_input" || newInput.inputType === "number_input"  || newInput.inputType === "text_multiline" || newInput.inputType === "autoComplete")&& <FormElement>
                    <Label sm={true} htmlFor="InputPlaceholder">Placeholder</Label>
                    <Input sm={true} value={newInput.inputPlaceholder} id='InputPlaceholder'
                    placeholder='Enter the placeholder'
                    onChange={(e) => setNewInput({ ...newInput, inputPlaceholder: e.target.value })} />
                </FormElement>}
                <FormElement>
                    <Label sm={true} htmlFor="InputRequired">Required Input ? </Label>
                    <CheckBox
                      id='InputRequired'
                      checked={!newInput.inputRequired}
                      onChange={(e) => {
                          if (e.target.checked) setNewInput({ ...newInput, inputRequired: false })
                          else setNewInput({ ...newInput, inputRequired: true })
                      }}
                     />
                </FormElement>
                <FormElement>
                    <Label sm={true} htmlFor="InputHelper">Helper Text</Label>
                    <Input sm={true} value={newInput.inputHelper} id='InputHelper' 
                    placeholder='Enter the helper'
                    onChange={(e) => setNewInput({ ...newInput, inputHelper: e.target.value })} />
                </FormElement>
            </FormGroup>

        </>}
        <Button 
            onClick={() => {
                if(ValidateNewInput(newInput)?.isValid === false) {
                    alert(ValidateNewInput(newInput)?.message)
                    return;
                }

                if (app.formFlow.inputs.length === 0) {
                    dispatch({ type: 'setAppFormFlowInput', payload: [newInput] })
                }
                else {
                    dispatch({ type: 'setAppFormFlowInput', payload: [...app.formFlow.inputs, newInput]})
                }
                setNewInput({
                    inputType: "",
                    inputName: "",
                    inputId: "",
                    inputLabel: "",
                    inputValue: "",
                    inputPlaceholder: "",
                    inputRequired: false,
                    inputHelper: "",
                    constraints: {},
                    inputOptions: [],
                })
            }}
        type='button'
        nature="info"
        level={true}
        >Add Field</Button>



    </>)

}
function ControlFlowTab({ app,dispatch }) {

   
    return <FormGroup>
        
    </FormGroup>
}
function GeneralTab({ app, dispatch }) {

    return <FormGroup>
        <FormElement  size="sm">
            <Label sm={true} htmlFor="appName">App Name</Label>
            <Input sm={true} value={app.name} id='appName' onChange={(e) => dispatch({ type: 'setAppName', payload: e.target.value })} />
        </FormElement>
        <FormElement size="sm">
            <Label sm={true} htmlFor="appId">App Id</Label>
            <Input sm={true} value={app.appId} id='appId' required onChange={(e) => dispatch({ type: 'setAppId', payload: e.target.value })} />
            <FormHelper>
                {process.env.NEXT_PUBLIC_WEBSITE_URL + app.path}
            </FormHelper>
        </FormElement>
        <FormElement  size="sm">
            <Label sm={true} htmlFor="appShortDescription">Short Description</Label>
            <TextArea sm={true} value={app.shortDescription} id='appShortDescription' onChange={(e) => dispatch({ type: 'setAppShortDescription', payload: e.target.value })} />
        </FormElement>
        <FormElement  size="sm">
            <Label sm={true} htmlFor="appDescription">Description</Label>
            <TextArea  sm={true}   value={app.description} id='appDescription' onChange={(e) => dispatch({ type: 'setAppDescription', payload: e.target.value })} ></TextArea>
        </FormElement>
        <FormElement  size="sm">
            <Label sm={true} htmlFor="appType">Type</Label>
            <Select value={app.type} id='appType' onChange={(option) => dispatch({ type: 'setAppType', payload: option.value })}
                options={[
                    { label: "Text Input to Text Output", value: "text_input_to_text_output" },
                    { label: "Text Input to Image Output", value: "text_input_to_image_output" },
                    { label: "Text Input to Audio Output", value: "text_input_to_audio_output" },
                    { label: "Text Input to Video Output", value: "text_input_to_video_output" },
                    { label: "Text Input to File Output", value: "text_input_to_file_output" },
                ]}
                size="sm"
            />
        </FormElement>
        <FormElement  size="sm">
            <Label sm={true} htmlFor="appMembership">Membership</Label>
            <Select value={app.membership} id='appMembership' onChange={(option) => dispatch({ type: 'setAppMembership', payload: option.value })}
                options={[
                    { label: "Free", value: "free" },
                    { label: "Pro", value: "Pro" },
                    { label: "Premium", value: "premium" },
                ]}
                size='sm'
            />
        </FormElement>
        <FormElement  size="sm">
            <Label sm={true} htmlFor="appCategory">Category</Label>
            <Select value={app.category} id='appCategory' onChange={(option) => dispatch({ type: 'setAppCategory', payload: option.value })}
                options={[
                    { label: "Education", value: "education" },
                    { label: "Personal", value: "personal" },
                    { label: "Career", value: "career" },
                    { label: "Business", value: "business" },
                    { label: "Health", value: "health" },
                    { label: "Fitness", value: "fitness" },
                    { label: "Lifestyle", value: "lifestyle" },
                    { label: "Sales & Marketing", value: "sales_and_marketing" },
                    { label: "Finance", value: "finance" },
                    { label: "Productivity", value: "productivity" },
                    { label: "Social", value: "social" },
                    { label: "Entertainment", value: "entertainment" },
                ]}
                size='sm'
            />
        </FormElement>
        <FormElement  size="sm">
            <Label sm={true} htmlFor="appTags">Tags</Label>
            <AutoComplete
                id="appTags"
                onChange={(options) => dispatch({ type: 'setAppTags', payload: options })}
                placeholder={"Add Tags"}
                multiple={true}
                options={app.tags || []}
                onAdd={(option) => console.log(option)}
                size="sm"
            />
        </FormElement>
        {/* <FormElement>
            <Label sm={true} htmlFor="appAuthor">Author</Label>
            <Input sm={true} value={app.author} id='appAuthor' onChange={(e) => dispatch({ type: 'setAppAuthor', payload: e.target.value })} />
        </FormElement> */}
        <FormElement  size="sm">
            <Label sm={true} htmlFor="appVersion">Version</Label>
            <Input sm={true} value={app.version} id='appVersion' onChange={(e) => dispatch({ type: 'setAppVersion', payload: e.target.value })} />
        </FormElement>
    </FormGroup>
}

function FinalTab({ app, user ,type="submit"}) {

    const [isSure, setSure] = useState(false);
    const SubmitApp = async () => {
        try {
            const response = await axios.post('/api/apps/' + type, {
                userId: user.id as string,
                appData: app as newApp,
            });
            console.log(response);
        }
        catch (e) {
            console.log(e);
            if(e.response.status ===401) 
            {
                toast.error("You are not authorized to submit this app");
            }
            else if (e.response.status === 403) {
                toast.error("App with this id already exists");
            }
            
        }
    }
    return <>
        <FormElement size="sm">
            <CheckBox
                id='InputRequired'
                checked={!isSure}
                onChange={(e) => {
                    if (e.target.checked) setSure(false);
                    else setSure(true);
                }}
            />
            <Label sm={true} htmlFor="InputRequired">Are you sure you want to {type} this app?</Label>
        </FormElement>
        <Button onClick={() => {
            toast.promise(SubmitApp(), {
                loading:(type === "update" ? "updating...":"submitting...") ,
                success: 'App  ' + (type === "update" ? "updated":"submitted") + ' successfully',
                error: 'Error ' + (type === "update" ? "updating":"submitting") + ' app',
            })

        }} disabled={!isSure}>{type} </Button>

        <Toaster />
    </>
}




const PageWrapper = styled.div`
position: relative;
width: 100%;
height: 100%;
min-height: 100vh;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: stretch;
gap: 1rem;
`;
const PreviewWrapper = styled.div`
position: relative;
width: 100%;
height: 100%;
min-height: 100vh;
`;
const EditorWrapper = styled.div`
position: relative;
top: 0;
right: 0;
bottom: 0;
height: 100%;
width: 100%;
// max-width: 262px;
background:var(--card-bg);
border-left: 1px solid var(--border-color);
box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
border-radius: 0.5rem;

`;



const ValidateNewInput  = (Input : InputType) => {
    
       
    // check if inputType is valid
    if (Input.inputType.length === 0) {
        return { isValid: false, message: "Input Type is required" };
    }
    if (Input.inputType !== "text_input" && Input.inputType !== "number_input" && Input.inputType !== "text_multiline" && Input.inputType !== "dropdown" && Input.inputType !== "autoComplete" && Input.inputType !== "radio" && Input.inputType !== "checkbox") {
        return { isValid: false, message: "Input Type is invalid" };
    }
    // check if inputName is valid
    if (Input.inputName.length === 0) {
        return { isValid: false, message: "Input Name is required" };
    }
    if (Input.inputName.length < 2 || Input.inputName.length > 50) {
        return { isValid: false, message: "Input Name must be between 2 and 50 characters" };
    }
    // check if inputId is valid
    if (Input.inputId.length === 0) {
        return { isValid: false, message: "Input Id is required" };
    }
    if (Input.inputId.length < 2 || Input.inputId.length > 50) {
        return { isValid: false, message: "Input Id must be between 2 and 50 characters" };
    }
    // check if inputLabel is valid
    if (Input.inputLabel.length === 0) {
        return { isValid: false, message: "Input Label is required" };
    }
    if (Input.inputLabel.length < 2 || Input.inputLabel.length > 50) {
        return { isValid: false, message: "Input Label must be between 2 and 50 characters" };
    }
    // check if inputPlaceholder is valid
    if (Input.inputPlaceholder.length === 0) {
        return { isValid: false, message: "Input Placeholder is required" };
    }
    if (Input.inputPlaceholder.length < 2) {
        return { isValid: false, message: "Input Placeholder must be between 2 characters" };
    }
    // check if inputHelper is valid
    if (Input.inputHelper) {
        if (Input.inputHelper.length < 2 || Input.inputHelper.length > 100) {
            return { isValid: false, message: "Input Helper must be between 2 and 100 characters" };
        }
    }
    // check if InputOptions is valid
    if (Input.inputOptions.length > 0) {
        if (Input.inputOptions.length < 2) {
            return { isValid: false, message: "Input Options must be at least 2" };
        }
        Input.inputOptions.forEach((option) => {
            // check if inputOptions label is valid
            if (option.label.length === 0) {
                return { isValid: false, message: "Input Option Label is required" };
            }
            if (option.label.length < 2 || option.label.length > 50) {
                return { isValid: false, message: "Input Option Label must be between 2 and 50 characters" };
            }
            // check if inputOptions value is valid
            if (option.value.length === 0) {
                return { isValid: false, message: "Input Option Value is required" };
            }
            if (option.value.length < 2 || option.value.length > 50) {
                return { isValid: false, message: "Input Option Value must be between 2 and 50 characters" };
            }
        })
    }
    // check if constraints is valid
    if (Input.constraints.length > 0) {
        if (Input.constraints.length < 2 || Input.constraints.length > 50) {
            return { isValid: false, message: "Input Constraints must be between 2 and 50 characters" };
        }
    }
    

}