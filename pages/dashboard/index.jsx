import { getUser } from "lib/checkUser";
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

    const session = await getUser(context)

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }




    return {
        props: { user:session.user },

    }
}