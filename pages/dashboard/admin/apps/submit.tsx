import { GetSessionParams, getSession } from "next-auth/react";
import type {sessionType} from "types/session";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import AppBuilder from "pages/app-builder";


export default function Dashboard({ user }) {
 

    return (
        <>
            <Head>
                <title>Submit App</title>
            </Head>
            <DashboardPage user={user} headerChildren={
                <>
                Submit App
                </>
            }>
                <AppBuilder user={user} />
            </DashboardPage>
        </>
    )
}


export async function getServerSideProps(context: GetSessionParams | undefined) {


    const session = (await getSession(context)) as sessionType | null;

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
        props: { user: session.user },
    }
}