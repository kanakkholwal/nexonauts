import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import Link from 'next/link';

export default function Dashboard({ user }) {




    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <DashboardPage user={user}>
                Admin Dashboard
                <Link href="/dashboard/admin/users">
                    Users
                </Link>
                <Link href="/dashboard/admin/messages">
                    Users
                </Link>

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