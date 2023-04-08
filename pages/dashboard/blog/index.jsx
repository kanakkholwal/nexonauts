import { hasToken, getUser } from 'lib/checkUser'
import DashboardPage, { Header } from "components/dashboard-page";
import Button from "components/buttons";
import Head from "next/head";
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from "components/Card";

export default function Blog({ user }) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const FetchPosts = async () => {
            await axios.get("/api/users/" + user.id + "/posts/all")
                .then(res => {
                    setPosts(res.data.posts)
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
                    {posts?.map(post => (
                        <Card as={Link} href={"/dashboard/blog/posts/" + post._id + "/edit"} key={post._id}>
                            <CardHeader>
                                <h4>{post.title}</h4>
                            </CardHeader>
                            <CardBody>
                                <p>{post.description}</p>
                            </CardBody>
                        </Card>))
                    }

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