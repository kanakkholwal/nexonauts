import { isAdmin } from 'lib/checkUser'
import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";

export default function Dashboard({ user }) {




    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <DashboardPage user={user}>
                Admin Dashboard

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

    const admin = await isAdmin(context.req);
    if (!admin) {
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