import { GetSessionParams, getSession } from "next-auth/react"
import DashboardPage from "components/dashboard-page";
import { Card } from "components/Card";
import { Input, TextArea, Select, Label, FormGroup, FormElement } from "components/form-elements";
import ImageUpload from "components/form-elements/imageUpload";
import Head from "next/head";
import useSWR from 'swr'
import {useState} from 'react'
import axios from 'axios';
import styled from "styled-components";
import toast, { Toaster } from 'react-hot-toast';


const fetcher = (url) => axios.get(url).then(res => res.data)

export default function _AddPublicTool({ user }) {

    const { data, error, isLoading } = useSWR('/api/admin/public-tools/categories', fetcher);
    const [coverImage,setCoverImage] = useState("https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp");

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
                setCoverImage(file.secure_url)
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
        }).catch(err => {
                console.log(err);
        })
    }
    const addTheTool = async ({name,slug,description,link,categories,coverImage,state}) => {
        
        await axios.post('/api/admin/public-tools/add', {
            name,slug,description,link,categories,coverImage,state
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
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
                            <Input name="name" id="name" placeholder="Write the name.." />
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="slug">Slug</Label>
                            <Input name="slug" placeholder="Slug " id="slug" />
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="category">Categories</Label>
                            <Input name="category" placeholder="Categories... " id="category" list="categories"/>
                           
                        </FormElement>
                    </FormGroup>
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="link">Link</Label>
                            <Input name="link" placeholder="Link" id="link" />
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
                                onChange={(e) => console.log(e)}

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

                        <TextArea name="description" id="description" placeholder="Write the description">
                        </TextArea>
                    </FormElement>
                </Card>


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