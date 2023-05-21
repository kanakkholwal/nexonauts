import { getSession } from "next-auth/react"
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import State from 'components/state';
import { timeAgo } from 'lib/scripts';
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from 'components/Card';
import useSWR from 'swr'
import axios from 'axios';
import styled from "styled-components";

const NotificationCard = styled.div`
border:1px solid rgba(var(--theme-rgb),0.5);
padding:0.75rem 0.75rem;
border-radius:0.5rem;
margin-bottom:0.75rem;
transition:all 0.25s ease;
&:hover{
    background:rgba(var(--theme-rgb),0.1)
}
`;

const fetcher = url => axios.get(url).then(res => res.data)

export default function Notifications({ user }) {

    const { data, error, isLoading } = useSWR('/api/admin/notifications', fetcher)





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
                    {
                        data && data.notifications.length > 0 ? data.notifications.sort((a, b) => {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        }).map(({ user, message, createdAt }, index) => {
                            return (
                                <NotificationCard key={index}>
                                        <CardHeader>
                                            <div>
                                                <CardTitle as="h6">{user.name}</CardTitle>
                                                <CardDescription>{user.email}</CardDescription>
                                            </div>
                                            <span>{timeAgo(new Date(createdAt))}</span>
                                        </CardHeader>
                                        <CardBody>
                                            <p>
                                                {message}
                                            </p>
                                            <p>
                                            </p>
                                        </CardBody>
                                </NotificationCard>
                            )
                        }) : "No Notifications yet"

                    }
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