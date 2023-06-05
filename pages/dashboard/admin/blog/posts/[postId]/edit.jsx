import { getSession } from "next-auth/react"
import DashboardPage, { Header } from "components/dashboard-page";
import Button from "components/buttons";
import State from "components/state";
import { Card, } from "components/Card";
import { Input, FormElement, Label, TextArea, FormHelper, Switch, FileInput } from "components/form-elements";
import Head from "next/head";
import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("components/editor/editorjs"), {
    ssr: false,
});
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { BiEditAlt } from "react-icons/bi"
import { AiOutlineLink } from "react-icons/ai"
import { CiHashtag } from "react-icons/ci"
import { TbFileDescription } from "react-icons/tb";

const SettingPanel = styled(Card)`
@media (min-width: 600px){
    position:sticky;
    top:0;
    max-width: 400px;
}
svg{
    margin-inline:0.5rem;
}
`;


export default function NewPost({ user }) {

    const router = useRouter();
    const { postId } = router.query;

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
    const [title, setTitle] = useState("Loading...");
    const [description, setDescription] = useState("Loading...");
    const [initialContent, setInitialContent] = useState(null);
    const [content, setContent] = useState(initialContent);
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

    const updatePost = async () => {
        await axios.put("/api/users/" + user.id + "/posts/" + postId, {
            post:
            {
                title: title || "Untitled",
                labels: labels || [],
                slug: slug,
                content: content,
                description: description,
                state: postState,
                image: image,
                comments: {
                    enabled: IsCommentEnabled,
                    items: []
                }
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
    const deletePost = async () => {
        if (!confirm("Are you sure want to delete this Post"))
            return;
        await axios.delete("/api/users/" + user?.id + "/posts/" + postId + "/delete", {
            userId: user.id,
        }).then(res => {
            console.log(res);
            router.push("/dashboard/blog")
        }).catch(err => {
            console.log(err);
        })
    }
    const FetchPost = async (postId) => {
        await axios.post("/api/users/" + user.id + "/posts/" + postId)
            .then(({ data }) => {
                const post = data?.post;
                setTitle(post.title);
                setDescription(post.description);
                setImage(post.image);
                setLabel(post.labels);
                setIsCommentEnabled(post.comments.enabled);
                setPostState(post.state);
                setSlug(post.slug);
                setState({
                    ...state,
                    loader: {
                        ...state.loader,
                        show: false,
                    },
                })

                post.content !== null ? setInitialContent(post.content) : setInitialContent({
                    time: new Date().getTime(),
                    blocks: [
                        {
                            type: "paragraph",
                            data: {
                                text: "Start writing your post here..."
                            }
                        }
                    ]
                });
               
                console.log(initialContent);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    console.log(err.response.data);

                    router.push("/dashboard/admin/blog");
                    return

                }
                console.log(err.response.status);
            })
    }
    useEffect(() => {
        if (postId) {
            toast.promise(FetchPost(postId), {
                loading: 'Getting the data',
                success: 'Got the data',
                error: 'Error when fetching',
              });
        }
    }, []);
    useEffect(() => {
        if (!slug)
            setSlug(title?.toLocaleLowerCase().split(" ").join("-"));

    }, [title])
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
                <title>Editing Post</title>
            </Head>
            <DashboardPage user={user}>
                <Header>
                    <Button as={Link} low="true" size="sm" level="true" href="/dashboard/admin/blog">
                        Go Back
                    </Button>
                </Header>
                <div className="d-flex align-items-start justify-content-between g-3 mt-3">
                    <Card>
                        <FormElement>
                            <Label htmlFor="title">
                                Post Title
                            </Label>
                            <Input type="text" id="title" placeholder="Write a post title..." value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="description">Post Description</Label>
                            <TextArea
                                type="text"
                                id="description"
                                placeholder="Post Description"

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
                            {
                                initialContent !== null ?
                                    <Editor
                                        defaultValue={initialContent}

                                        onSave={(value) => {
                                            setContent(value)
                                        }}
                                    /> : "Loading..."
                            }


                        </FormElement>

                        <FormElement className="mt-2">
                            <FileInput
                                accept="image/*"
                                placeholder="Upload a cover image for the post..."

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
                        <hr />
                        <FormElement className="mt-2">
                            <Switch
                                checked={postState === "published"}
                                onChange={(e) => {
                                    setPostState(e.target.checked ? "published" : "draft");

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
                            <Label><CiHashtag />Label</Label>
                            <Input type="text" placeholder="Add label to the Post..." value={labels.join(",")}
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
                                <Link href={"https://kkupgrader.eu.org/blog/posts/" + slug} target="_blank">
                                    {"https://kkupgrader.eu.org/blog/posts/" + slug}
                                </Link>
                            </FormHelper>
                        </FormElement>
                        <FormElement>
                            <Label><TbFileDescription />Meta Description</Label>
                            <TextArea
                                type="text"
                                placeholder="Meta Description"

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
                            <Button nature="danger" low="true"

                                onClick={() => toast.promise(deletePost(), {
                                    loading: 'Deleting...',
                                    success: "Post Deleted Successfully",
                                    error: "Error Deleting the post!!",
                                })}

                            >
                                Delete
                            </Button>
                            <Button low="true"
                                onClick={() => toast.promise(updatePost(), {
                                    loading: 'Updating...',
                                    success: "Post Updated Successfully",
                                    error: "Error updating the post!!",
                                })}
                            >
                                Update
                            </Button>

                        </div>


                    </SettingPanel>
                </div>
            </DashboardPage>
            <Toaster
                position="top-center"
                reverseOrder={true}
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

    if (session.user.role !== 'admin') {
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