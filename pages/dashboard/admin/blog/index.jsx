import { getSession } from "next-auth/react"
import DashboardPage, { Header } from "components/dashboard-page";
import Button from "components/buttons";
import Head from "next/head";
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardDescription } from "components/Card";
import { IndeterminateCircularLoader as Loader } from "components/Loader";
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from "next/router";
import State from "components/state";
import useSWR from "swr";

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
    const router = useRouter();

    const createPost = async () => {
        setState({
            ...state,
            loader: {
                ...state.loader,
                show: true
            }
        })

        await axios.post("/api/users/" + user.id + "/posts/create")
            .then(res => {
                console.log(res.data);
                setState({
                    loader: {
                        ...state.loader,
                        show: false
                    },
                    alert: {
                        open: true,
                        message: "Post created successfully",
                        nature: "success"
                    }
                })

                router.push("/dashboard/blog/posts/" + res.data.post._id + "/edit")
            })
            .catch(err => {
                console.log(err);
                setState({
                    loader: {
                        ...state.loader,
                        show: false
                    },
                    alert: {
                        open: true,
                        message: "Post creation failed",
                        nature: "error"
                    }
                })

            })
            .finally(() => {
                setTimeout(() => {
                    setState({
                        ...state,
                        alert: {
                            ...state.alert,
                            open: false
                        }
                    })
                }, 5000)
            })
    }


    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <DashboardPage user={user}>
                <Header>
                    <h4>All Posts</h4>
                    <Button onClick={() => createPost()}>
                        New Post
                    </Button>
                </Header>
                <State {...state} />
                <div className="d-flex g-3 flex-nowrap overflow-auto x-mandatory">
                    {isLoading?
                        <Loader /> :
                        data.posts.length > 0 ? data.posts?.map((post, index) => (
                            <PostCard as={Link} href={"/dashboard/blog/posts/" + post?._id + "/edit"} key={post?._id} style={{
                                animationDelay: 0.01 * index + "s"
                            }}>
                                <Image src={post.image} alt={post.title} height={480} width={640} />
                                <CardHeader>
                                    <CardTitle>{post?.title}</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <CardDescription>{post?.description}</CardDescription>
                                </CardBody>
                            </PostCard>)) : error ? error:"no posts"
                    }

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