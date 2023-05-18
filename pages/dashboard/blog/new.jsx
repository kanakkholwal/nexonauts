import { getSession } from "next-auth/react"
import DashboardPage, { Header } from "components/dashboard-page";
import Button from "components/buttons";
import State from "components/state";
import { Card, CardHeader, CardBody } from "components/Card";
import { Input, FormElement, Label, TextArea, FormHelper,Switch, FileInput } from "components/form-elements";
import Head from "next/head";
import Link from 'next/link';
import {  useRef, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import Image from 'next/image';
import JoditEditor from "components/editor/jodit";

import { BiEditAlt } from "react-icons/bi"
import { AiOutlineLink } from "react-icons/ai"
import { CiHashtag } from "react-icons/ci"
import { TbFileDescription } from "react-icons/tb";


const SettingPanel = styled(Card)`
@media (min-width: 600px){
    position:sticky;
    top:0;
    max-width: max-content;
}
svg{
    margin-inline:0.5rem;
}
`;


export default function NewPost({ user }) {
    const editor = useRef(null);

    const [state, setState] = useState({
        loader: {
            type: "indeterminate",
            shape: "linear",
            show: false,
        },
        alert: {
            open: false,
            message: "",
            nature: "success",
        }

    });
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState(``);
    const [image, setImage] = useState("");
    const [imageState, setImageState] = useState({
        loader: {
            type: "indeterminate",
            shape: "linear",
            show: false,
        },
        alert: {
            open: false,
            message: "Fetching post data...",
            nature: "info",
        }

    }); 
    const [postState, setPostState] = useState("draft");
    const [labels, setLabel] = useState([]);
    const [IsCommentEnabled, setIsCommentEnabled] = useState(true);
    const [slug, setSlug] = useState(title?.toLocaleLowerCase().split(" ").join("-"));

    const uploadPost = async () => {
        const post = {
            title:title || "Untitled",
            labels:labels||[],
            slug,
            content,
            description,
            state: postState,
            image,
            comments: {
                enabled: IsCommentEnabled,
                items: []
            }
        }
        setState({
            ...state,
            loader: {
                ...state.loader,
                show: true,
            }

        })
        await axios.post("/api/posts/create", {
            userId: user.id,
            post
        }).then(res => {
            console.log(res);

            setState({
                ...state,
                loader: {
                    ...state.loader,
                    show: false,
                },
                alert: {
                    ...state.alert,
                    open: true,
                    message: "Post Created Successfully",
                    nature: "success",
                }
            })

        }).catch(err => {
            console.log(err);
            setState({
                ...state,
                loader: {
                    ...state.loader,
                    show: false,
                },
                alert: {
                    ...state.alert,
                    open: true,
                    message: "Error Creating Post",
                    nature: "danger",
                }
            })

        })


    }
    const handleFiles = async (files) => {
        setImageState({
            ...imageState,
            loader: {
                ...imageState.loader,
                show: true,
            },
            alert: {
                ...imageState.alert,
                open: true,
                message: "Uploading the image...",
                nature: "info",
            }
        })

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
            setImage(file.secure_url)
            setImageState({
                ...imageState,
                loader: {
                    ...imageState.loader,
                    show: false,
                },
                alert: {
                    ...imageState.alert,
                    open: true,
                    message: "Image Uploaded Successfully",
                    nature: "success",
                }
            })

        }).catch(err => {
            console.log(err);
            setImageState({
                ...imageState,
                loader: {
                    ...imageState.loader,
                    show: false,
                },
                alert: {
                    ...imageState.alert,
                    open: true,
                    message: "Error Uploading Image",
                    nature: "danger",
                }

            })

        }).finally(() => {
            setTimeout(() => {
                setImageState({
                    ...imageState,
                    alert: {
                        ...imageState.alert,
                        open: false,
                    }
                })
            }, 2000);
        })





    }


    const handleChange = async (event) => {
        const { files } = event.target;

        if (files && files.length) {
            console.log(files);
            handleFiles(files);
        }
    }

    return (
        <>
            <Head>
                <title>New Post</title>
            </Head>
            <DashboardPage user={user}>
                <Header>
                    <h4>
                    <BiEditAlt/>
                        Create a New Post
                    </h4>
                    <Button as={Link} level="true" href="/dashboard/blog">
                        Go Back
                    </Button>
                </Header>
                {/* <Card className="flex-row">
                   

                    <Button
                        onClick={uploadPost}
                    >
                        Create
                    </Button>
                </Card> */}
                <State  {...state} />

                <div className="d-flex align-items-start justify-content-between g-3 mt-3">
                    <Card>
                        <FormElement>
                        <Label htmlFor="title">
                                Post Title
                        </Label>
                            <Input type="text" id="title" placeholder="Write a post title..." underlined value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="description">Post Description</Label>
                            <TextArea
                                type="text"
                                id="description" slug
                                placeholder="Post Description"
                                underlined
                                value={description}

                                maxLength={150}
                                onChange={
                                    (e) => {
                                        setDescription(e.target.value);
                                    }
                                }
                            />
                        </FormElement>
                        <FormElement>
                            <h6>Post Content</h6>
                            <JoditEditor ref={editor} value={content} onChange={setContent} />

                        </FormElement>
                       
                        <FormElement className="mt-2">
                            <FileInput
                                accept="image/*"
                                placeholder="Upload a cover image for the post..."
                                underlined
                                value={image}
                                onChange={handleChange}
                                id="imageUrl"
                            />
                            <Label htmlFor="imageUrl">
                                Upload an Image
                            </Label>
                            {image.length > 3 ? <Image src={image} alt={title ?? "Post Title"} height={120} width={220} className="img-fluid mt-2" /> : null}
                            <State  {...imageState} />
                            <Input value={image} onChange={(e) => {
                                setImage(e.target.value);
                            }} />
                        </FormElement>
                       

                    </Card>
                    <SettingPanel>
                        <h5>Post Settings</h5>
                        <hr/>
                        <FormElement className="mt-2">
                            <Switch
                                checked={postState === "published"}
                                onChange={(e) => {
                                    (e.target.checked) ?
                                        setPostState("published")
                                        :
                                        setPostState("draft");
                                }}
                                id="publish"
                                label={"Publish"}
                                width="100%"
                            />
                
                        </FormElement>
                        <FormElement className="mt-2">
                            <Switch
                                checked={IsCommentEnabled}
                                onChange={(e) => {
                                    setIsCommentEnabled(e.target.checked);
                                }}
                                id="comments"
                                label={"Comments"}
                                width="100%"
                            />
                
                        </FormElement>
                        <FormElement>
                            <Label><CiHashtag/>Label</Label>
                            <Input type="text" placeholder="Add label to the Post..." underlined value={labels.join(",")}
                                onChange={
                                    (e) => {
                                        setLabel(e.target.value?.trim().split(",").map((item) => item.trim()));
                                    }
                                }
                            />
                            <FormHelper>
                                Tags or Categories the post will be included
                            </FormHelper>
                        </FormElement> 
                        <FormElement>
                            <Label htmlFor="slug">   <AiOutlineLink />Edit Slug</Label>
                           
                            <Input
                                type="text"
                                placeholder="Edit the slug for the post"
                                underlined
                                id="slug"
                                value={slug}
                                onChange={
                                    (e) => {
                                        if (e.target.value === "")
                                            setSlug(title?.toLocaleLowerCase().split(" ").join("-"));
                                        else
                                            setSlug(e.target.value);
                                    }
                                }
                            />
                             <FormHelper>
                                <strong>
                                 
                                    Permalink :  {" "}
                                </strong>
                                <span>
                                     { "https//kkupgrader.eu.org/blog/" + slug}
                                </span>
                            </FormHelper>
                        </FormElement>
                        <FormElement>
                            <Label><TbFileDescription/>Meta Description</Label>
                            <TextArea
                                type="text"
                                placeholder="Meta Description"
                                underlined
                                value={description}

                                maxLength={150}
                                onChange={
                                    (e) => {
                                        setDescription(e.target.value);
                                    }
                                }
                            />
                              <FormHelper>
                                Short Description visible in search results
                            </FormHelper>
                        </FormElement>
                        <div className="d-flex align-items-start justify-content-between g-3 mt-3 children-fill">
                        <Button nature="danger" low>
                            Delete
                        </Button>
                        <Button low>
                            Post
                        </Button>

                        </div>
                        
                       
                    </SettingPanel>
                </div>
            </DashboardPage>
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



    return {
        props: { user :session.user},

    }
}