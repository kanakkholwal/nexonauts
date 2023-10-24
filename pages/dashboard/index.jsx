import Layout from 'layouts/apps/layout';
import { getSession } from "next-auth/react";

import Head from "next/head";
import styled from "styled-components";
import useSWR from 'swr';


const StyledInfo = styled.div`
    display:flex;
    justify-content:space-around;
    align-items:center;
    flex-wrap:wrap;
    gap:1rem;
    margin-bottom:1rem;
    background:var(--card-bg);
    padding:1rem;
    h2{
        font-size:1.5rem;
        font-weight:600;
    }
    h5{
        font-size:1rem;
        font-weight:500;
        color:var(--text-muted);
    }
    &>span{
        flex:1 1 18%;
        min-width:100px;
        padding:0.5rem;
        text-align:left;
        &:not(:last-child){
            border-right:1px solid rgba(var(--grey-rgb),0.2);
        }
    }
`;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard({ user }) {

    const { data, error, isLoading } = useSWR('/api/users/'+user.id+ "/dashboard" , fetcher);

    // useEffect(() =>{
    //     registerView({ title: "Dashboard", type: "dashboard", slug: "/dashboard" })
    // },[])


    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Layout user={user}>
            <StyledInfo>
                    <span>
                        <h5>Posts</h5>
                        <h2>{data?.stats?.posts}</h2>
                    </span>
                    <span>
                        <h5>Comments</h5>
                        <h2>{data?.stats?.comments}</h2>
                    </span>
                    <span>
                        <h5>Daily Tokens</h5>
                        <h2>{(parseInt(data?.stats?.usage?.usageLimit) - parseInt(data?.stats?.usage?.totalUsageToday))?? 0}</h2>
                    </span>
                    <span>
                        <h5>Total Usage</h5>
                        <h2>{data?.stats?.usage?.totalUsage}</h2>
                    </span>
                   
                    {/* <span> */}
                        {/* <h5>Last Month</h5> */}
                        {/* <h2>{pageInfo.last_month}</h2> */}

                    {/* </span> */}

                </StyledInfo>


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