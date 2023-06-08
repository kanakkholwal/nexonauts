import { getSession } from "next-auth/react"
import DashboardPage, { Header } from "components/dashboard-page";
import {ResponsiveButton} from "components/buttons";
import Head from "next/head";
import Link from 'next/link';
import axios from 'axios';
import {  RiAddLine,RiArticleLine } from 'react-icons/ri';
import {  HiOutlineExternalLink } from 'react-icons/hi';
import {  BiCommentDetail } from 'react-icons/bi';
import {  TbBrandGoogleAnalytics } from 'react-icons/tb';
import { Card, CardHeader, CardBody, CardTitle, CardDescription } from "components/Card";
import { IndeterminateCircularLoader as Loader } from "components/Loader";
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import toast, { Toaster } from 'react-hot-toast';


const PostCard = styled(Card)`
min-width:320px;
${'' /* max-width:370px; */}
flex-direction:row;
width:100%;
img{
    object-fit:cover;
    border-radius:5px;
    aspect-ratio:16/9;
    transition:all 0.3s ease-in-out;
}
&:hover{
    img{
    opacity:0.9;
}
}

${CardBody}{
    padding:1rem;
${CardHeader}{
border:none;
}
}

${CardTitle}{
    font-weight:600;
    color:rgba(var(--text-rgb),1);

    text-transform:none;
    margin-top:0.75rem;
}
${CardDescription}{
    font-weight:500;
    color:rgba(var(--text-rgb),0.8)
}

`;
const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function Blog({ user }) {

    const { data, error, isLoading } = useSWR("/api/users/" + user.id + "/posts/all", fetcher)

    const [posts,setPosts] = useState(data?.posts|| []);
    const router = useRouter();

    const createPost = async () => {

        await axios.post("/api/users/" + user.id + "/posts/create")
            .then(res => {
                console.log(res.data);
                router.push("/dashboard/admin/blog/posts/" + res.data.post._id + "/edit")
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() =>{
        if(data?.posts !== posts && data !== undefined)
            setPosts(data?.posts);
    },[data])


    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <DashboardPage user={user}>
  
                <Header style={{
                    position: "sticky",
                    top: "90px",
                    zIndex: 100,
                }}>
                    <h6> 
                        <RiArticleLine /> All Posts ({posts?.length > 0 ? posts?.length : 0})
                    </h6>
                    <ResponsiveButton as={Link} icon={<HiOutlineExternalLink/>} direction={"true"} low="true" level="true" size="sm" target="_blank" href="/blog" className="ms-auto me-2">
                        Check out 
                    </ResponsiveButton>
                    <ResponsiveButton  icon={<RiAddLine/>} low="true" size="sm" 
                    o       onClick={() => toast.promise(createPost(), {
                                    loading: 'Creating new post...',
                                    success: "Post created Successfully",
                                    error: "Error creating the post!!",
                                })}
                     className="m-0 g-0">
                        New Post
                    </ResponsiveButton>
                </Header>
                <div className="d-flex g-3 flex-nowrap flex-column align-content-start">
                    {isLoading?
                        <Loader /> :
                        posts?.length > 0 ? posts?.map((post, index) => (
                            <PostCard  key={post?._id} style={{
                                animationDelay: 0.01 * index + "s"
                            }}>
                                <Image src={post.image} alt={post.title} height={240} width={320} href={"/dashboard/admin/blog/posts/" + post?._id + "/edit"}/>
                                <CardBody>
                                <CardHeader>
                                    <CardTitle className="h6" as={Link} href={"/dashboard/admin/blog/posts/" + post?._id + "/edit"}>{post?.title}</CardTitle>
                                </CardHeader>
                                    <CardDescription>{post?.description}</CardDescription>
                                    <div className="d-flex g-1 flex-nowrap align-content-center ">
                                        <span>{post?.state}</span>
                                        <span>{new Date(post.createdAt).toDateString()}</span>
                                        <span>{post?.noOfComments}<BiCommentDetail/></span>
                                        <span>{post?.analytics?.analytics.length}<TbBrandGoogleAnalytics/></span>
                                    </div>
                                </CardBody>
                            </PostCard>)) : error ? error:"no posts"
                    }

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
        props: { user:session.user },
    }
}