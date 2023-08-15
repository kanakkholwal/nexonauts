import { GetSessionParams, getSession } from "next-auth/react"
import DashboardPage, { Header } from "components/dashboard-page";
import Button from "components/buttons";
import { createSlug } from "lib/scripts";
import { Card, } from "components/Card";
import { Input, FormElement, FormGroup,Label, TextArea, FormHelper, Switch ,InputWithIcon} from "components/form-elements";

import Head from "next/head";
import Link from 'next/link';
import { useEffect, useState,useReducer,useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("components/editor/editorjs"), {
    ssr: false,
});
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { BsLayoutTextSidebar } from "react-icons/bs"
import { FiUploadCloud } from "react-icons/fi"
import { AiOutlineLink,AiOutlineArrowUp } from "react-icons/ai"
import { CiHashtag } from "react-icons/ci"
import { LuImagePlus } from "react-icons/lu"
import { MdOutlineImageSearch } from "react-icons/md"
import { TbFileDescription } from "react-icons/tb";
import { sessionType } from "@/src/types/session";
import { SessionUserType } from "@/src/types/user";
import { Post } from "@/src/types/post";
import LazyImage from "components/image";
import {
    Modal,
    useModal
} from "components/dialog/modal"

const SettingPanel = styled(Card)`
animation:none;
opacity: 1;
visibility: visible;
.coverImage{
    border-radius: 15px;
    overflow: hidden;
    border:1px solid rgba(var(--dark-rgb),0.1);
    filter: drop-shadow(2px 2px 10px rgba(var(--dark-rgb),0.1));
    margin-bottom:0.75rem;
}
@media (min-width: 728px){
    position:sticky;
    top:95px;
    max-width: 400px;
}
@media (max-width: 728px){
    position:fixed;
    top:190px;
    transform:translateX(100%);
    box-shadow: 4px 4px 8px rgba(var(--dark-rgb),0.1);
    &.open{
        transform:translateX(0%);
    }
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
    const [menu, setMenu] = useState(false);
    const ImageModalRef = useRef(null);
    const {open} = useModal(ImageModalRef);

    


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


  

    console.log(post,user)


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
                    <Button level={true} low={true} rounded={true}
                        onClick={() =>{
                            setMenu(!menu);
                        }}
                    >
                        <BsLayoutTextSidebar />
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

                      

                    </Card>
                    <SettingPanel className={menu ? " open" : ""}>
                        <h5>Post Settings</h5>
                        <hr />
                        {image ?
                                <Image height={120} width={220}
                                    alt={title} src={image}
                                    className="coverImage"

                                /> : <Image height={120} width={220}
                                className="coverImage"

                                    alt={"Cover image"} src={"https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp"} />}
                       
                        <Button level={true} low={true} rounded={true} fill={true} onClick={() =>{
                            open();
                        }}>
                                Add a Cover Image <LuImagePlus />
                        </Button>
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
            <Modal ref={ImageModalRef} maxWidth="990px">
                <ImageUploader
                    image={image}
                    title={title}
                    setImage={setImage}

                />
              </Modal>
        </>
    )
}

function ImageUploader({
    image,
    title,
    setImage
}){
    const [tab, setTab] = useState("");
    const [finalImage, setFinalImage] = useState("");

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
    const [query, setQuery] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
  
    const PEXELS_API_KEY = '6tGXTXkyJQzKkrv0sdGukm8XwkmuFnISpAmAi0Yft40vaNsyLSj7KdZ5';
    const BASE_URL = 'https://api.pexels.com/v1/search';
    const PER_PAGE = 12;

    const searchImages = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
          params: {
            query: query,
            per_page: PER_PAGE,
            page: page,
            orientation: 'landscape',
          },
        });
  
        setImages(response.data.photos);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
  
    const handleSearch = () => {
      setPage(1); // Reset page to 1 when performing a new search
      searchImages();
    };
  
    const handleLoadMore = () => {
      setPage(page + 1);
      searchImages();
    };

    return (<ImageUploaderContainer>
        <div className="tabs">

            <button type="button"
                className={"tab " + (tab === "image_link" ? "active" : "")}

                onClick={() => {
                    setTab("image_link");
                }}


            >
                Using URL  <AiOutlineLink />
            </button>
            <button type="button"
                className={"tab " + (tab === "image_upload" ? "active" : "")}

                onClick={() => {
                    setTab("image_upload");
                }}
            >
                Upload <LuImagePlus />
            </button>
            <button type="button"
                className={"tab " + (tab === "image_search" ? "active" : "")}
                onClick={() => {
                    setTab("image_search");
                }
                }
            >
                Pexels <MdOutlineImageSearch />
            </button>
        </div>
        <div className="preview">
            {tab === "image_search" ? <div className="search_pexels">
                <InputWithIcon id="imageUrl" type="text" placeholder="Paste a Image URL here..." level={true}

                    value={query}
                    icon={<MdOutlineImageSearch />}
                    IconEvents={{
                        onClick: (e) => {
                            e.preventDefault();
                            handleSearch()
                        }
                    }}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                <div className="image-gallery">
                    {images.map((image:any) => (<LazyImage key={image.id} className="image-item" src={image.src.small} alt={image.photographer} width={image.width} height={image.height} />
                    ))}
                </div>

                {images.length > 0 && (
                    <div className="action">
                    <Button onClick={handleLoadMore}level={true}>Load More</Button>
                    <Button onClick={() =>{

                    }} >Use this Image</Button>
                    </div>
                )}

            </div> : null}
            {tab === "image_link" ? <div>
                <FormElement>
                    <Label htmlFor="imageUrl">Paste an Image Url</Label>
                    <Input id="imageUrl" type="text" placeholder="Paste a Image URL here..." level={true} value={finalImage} onChange={(e) => {
                        setFinalImage(e.target.value);
                    }} />
                </FormElement>

            </div> : null}
            {tab === "image_upload" ? <FormElement>
            <FileUploader>
                            {image ?
                                <Image height={120} width={220}
                                    alt={title} src={image}
                                    className="coverImage"
                                /> : <Image height={120} width={220}
                                className=""
                                    alt={"Cover image"} src={"https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680811201/kkupgrader/default-article_ge2ny6.webp"} />}
                            <label htmlFor="imageUpload">
                                <FiUploadCloud/>
                                <span>Cover Image</span>
                                <input type="file" hidden accept="image/*" id="imageUpload" onChange={handleChange} />
                            </label>
                        </FileUploader>
                        <FormHelper>
                            Upload a cover image for your post. It will be displayed on the top of your post.
                        </FormHelper>
            </FormElement> : null}

        </div>
         
    </ImageUploaderContainer>)
}

const ImageUploaderContainer = styled.div`
    width: 100%;
    display: flex;
    transition:height 0.5 ease;
    align-items: stretch;
    gap:0.75rem;
    height:100%;
    .tabs{
        flex-basis:150px;
        display:inline-flex;
        flex-direction:column;
        gap:0.25rem;
        padding:0.5rem;
        border-right:1px solid rgba(var(--dark-rgb),0.1);
        .tab{
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:0.25rem;

            padding:0.5rem;
            border-radius:0.25rem;
            cursor:pointer;
            font-size:14px;
            font-weight:500;

            &:hover{
                background:rgba(var(--grey-rgb),0.1);
            }
            &.active{
                background:rgba(var(--theme-rgb),0.1);
                color:rgba(var(--theme-rgb),1);

            }
        }

    }
    .preview{
        flex:1;
    }
    .search_pexels{
        display:flex;
        flex-direction:column;
        gap:0.5rem;
        width:100%;
        .image-gallery {
            overflow: auto;
            display: flex;
            flex-wrap:wrap;
            gap: 10px;
            margin: 20px;
            max-height:640px;
            height:100%;
            overflow-y:scroll;
            position:relative;
         .image-item {
           overflow: hidden;
           border-radius: 8px;
           flex:1 1 auto;
           filter: drop-shadow(4px 6px 5px rgba(var(--dark-rgb),0.25));
            transition:all 200ms ease-in-out;
            cursor:pointer;
            pointer-events:auto;
           &:active{
                transform:scale(0.95);
           }
           &:hover{
                transform:scale(1.05);
           }
        }
  
}

    }
    .action{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:0.25rem;
        width:100%;
    }

`;

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

    if (response.data.success === true && response.data.post._id === postId) {

        const post = response.data.post;
        console.log(post);
        return {
            props: {
                user:session.user,
                post
            }
        }
    }
    else if (response.data.success === false || response.data.post._id !== postId) {
        console.log(response.data);

        // not found, return
        return {
            notFound: true
        }
    }
      
    return {
            notFound: true,
    }
    
    


}