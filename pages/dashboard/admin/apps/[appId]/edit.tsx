import { GetSessionParams, getSession } from "next-auth/react";
import type {sessionType} from "types/session";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { App } from "src/types/app";
import AppBuilder from "pages/app-builder";
import toast, { Toaster } from 'react-hot-toast';


export default function Dashboard({ user }) {
    const [app, setApp] = useState<App | null>(null);
    const router = useRouter();
    const {appId} = router.query;

    const getApp = async () => {
        const res = await axios.post('/api/apps/get',{
            appId: appId,
            userId: user.id
        });
        console.log(res.data);
        setApp(res.data.app);
    }
    useEffect(() => {
        toast.promise(getApp(), {
            loading: 'Loading...',
            success: "App loaded",
            error: "Error loading app"
        });
    }, [appId])
    

    return (
        <>
            <Head>
                <title>Update App</title>
            </Head>
            <DashboardPage user={user} headerChildren={
                <span className="h6">
                Update App
                </span>
            }>
                {app ? <AppBuilder user={user} app={app}  type="update"/> :null}
            </DashboardPage>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
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