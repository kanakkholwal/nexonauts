import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import Link from 'next/link';
import { Card, CardTitle, CardDescription } from "components/Card"
import styled from "styled-components";
import { FaRegUser } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import useSWR from "swr";
import axios from "axios";

const DashCard = styled(Card)`
max-width:350px;
flex:1 1 auto;
display:flex;
align-items:center;
flex-direction:row;
gap:0.75rem;
span{
    font-size:1.25rem;
    font-weight:600;
    margin:0;
    color:rgba(var(--text-rgb),0.6);
}
`;
const Icon = styled.div`
flex:1 1 auto;
color:rgba(var(--theme-rgb),0.5);
display:inline-flex;
align-items:center;
justify-content:center;
background:rgba(var(--theme-rgb),0.1);
border-radius:0.5rem;
padding:0.5rem;
aspect-ratio:1;
max-width:120px;
max-height:80px;
svg{
    font-size:48px;
    margin:auto;
    aspect-ratio:1;
}
`;
const fetchData = async (url, data) => {
    const response = await axios.post(url, data);
    return response.data;
};
const fetcher = url => axios.get(url).then(res => res.data)

export default function Dashboard({ user }) {
  
    const { data:UserData, error:userListError, isLoading :userListLoading} = useSWR(['/api/admin/users/all', { adminId: user.id }], ([url, data]) => fetchData(url, data))
    const { data:pageData, error:pageError, isLoading:pageLoading} = useSWR('/api/admin/pages', fetcher)

  


    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <DashboardPage user={user}>
                <div className="d-flex justify-content-start g-3 align-items-center my-2 flex-wrap">
                    <DashCard as={Link} href="/dashboard/admin/users">
                        <Icon>
                            <FaRegUser />
                        </Icon>
                        <div>
                            <span>Total Users</span>
                            <h2>{UserData?.users?.length}</h2>
                        </div>
                    </DashCard>
                    <DashCard as={Link} href="/dashboard/admin/stats">
                        <Icon>
                            <TbBrandGoogleAnalytics />
                        </Icon>
                        <div>
                            <span>Total Activities</span>
                            <h2>{pageData?.pages?.length}</h2>
                        </div>
                    </DashCard>
                </div>
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