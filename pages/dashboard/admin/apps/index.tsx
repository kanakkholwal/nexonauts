import { GetSessionParams, getSession } from "next-auth/react";
import type {sessionType} from "types/session";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import axios from "axios";

export default function Dashboard({ user ,apps}) {
 
    console.log(apps);

    return (
        <>
            <Head>
                <title>Submit App</title>
            </Head>
            <DashboardPage user={user} headerChildren={<span className="h6">All Apps</span>}>
          
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
    // const response = await fetch(`/api/apps/all`);
    // const data = await response.json();

    // const {apps}  =  []



    return {
        props: { user: session.user,apps:[] },
    }
}