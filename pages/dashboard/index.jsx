import { hasToken, getUser } from 'lib/checkUser'
import DashboardPage from "components/dashboard-page";
import Head from "next/head";

export default function Dashboard({ user }) {




    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <DashboardPage user={user}>
                Dashboard

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