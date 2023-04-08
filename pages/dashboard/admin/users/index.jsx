import { hasToken, isAdmin, getUser } from 'lib/checkUser'
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

    const token = await hasToken(context.req);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
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

    const user = await getUser(context.req);

    return {
        props: { user },
    }
}