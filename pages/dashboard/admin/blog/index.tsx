import { GetSessionParams, getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import axios from "axios";
import toast,{ Toaster } from "react-hot-toast";
import { sessionType } from "@/src/types/session";
import { SessionUserType, UserType } from "@/src/types/user";
import styled from "styled-components";

export default function UserPage({  user }: {  user: UserType }) {
    // Render post...
   
    return (<>
        <Head>
            <title>Blog Stats| {process.env.NEXT_PUBLIC_WEBSITE_NAME}</title>
        </Head>
        <DashboardPage
            user={user}
            headerChildren={<span className="h6">Blog Stats</span>}>
            
        </DashboardPage>
        <Toaster />
    </>
    );

}
export async function getServerSideProps(context: GetSessionParams) {


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
            props: {
                user: session.user,
            }
        }
    
    


}