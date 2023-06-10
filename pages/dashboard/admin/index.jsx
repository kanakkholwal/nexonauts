import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import {DashCard,Icon} from "components/dashboard-page/elements";
import Head from "next/head";
import Link from 'next/link';
import { FaRegUser } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiArticleLine } from 'react-icons/ri';

import useSWR from "swr";
import axios from "axios";
import { getAnalytics } from 'lib/analytics';


const fetchData = async (url, data) => {
    const response = await axios.post(url, data);
    return response.data;
};
const fetcher = url => axios.get(url).then(res => res.data)

export default function Dashboard({ user }) {
  
    const { data:UserData, error:userListError, isLoading :userListLoading} = useSWR(['/api/admin/users/all', { adminId: user.id }], ([url, data]) => fetchData(url, data))
    const { data:pageData, error:pageError, isLoading:pageLoading} = useSWR('/api/admin/analytics', fetcher)
    const { data:postData, error:postError, isLoading:postLoading} = useSWR('/api/admin/blog/get', fetcher)

    if(pageError)
        console.log(pageError);
    if(userListError)
        console.log(userListError);
    if(postError)
        console.log(postError);

  


    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <DashboardPage user={user}>
                <div className="d-flex justify-content-start g-3 align-items-center my-2 flex-wrap">
                    <DashCard as={Link} href="/dashboard/admin/users">
                        <div>
                            <span>Total Users</span>
                            <h2>{UserData? UserData.users?.length :0}</h2>
                            {/* <span> Registered yet</span> */}
                        </div>
                        <Icon>
                            <FaRegUser />
                        </Icon>
                    </DashCard>
                    <DashCard as={Link} href="/dashboard/admin/blog">
                        <div>
                            <span>Total Posts</span>
                            <h2>{postData? postData?.noOfPosts :0}</h2>
                            {/* <span> Created yet</span> */}
                        </div>
                        <Icon>
                            <RiArticleLine />
                        </Icon>
                    </DashCard>
                    <DashCard as={Link} href="/dashboard/admin/analytics">
                        <div>
                            <span>Total Activities</span>
                            <h2>{pageData? getAnalytics(pageData.pages)?.length:0}</h2>
                        </div>
                        <Icon>
                            <TbBrandGoogleAnalytics />
                        </Icon>
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