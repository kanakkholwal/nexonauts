import { hasToken, getUser } from 'lib/checkUser'
import DashboardPage, { Header } from "components/dashboard-page";
import Button from "components/buttons";
import Head from "next/head";
import Link from 'next/link';

export default function Blog({ user }) {




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
                Blog
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