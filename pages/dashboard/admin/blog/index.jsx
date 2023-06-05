import { getSession } from "next-auth/react"
import DashboardPage, { Header } from "components/dashboard-page";
import {ResponsiveButton} from "components/buttons";
import Head from "next/head";
import Link from 'next/link';
import axios from 'axios';
import {  RiAddLine,RiArticleLine } from 'react-icons/ri';
import {  HiOutlineExternalLink,HiOutlineEye } from 'react-icons/hi';
import { Card, CardHeader, CardBody, CardTitle, CardDescription } from "components/Card";
import { IndeterminateCircularLoader as Loader } from "components/Loader";
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from "next/router";
import useSWR from "swr";
import toast, { Toaster } from 'react-hot-toast';


const PostCard = styled(Card)`
min-width:320px;
max-width:370px;
width:auto;
img{
    object-fit:cover;
    border-radius:5px;
    aspect-ratio:16/9;
    transition:all 0.3s ease-in-out
}
&:hover{

    img{
    opacity:0.9
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


    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <DashboardPage user={user}>
  
                <Header>
                    <h6> 
                        <RiArticleLine /> All Posts ({data?.posts?.length > 0 ? data?.posts?.length : 0})
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
                <div className="d-flex g-3 flex-nowrap overflow-auto x-mandatory">
                    {isLoading?
                        <Loader /> :
                        data.posts.length > 0 ? data.posts?.map((post, index) => (
                            <PostCard as={Link} href={"/dashboard/admin/blog/posts/" + post?._id + "/edit"} key={post?._id} style={{
                                animationDelay: 0.01 * index + "s"
                            }}>
                                <Image src={post.image} alt={post.title} height={480} width={640} />
                                <CardHeader>
                                    <CardTitle as="h6">{post?.title}</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <CardDescription>{post?.description}</CardDescription>
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