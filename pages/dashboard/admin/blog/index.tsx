import { GetSessionParams, getSession } from "next-auth/react";
import dbConnect from "lib/dbConnect";
import Post,{Comment} from "models/post";
import Page from "models/page";

import DashboardPage from "components/dashboard-page";
import Head from "next/head";

import axios from "axios";
import toast,{ Toaster } from "react-hot-toast";
import { sessionType } from "@/src/types/session";
import { SessionUserType, UserType } from "@/src/types/user";
import styled from "styled-components";
// icons
import {BiComment} from "react-icons/bi";
import { MdOutlineArticle } from "react-icons/md";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    gap: 1rem;

`;
const InfoCard = styled.div<{
    variant: string
}>`
    background-color: var(--card-bg);
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    text-align: center;
    min-width: 200px;
    width: clamp(50px, 100%, 300px);
    padding: 1rem;
    border-radius: 0.5rem;
    --color-rgb: ${({ variant }) => `var(--${variant || "theme"}-rgb)`};
    background: rgba(var(--color-rgb,var(--card-bg)),0.051);

    .icon{
        font-size: 2rem;
        color: rgba(var(--color-rgb,var(--text-color)),1);
    }
    .label{
        font-size: 1rem;
    font-weight: 500;
    color: var(--text-muted);
    }
    .value{
        font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 1px;
    color: rgba(var(--color-rgb,var(--text-color)),1);
    }


`;

export default function UserPage({ 
     user,
     data

     }: {  
        user: UserType,
        data:{
            posts:number,
            comments:number,
            totalViews:any
        }
     }) {
    // Render post...
    console.log(data)
   
    return (<>
        <Head>
            <title>Blog Stats | {process.env.NEXT_PUBLIC_WEBSITE_NAME || "Nexonauts"}</title>
        </Head>
        <DashboardPage
            user={user}
            headerChildren={<span className="h6">Blog Stats</span>}>

                <Wrapper>
                    <InfoCard variant="theme">
                        <MdOutlineArticle className="icon" size={56}/>
                        <span className="value">{data.posts}</span>
                        <span className="label">Posts</span>
                    </InfoCard>
                    <InfoCard variant="primary">
                        <BiComment className="icon" size={56}/>
                        <span className="value">{data.comments}</span>
                        <span className="label">Comments</span>
                    </InfoCard>
                </Wrapper>

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
        Comment.countDocuments({}).exec(),
    ]);


    

        
        return {
            props: {
                user: session.user,
                data:{
                    posts: posts.status === 'rejected' ? 0 : posts.value,
                    comments: comments.status === 'rejected' ? 0 : comments.value,
                    totalViews:0
                }
            }
        }
        
    


    


}