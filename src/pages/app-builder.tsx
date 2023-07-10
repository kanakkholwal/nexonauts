import TextInputToTextOutput from 'layouts/text_input_to_text_output';

// Types
import { newApp } from 'types/app';
// utilities
import { useReducer, useState } from 'react';
import axios from 'axios';

// Components
import styled from 'styled-components';
import Tabs from 'components/Tabs';
import Button from 'components/buttons';
import toast, { Toaster } from 'react-hot-toast';
import { Input, FormElement, FormGroup, Label, CheckBox, FormHelper, Switch, TextArea, Select, AutoComplete, InputWithIcon } from "components/form-elements"




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
                        { title: "Form Flow", id: "form-flow", content: <FormFlowTab app={app} dispatch={dispatch} /> },
                        { title: "Final", id: "final", content: <FinalTab app={app} user={user}  type={type}/> },
                    ]}

                    justified={false} />
            </EditorWrapper>

        </PageWrapper>)
}
function FormFlowTab({ app, dispatch }) {

    return (<FormGroup>

    </FormGroup>)
}
function GeneralTab({ app, dispatch }) {

    return <FormGroup>
        <FormElement>
            <Label htmlFor="appName">App Name</Label>
            <Input value={app.name} id='appName' onChange={(e) => dispatch({ type: 'setAppName', payload: e.target.value })} />
        </FormElement>
        <FormElement>
            <Label htmlFor="appId">App Id</Label>
            <Input value={app.appId} id='appId' onChange={(e) => dispatch({ type: 'setAppId', payload: e.target.value })} />
            <FormHelper>
                {process.env.NEXT_PUBLIC_WEBSITE_URL + app.path}
            </FormHelper>
        </FormElement>
        <FormElement>
            <Label htmlFor="appShortDescription">Short Description</Label>
            <Input value={app.shortDescription} id='appShortDescription' onChange={(e) => dispatch({ type: 'setAppShortDescription', payload: e.target.value })} />
        </FormElement>
        <FormElement>
            <Label htmlFor="appDescription">Description</Label>
            <TextArea value={app.description} id='appDescription' onChange={(e) => dispatch({ type: 'setAppDescription', payload: e.target.value })} ></TextArea>
        </FormElement>
        <FormElement>
            <Label htmlFor="appType">Type</Label>
            <Select value={app.type} id='appType' onChange={(option) => dispatch({ type: 'setAppType', payload: option.value })}
                options={[
                    { label: "Text Input to Text Output", value: "text_input_to_text_output" },
                    { label: "Text Input to Image Output", value: "text_input_to_image_output" },
                    { label: "Text Input to Audio Output", value: "text_input_to_audio_output" },
                    { label: "Text Input to Video Output", value: "text_input_to_video_output" },
                    { label: "Text Input to File Output", value: "text_input_to_file_output" },
                ]}
                size={"md"}
            />
        </FormElement>
        <FormElement>
            <Label htmlFor="appMembership">Membership</Label>
            <Select value={app.membership} id='appMembership' onChange={(option) => dispatch({ type: 'setAppMembership', payload: option.value })}
                options={[
                    { label: "Free", value: "free" },
                    { label: "Pro", value: "Pro" },
                    { label: "Premium", value: "premium" },
                ]}
            />
        </FormElement>
        <FormElement>
            <Label htmlFor="appCategory">Category</Label>
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
            />
        </FormElement>
        <FormElement>
            <Label htmlFor="appTags">Tags</Label>
            <AutoComplete
                id="appTags"
                onChange={(options) => dispatch({ type: 'setAppTags', payload: options })}
                placeholder={"Add Tags"}
                multiple={true}
                options={app.tags || []}
                onAdd={(option) => console.log(option)}
            />
        </FormElement>
        {/* <FormElement>
            <Label htmlFor="appAuthor">Author</Label>
            <Input value={app.author} id='appAuthor' onChange={(e) => dispatch({ type: 'setAppAuthor', payload: e.target.value })} />
        </FormElement> */}
        <FormElement>
            <Label htmlFor="appVersion">Version</Label>
            <Input value={app.version} id='appVersion' onChange={(e) => dispatch({ type: 'setAppVersion', payload: e.target.value })} />
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
    return <FormGroup>
        <Label htmlFor="appVersion">Are you sure you want to {type} this app?</Label>
        <CheckBox
            id='appVersion'
            checked={!isSure}
            onChange={(e) => {
                if (e.target.checked) setSure(false);
                else setSure(true);
            }}
        />
        <Button onClick={() => {
            toast.promise(SubmitApp(), {
                loading: type + 'ting...',
                success: 'App  '  + type+'ted!',
                error: 'Error '  + type+'ting app',
            })

        }} disabled={!isSure}>{type} </Button>

        <Toaster />
    </FormGroup>
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
max-width: 540px;
background:var(--card-bg);
border-left: 1px solid var(--border-color);
box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
border-radius: 0.5rem;

`;