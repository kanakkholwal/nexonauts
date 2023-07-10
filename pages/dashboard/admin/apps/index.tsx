import { GetSessionParams, getSession } from "next-auth/react";
import type {sessionType} from "types/session";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import {AppContainer,Card} from 'layouts/app-page';

export default function Dashboard({ user}) {
    
    const [apps, setApps] = useState<any[]>([]);

    const getApps = async () => {
        const res = await axios.get('/api/apps/all');
        console.log(res.data);
        setApps(res.data.apps);
    }
    useEffect(() => {
        getApps();
    }, [])
    
    return (
        <>
            <Head>
                <title>All App</title>
            </Head>
            <DashboardPage user={user} headerChildren={<span className="h6">All Apps</span>}>
                <AppContainer>

                {apps.map((app) => {
                    return (
                        <Card className="mb-3 d-flex flex-column justify-content-between " key={app._id} style={{
                            width: '100%',
                            maxWidth: '480px',
                        }}>

                            <div className="mb-auto">
                                <h5 className="card-title">{app.name}</h5>
                                <p className="card-text">{app.shortDescription}</p>
                            </div>
                            <div className="mt-auto d-flex justify-content-end align-items-center">
                                    <Link href={`/dashboard/admin/apps/${app.appId}`} className="ms-auto underline">View</Link>
                                    <Link href={`/dashboard/admin/apps/${app.appId}/edit`} className="mx-2 underline">Edit</Link>
                            </div>

                        </Card>
                    )
                })}
                                </AppContainer>

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