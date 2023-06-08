import { getSession } from "next-auth/react"
import DashboardPage, { Header } from "components/dashboard-page";
import Button,{ResponsiveButton} from "components/buttons";
import Badge from "components/topography/badge";
import Head from "next/head";
import Link from 'next/link';
import axios from 'axios';
import {  RiAddLine,RiArticleLine } from 'react-icons/ri';
import {  HiOutlineExternalLink } from 'react-icons/hi';
import {  BiCommentDetail } from 'react-icons/bi';
import {  AiOutlineEye } from 'react-icons/ai';
import {  TbBrandGoogleAnalytics } from 'react-icons/tb';
import { Card, CardHeader, CardBody, CardTitle, CardDescription ,CardFooter} from "components/Card";
import { IndeterminateCircularLoader as Loader } from "components/Loader";
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import toast, { Toaster } from 'react-hot-toast';
import { Inter } from "next/font/google";
const inter = Inter({
  display: "swap",
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const PostCard = styled(Card)`
min-width:320px;
flex-direction:row;
padding-inline:0.75rem;
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
@media (width < 968px){
    flex-direction:column;
    width:100%;
}
@media (566px < width){
    max-width:100%;
}
@media (566px < width < 968px){
    max-width:calc(50% - 1rem);
}
${CardBody}{
    padding:0 1rem;
    display:flex;
    flex-direction:column;
    .meta{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:flex-start;
        gap:0.5rem;
        margin-top:0.5rem;
        margin-bottom:0.5rem;
            color: rgba(var(--theme-rgb),1);
            font-size: 0.875rem;
            font-weight: 500;
        
    }
    ${CardHeader}{
        border:none;

    }

}
    ${CardFooter}{
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content:flex-end;
        gap:0.25rem;
        margin-top:0.25rem;
        padding-top:0.25rem;
        border:none;
        span{
            display:flex;
            align-items:center;
            justify-content:center;
            gap:0.25rem;
            font-size:0.9rem;
            font-weight:500;
            color:rgba(var(--text-rgb),0.8);
            &.postState{
                color:rgba(var(--text-rgb),1);
                font-weight:600;
                text-transform:capitalize;
                margin-right:auto;
            }
        }
    }

${CardTitle}{
    font-weight:600;
    color:rgba(var(--text-rgb),1);

    text-transform:none;
    margin-top:0;
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
        <div className={inter.className}>
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
                          onClick={() => toast.promise(createPost(), {
                                    loading: 'Creating new post...',
                                    success: "Post created Successfully",
                                    error: "Error creating the post!!",
                                })}
                     className="m-0 g-0">
                        New Post
                    </ResponsiveButton>
                </Header>
                <div className="d-flex g-3 flex-wrap align-content-start">
                    {isLoading?
                        <Loader /> :
                        posts?.length > 0 ? posts?.map((post, index) => (
                            <PostCard  key={post?._id} style={{
                                animationDelay: 0.01 * index + "s"
                            }}>
                                <Image src={post.image} alt={post.title} height={240} width={320} href={"/dashboard/admin/blog/posts/" + post?._id + "/edit"}/>
                                <CardBody>
                                <p className="meta">
                                <span>{post?.author.name}</span>
                                • <span title={"Created at "+ new Date(post?.createdAt).toDateString()} >{new Date(post.createdAt).toDateString()}</span>
                                </p>
                                <CardHeader>
                                    <CardTitle className="h6" as={Link} href={"/dashboard/admin/blog/posts/" + post?._id + "/edit"}>{post?.title}</CardTitle>
                                </CardHeader>
                                    <CardDescription>{post?.description}</CardDescription>
                                    <CardFooter>
                                        <Badge nature={(post.state === "draft") ? 'warning':'success'} className={"postState " + ((post.state === "draft") ? ' text-warning':'  text-success')}>{post?.state}</Badge>
                                        <Button  rounded="true" className="p-1" level="true" as={Link} title="View Post" href={"/blog/posts/"+post.slug} target="_blank"><AiOutlineEye/></Button>
                                        <Badge title={post?.noOfComments + " comments"}>{post?.noOfComments}<BiCommentDetail/></Badge>
                                        <Badge>{post?.analytics?.analytics.length}<TbBrandGoogleAnalytics/></Badge>
                                    </CardFooter>
                                </CardBody>
                            </PostCard>)) : error ? error:"no posts"
                    }

                </div>



            </DashboardPage>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </div>
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