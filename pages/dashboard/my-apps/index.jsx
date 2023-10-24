import Layout from 'layouts/apps/layout';
import { getSession } from "next-auth/react";

import Head from "next/head";



export default function Dashboard({ user }) {


    return (
        <>
            <Head>
                <title>
                    My Apps
                </title>
            </Head>
            <Layout user={user}>
        

            </Layout>
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



    return {
        props: { user :session.user},

    }
}