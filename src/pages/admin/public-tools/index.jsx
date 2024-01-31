import { getSession } from "next-auth/react"
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import useSWR from 'swr'
import axios from 'axios';
import styled from "styled-components";


const fetcher = url => axios.get(url).then(res => res.data)

export default function Notifications({ user }) {

    const { data, error, isLoading } = useSWR('/api/admin/public-tools/get', fetcher)





    return (
        <>
            <Head>
                <title>All Public Tools</title>
            </Head>
            <DashboardPage user={user}>
         

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
        props: { user: session.user },
    }
}