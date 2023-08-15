import { GetSessionParams, getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";

import axios from "axios";
import toast,{ Toaster } from "react-hot-toast";
import { sessionType } from "@/src/types/session";
import { SessionUserType, UserType } from "@/src/types/user";
import styled from "styled-components";
import dbConnect from "lib/dbConnect";
import Post,{Comment} from "models/post";

export default function UserPage({ 
     user,
     data

     }: {  
        user: UserType,
        data:{
            posts:number,
            comments:number
        }
     }) {
    // Render post...
   
    return (<>
        <Head>
            <title>Blog Stats | {process.env.NEXT_PUBLIC_WEBSITE_NAME || "Nexonauts"}</title>
        </Head>
        <DashboardPage
            user={user}
            headerChildren={<span className="h6">Blog Stats</span>}>
       Posts : {data.posts} <br/>
         Comments : {data.comments} 

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
    await dbConnect();
    const [posts,comments] = await Promise.allSettled([
        Post.countDocuments({}).exec(),
        Comment.countDocuments({}).exec()
    ]);


        
        return {
            props: {
                user: session.user,
                data:{
                    posts: posts.status === 'rejected' ? 0 : posts.value,
                    comments: comments.status === 'rejected' ? 0 : comments.value
                }
            }
        }
        
    


    


}