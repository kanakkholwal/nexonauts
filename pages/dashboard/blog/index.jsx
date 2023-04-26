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

export default function Blog({ user }) {

    const [posts, setPosts] = useState({
        loading: true,
        posts: []
    })

    useEffect(() => {
        const FetchPosts = async () => {
            await axios.get("/api/users/" + user.id + "/posts/all")
                .then(res => {
                    setPosts({
                        loading: false,
                        posts: res.data.posts
                    })
                    console.log(res.data.posts)
                })
                .catch(err => {
                    console.log(err);
                })

        }
        FetchPosts()
    }, [])
    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <DashboardPage user={user}>
                <Header>
                    <h4>All Posts</h4>
                    <Button as={Link} href="/dashboard/blog/new">
                        New Post
                    </Button>
                </Header>
                <div className="d-flex g-3 flex-nowrap overflow-auto x-mandatory">
                    {posts.loading ?
                        <Loader /> :
                        posts.posts.length > 0 ? posts.posts?.map((post, index) => (
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
                            </PostCard>)) : "no posts"
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



    return {
        props: { user :session.user},

    }
}