import { hasToken, getUser } from 'lib/checkUser'
import DashboardPage, { Header } from "components/dashboard-page";
import Button from "components/buttons";
import State from "components/state";
import { Card, CardHeader, CardBody } from "components/Card";
import { Input, FormElement, Label, TextArea, CheckBox, FileInput } from "components/form-elements";
import Head from "next/head";
import Link from 'next/link';
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import styled from 'styled-components';
import axios from 'axios';
import Image from 'next/image';
const SettingPanel = styled(Card)`
    max-width:300px;
    position:sticky;
    top:0;
`;

const EditorJs = dynamic(() => import("components/editor"), {
    ssr: false,
});

export default function NewPost({ user }) {

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
    const [title, setTitle] = useState("Add a title to the post");
    const [description, setDescription] = useState("Post Description");
    const [content, setContent] = useState({
        time: 1635603431943,
        blocks: [],
    });
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

    }); const [postState, setPostState] = useState("draft");
    const [labels, setLabel] = useState([]);
    const [comments, setComments] = useState(true);
    const [slug, setSlug] = useState(title?.toLocaleLowerCase().split(" ").join("-"));

    const uploadPost = async () => {
        const post = {
            title,
            labels,
            slug,
            content,
            description,
            state: postState,
            image,
            comments: {
                enabled: comments,
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
                    <Button as={Link} level="true" href="/dashboard/blog">
                        Go Back
                    </Button>
                </Header>
                <Card className="flex-row">
                    <FormElement className="mb-0">
                        <Input type="text" placeholder="Write a post title..." underlined value={title}

                            onChange={(e) => setTitle(e.target.value)} />
                    </FormElement>

                    <Button
                        onClick={uploadPost}
                    >
                        Create
                    </Button>
                </Card>
                <div className="d-flex align-items-start justify-content-between g-3 mt-3">
                    <Card>
                        <CardHeader>
                            <h4>Content</h4>
                        </CardHeader>
                        {
                            <State  {...state} />
                        }
                        <CardBody>

                            {
                                EditorJs ? <EditorJs
                                    defaultValue={content}
                                    minHeight={200}
                                    onChange={(api, event) => console.log("sample")}
                                    onReady={() => console.log("ready")}
                                    onSave={(data) => {
                                        console.log("SAVED", data);
                                        setContent(data);
                                    }}

                                /> : null
                            }
                        </CardBody>

                    </Card>
                    <SettingPanel>
                        <h5>Post Settings</h5>
                        <FormElement className="mt-2">
                            <CheckBox
                                checked={postState === "published"}
                                onChange={(e) => {
                                    (e.target.checked) ?
                                        setPostState("published")
                                        :
                                        setPostState("draft");
                                }}
                                id="publish"
                            />
                            <Label htmlFor="publish">
                                Publish
                            </Label>
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
                        <FormElement>
                            <Label>Label</Label>
                            <Input type="text" placeholder="Add label to the Post..." underlined value={labels.join(",")}
                                onChange={
                                    (e) => {
                                        setLabel(e.target.value.trim().split(","));
                                    }
                                }
                            />
                        </FormElement>
                        <FormElement>
                            <h6>Permalink</h6>
                            <p>
                                {"https//kkupgrader.eu.org/blog/" + slug}
                            </p>
                            <Label>Edit Slug</Label>
                            <Input
                                type="text"
                                placeholder="Edit the slug for the post"
                                underlined
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
                        </FormElement>
                        <FormElement>
                            <Label>Search Description</Label>
                            <TextArea
                                type="text"
                                placeholder="For SEO"
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
                            <CheckBox
                                checked={comments}
                                onChange={(e) => {
                                    setComments(e.target.checked);
                                }}
                                id="comments"

                            />
                            <Label htmlFor="comments">Comments</Label>
                        </FormElement>

                    </SettingPanel>
                </div>
            </DashboardPage>
        </>
    )
}


export async function getServerSideProps(context) {

    const token = await hasToken(context.req);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    const user = await getUser(context.req);




    return {
        props: { user },

    }
}