import { hasToken, getUser } from 'lib/checkUser'
import DashboardPage from "components/dashboard-page";
import Head from "next/head";

export default function Settings({ user }) {




    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>
            <DashboardPage user={user}>
                Setting

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