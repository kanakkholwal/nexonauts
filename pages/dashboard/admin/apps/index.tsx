import { GetSessionParams, getSession } from "next-auth/react";
import type { sessionType } from "types/session";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppContainer, AppCard } from 'layouts/app-page';
import dbConnect from "lib/dbConnect";
import App from "models/app";
import type { AppInfo } from "types/app";
import type { SessionUserType} from "types/user";

export default function Dashboard({
    user,
    apps: defaultApps
}) {

    const [apps, setApps] = useState<AppInfo[]>(defaultApps);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    console.log(apps)
    const getApps = async () => {
        await axios.get('/api/apps/all')
            .then(res => res.data)
            .then(data => {
                setApps(data.apps);
            })
            .catch(err => {
                console.log(err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }
    // useEffect(() => {
    //     getApps();
    // }, [])

    return (
        <>
            <Head>
                <title>All App</title>
            </Head>
            <DashboardPage user={user} headerChildren={<span className="h6">All Apps</span>}>
                <AppContainer>

                    {apps.map((app) => {
                        return (
                            <AppCard className="mb-3 d-flex flex-column justify-content-between " key={app._id}>
                                <div className="mb-auto">
                                    <h5>{app.name}</h5>
                                    <p>{app.shortDescription}</p>
                                </div>
                                <div className="footer">
                                    <span className="category">{app.category.replaceAll("_", " ")}</span>
                                    <Link href={`/apps/${app.appId.replaceAll("_", "-")}`} className="ms-auto" target="_blank">Checkout</Link>
                                    <Link href={`/dashboard/admin/apps/${app.appId}`} >View</Link>
                                    <Link href={`/dashboard/admin/apps/${app.appId}/edit`} className="mx-2">Edit</Link>
                                </div>
                            </AppCard>
                        )
                    })}
                    {loading && <p>Loading...</p>}
                    {!loading && apps.length === 0 && <>No apps Found</>}
                    {!loading && error && <p>Some Error Occurred </p>}
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
    await dbConnect();
    // find all enabled apps
    const apps = await App.find({
        enabled: true, state: "published"
    })
        .select('name shortDescription appId path coverImage recommended version membership category tags author createdAt state')
        .exec();

    return {
        props: {
            user: session.user as SessionUserType,
            apps: JSON.parse(JSON.stringify(apps)) as AppInfo []
        },
    }
}