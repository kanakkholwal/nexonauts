import { getAuthSession } from 'lib/checkUser'
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


    const user = await getAuthSession(context);

    if (!user)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }



    return {
        props: { user },

    }
}