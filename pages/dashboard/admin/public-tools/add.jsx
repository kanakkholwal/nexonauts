import { GetSessionParams, getSession } from "next-auth/react"
import DashboardPage from "components/dashboard-page";
import { Card } from "components/Card";
import { Input, TextArea, Select, Label, FormGroup, FormElement,FormHelper } from "components/form-elements";
import AutoComplete from "components/form-elements/AutoComplete";
import ImageUpload from "components/form-elements/imageUpload";
import Head from "next/head";
import useSWR from 'swr'
import {useState,useReducer} from 'react'
import axios from 'axios';
import styled from "styled-components";
import toast, { Toaster } from 'react-hot-toast';


const fetcher = (url) => axios.get(url).then(res => res.data)


export default function _AddPublicTool({ user }) {
    function reducer(state, action) {
        // create a reducer to handle the state of the form
        switch (action.type) {
            case 'SET_NAME':
                return { ...state, name: action.payload };
            case 'SET_DESCRIPTION':
                return { ...state, description: action.payload };
            case 'SET_CATEGORY':
                return { ...state, categories: action.payload };
            case 'SET_URL':
                return { ...state, url: action.payload };
            case 'SET_COVER_IMAGE':
                return { ...state, coverImage: action.payload };
            case 'SET_STATE':
                return { ...state, state: action.payload };
            case 'SET_SLUG':
                return { ...state, slug: action.payload };
            default:
                return state;
        }
        
    }
    const initialState = {
        name: '',
        description: '',
        slug: {
            current: '',
            isUnique: true,
            checking: false,
        },
        categories: [],
        url: '',
        coverImage: 'https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp',
        state: 'draft',
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const { name, description,  url, coverImage,slug, state: toolState, categories } = state;



    const { data, error, isLoading,mutate } = useSWR('/api/admin/public-tools/categories', fetcher);

    
    const handleFiles = async (files) => {

        console.log(files);
        return false;
        try {
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
            formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER);


            // upload image to cloudinary and get url
            await axios(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                data: formData
            }).then(res => {
                const file = res.data;
                // console.log(file);
                dispatch({ type: 'SET_COVER_IMAGE', payload: file.secure_url });

            }).catch(err => {
                console.log(err);
            })
        }
        catch (err) {
            console.log(err);
        }



    }
    const handleChange = async (event) => {
        const { files } = event.target;

        if (files && files.length) {
            console.log(files);
            handleFiles(files);
            toast.promise(handleFiles(files), {
                loading: 'Uploading the image',
                success: 'Image Uploaded',
                error: 'Error when uploading',
            })
        }
    }
    const addCategory = async ({name,slug}) => {
        
        await axios.post('/api/admin/public-tools/categories', {
            name, slug
        }).then(res => {
            console.log(res);
            mutate();
        }).catch(err => {
            console.log(err);
        })
    }
    const addTheTool = async ({name,slug,description,link,categories,coverImage,toolState}) => {
        
        // console.log({name,slug,description,link,categories,coverImage,state});

        console.log(state);


        return false;
        await axios.post('/api/admin/public-tools/add', {
            name,slug,description,link,categories,coverImage,state:toolState
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
    const checkSlug = async (slug) => {
        
        dispatch({ type: 'SET_SLUG', payload: {current: slug, isUnique: false,checking:true} });
        await axios.get('/api/admin/public-tools/get?slug='+slug).then(res => {
            console.log(res);
            dispatch({ type: 'SET_SLUG', payload: {current: slug, isUnique: res.data.isUnique,checking:false} });
        }).catch(err => {
            console.log(err);
            dispatch({ type: 'SET_SLUG', payload: {current: slug, isUnique: false,checking:false} });
        })
    }




    return (
        <>
            <Head>
                <title>Add New</title>
            </Head>
            <DashboardPage user={user} headerChildren={<></>}>
                <Card>
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="name">Name</Label>
                            <Input name="name" id="name" placeholder="Write the name.." 
                                value={name}
                            onChange={(e) => {
                                dispatch({ type: 'SET_NAME', payload: e.target.value });
                            }}
                            />
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="slug">Slug</Label>
                           <Input name="slug" placeholder="Slug " 
                           id="slug"
                            value={slug.current}
                                onChange={(e) => {
                                    dispatch({ type: 'SET_SLUG', payload: { current: e.target.value, isUnique: false } });
                                    if (e.target.value.length > 3) {
                                        setTimeout(() => {
                                            checkSlug(e.target.value);
                                        }, 1000);
                                    }
                                }}
                            />
                            <FormHelper>
                                {slug.checking ? <span>Checking...</span> :
                                    <>
                                        {!slug.current.length > 3 && <span>Slug length must be greater than 3.</span>}
                                        {!slug.checking && slug.current.length > 3 && !slug.isUnique && <span className="text-danger">Slug is not unique</span>}
                                        {!slug.checking && slug.current.length > 3 && slug.isUnique && <span className="text-success">Slug is unique</span>}
                                    </>}
                            </FormHelper>
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="category">Categories</Label>
                            {data?.categories &&
                                <AutoComplete
                                    name="category"
                                    id="category"

                                    options={data?.categories.map(category => ({ value: category.slug, label: category.name }))}
                                    onChange={(options) =>{
                                        console.log(options);
                                        dispatch({ type: 'SET_CATEGORY', payload: options.map((option) =>{
                                            return {
                                                name: option.label.trim(),
                                                slug: option.value.trim().toLowerCase().replace(/ /g, '-').trim()
                                            };
                                        }) });
                                    }}
                                    onAdd={(option) => {
                                        console.log(option);
                                        addCategory({
                                            name: option.label.trim(),
                                            slug: option.value.trim().toLowerCase().replace(/ /g, '-').trim()
                                        });
                                    }}
                                    multiple={true}
                                    async={true}
                                />}
                           
                        </FormElement>
                    </FormGroup>
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="link">Link</Label>
                            <Input name="link" placeholder="Link" id="link" 
                            value={url}
                            onChange={(e) => {
                                dispatch({ type: 'SET_URL', payload: e.target.value });
                            }}
                            />
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="state">State</Label>
                            <Select
                                name="state"
                                id="state"
                                options={[
                                    { value: "draft", label: "Draft" },
                                    { value: "published", label: "Published" },
                                    { value: "archived", label: "Archived" },
                                ]}
                                onChange={(option) =>{
                                    console.log(option);
                                    dispatch({ type: 'SET_STATE', payload: option.value });
                                }}

                            />
                        </FormElement>
                    </FormGroup>
                    <FormElement>
                        <Label htmlFor="coverImage">Cover Image</Label>
                        <Input name="coverImage" placeholder="Cover Image" id="coverImage" />
                        <ImageUpload label="Upload Cover Image"  onChange={handleChange} value={coverImage} />
                    </FormElement>
                    <FormElement>
                        <Label htmlFor="description">Description</Label>

                        <TextArea name="description" id="description" placeholder="Write the description"
                            value={description}
                            onChange={(e) => {
                                dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value });
                            }}
                        >
                        </TextArea>
                    </FormElement>
                </Card>
                <button onClick={addTheTool}>
                    okay
                </button>


            </DashboardPage>

            <Toaster 
                position="bottom-center"
            />
        </>
    )
}


export async function getServerSideProps(context) {


    const session = await getSession(context);

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }

    if (session?.user?.role !== 'admin') {
        console.log("You are not admin");
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }


    return {
        props: { user: session.user },
    }
}