import { GetSessionParams, getSession } from "next-auth/react"
import DashboardPage, { Header } from "components/dashboard-page";
import Button from "components/buttons";
import { createSlug } from "lib/scripts";
import { Card, } from "components/Card";
import { Input, FormElement, FormGroup,Label, TextArea, FormHelper, Switch ,FileInput} from "components/form-elements";

import Head from "next/head";
import Link from 'next/link';
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("components/editor/editorjs"), {
    ssr: false,
});
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { FiUploadCloud } from "react-icons/fi"
import { AiOutlineLink,AiOutlineArrowUp } from "react-icons/ai"
import { CiHashtag } from "react-icons/ci"
import { TbFileDescription } from "react-icons/tb";
import { sessionType } from "@/src/types/session";
import { SessionUserType } from "@/src/types/user";
import { Post } from "@/src/types/post";

const SettingPanel = styled(Card)`
@media (min-width: 600px){
    position:sticky;
    top:95px;
    max-width: 400px;
}
svg{
    margin-inline:0.5rem;
}
`;
const FileUploader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    width: 100%;
    height: auto;
    max-width: 640px;
    aspect-ratio: 16/9;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    background: rgba(var(--light-rgb),1);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-inline:auto;
    label{
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.125rem;
        font-size: 1em;
        font-weight: 500;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        background: rgba(var(--light-rgb),0.05);
        color: rgba(var(--dark-rgb),1);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease-in-out;
        svg{
            font-size: 1.5em;
        }
    }
    &:hover {
        label{
            opacity: 1;
            visibility: visible;
        }
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;

    }
`;

export default function NewPost({ user,post }:{
    user:SessionUserType,
    post: Post
}) {

    const router = useRouter();

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
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [initialContent, setInitialContent] = useState<any | null>(post.content || {
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
    const [content, setContent] = useState(initialContent);
    const [image, setImage] = useState(post.image);
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
    const [postState, setPostState] = useState(post.state);
    const [labels, setLabel] = useState<string[]>(post.labels);
    const [IsCommentEnabled, setIsCommentEnabled] = useState(post.comments.enabled);
    const [slug, setSlug] = useState(post.slug);

    const updatePost = async () => {
        await axios.put("/api/users/" + user.id + "/posts/" + post._id, {
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
        await axios.delete("/api/users/" + user.id + "/posts/" + post._id + "/delete", {
            headers:{
                "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`,
            }
        }).then(res => {
            console.log(res);
            router.push("/dashboard/admin/blog")
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


    const handleFiles = async (files:File[]) => {

        try {
            const formData = new FormData();
            const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
            if(!CLOUDINARY_UPLOAD_PRESET){
                toast.error("Cloudinary Upload Preset not found");
                return;
            }
            const CLOUDINARY_FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;
            if(!CLOUDINARY_FOLDER){
                toast.error("Cloudinary Folder not found");
                return;
            }
            formData.append('file', files[0]);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            formData.append('folder', CLOUDINARY_FOLDER);


            // upload image to cloudinary and get url
            await axios(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                data: formData
            }).then(res => {
                const file = res.data;
                // console.log(file);
                setImage(file.secure_url)
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



    return (
        <>
            <Head>
                <title>Editing Post</title>
            </Head>
            <DashboardPage user={user}
                headerChildren={<span className="h6">Editing Post</span>}
                
            >
                <Header>
                    <Link  href="/dashboard/admin/blog">
                        Go Back
                    </Link>
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

                        <FormGroup className="mt-2">
                        <FileUploader>
                            {image ?
                                <Image height={120} width={220}
                                    alt={title} src={image}
                                /> : <Image height={120} width={220}
                                    alt={"Cover image"} src={"https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp"} />}
                            <label htmlFor="imageUpload">
                                <FiUploadCloud/>
                                <span>Cover Image</span>
                                <input type="file" hidden accept="image/*" id="imageUpload" onChange={handleChange} />
                            </label>
                        </FileUploader>
                        <FormHelper>
                            <p>Upload a cover image for your post. It will be displayed on the top of your post.</p>
                        </FormHelper>
                        <FormElement className="align-items-center">
                        <Label htmlFor="imageUrl" >or</Label>
                        <Input id="imageUrl" type="text" placeholder="Paste a Image URL here..." value={image} onChange={(e) =>{
                            setImage(e.target.value);
                        }}/>
                        </FormElement>

                        </FormGroup>


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
                                className=""
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
                                className=""

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
                            <Button nature="danger" 
                            low={true}

                                onClick={() => toast.promise(deletePost(), {
                                    loading: 'Deleting...',
                                    success: "Post Deleted Successfully",
                                    error: "Error Deleting the post!!",
                                })}

                            >
                                Delete
                            </Button>
                            <Button low={true}
                                onClick={() => toast.promise(updatePost(), {
                                    loading: 'Updating...',
                                    success: "Post Updated Successfully",
                                    error: "Error updating the post!!",
                                })}
                            >
                                Update
                            </Button>

                        </div>
                        <Button as={"a"} href="#main_wrapper" level={true} low={true} rounded={true}>
                                Back to Top <AiOutlineArrowUp />
                        </Button>


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

export async function getServerSideProps(context: GetSessionParams & {
    query: {
        postId: string
    }
}) {


    const session = (await getSession(context)) as sessionType | null;

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

    // Call an external API endpoint to get user
    const postId = context.query.postId as string;
    let type = "idle";
    let message = "Loading...";
    const response = await axios({
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/users/${session.user.id}/posts/${postId}`,
        method: 'get',
        headers: {
            "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        message = res.data.message;
        type = "success";
        return res;
    }).catch((err) => {
        message = err.response.data.message;
        type = "error";
        return err.response;
    });

    console.log(type,message)

    if (response.data.success === true && response.data.user && response.data.post.post._id === postId) {

        console.log(response.data.post.post);
        return {
            props: {
                user:session.user,
                post: response.data.post,
            }
        }
    }
    else if (response.data.success === false) {
        console.log(response.data);

        // not found, return
        return {
            user:session.user,
            post: null,

        }
    }
      
    return {
            notFound: true,
    }
    
    


}