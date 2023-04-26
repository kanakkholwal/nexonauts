import { getSession } from "next-auth/react"
import DashboardPage from "components/dashboard-page";
import {Card,CardHeader,CardBody,CardTitle} from "components/Card";
import Head from "next/head";

export default function Settings({ user }) {




    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>
            <DashboardPage user={user}>
                
                <Card>
                    <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    </CardHeader>
                    <CardBody>
                        Dark Mode,
                        Push Notifications,
                        

                    </CardBody>
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



    return {
        props: { user :session.user},

    }
}