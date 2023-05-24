import { getSession } from "next-auth/react"
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import State from 'components/state';
import { timeAgo } from 'lib/scripts';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from 'components/Card';
import useSWR from 'swr'
import axios from 'axios';
import styled from "styled-components";



const fetcher = url => axios.get(url).then(res => res.data)

export default function Stats({ user }) {

    const { data, error, isLoading } = useSWR('/api/admin/pages', fetcher)





    return (
        <>
            <Head>
                <title>All Notifications</title>
            </Head>
            <DashboardPage user={user}>
                <State loader={{ type: "indeterminate", show: isLoading, }} alert={{
                        type: error ? "danger" : "success",
                        message: error ? error.message : "Notifications loaded successfully",
                        show: error ? true : false
                    }} />
                <Card style={{
                    opacity: isLoading ? 0.5 : 1,
                    pointerEvents: isLoading ? "none" : "auto",
                    padding:"0.5rem"
                }}>
           
                </Card>

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