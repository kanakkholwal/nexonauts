import { GetSessionParams, getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Button from "components/buttons";
import Badge from "components/topography/badge";
import Head from "next/head";
import Link from 'next/link';
import { sessionType } from "@/src/types/session";


export default function Dashboard({ user }) {
  


    return (
        <>
            <Head>
                <title>UI Page</title>
            </Head>
          
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