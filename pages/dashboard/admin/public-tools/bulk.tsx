import { GetSessionParams, getSession } from "next-auth/react"
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import styled from "styled-components";

import axios from 'axios';
import { sessionType } from "@/src/types/session";


async function CompressData(data){
  
}

export default function Notifications({ user }) {


    




    return (
        <>
            <Head>
                <title>All Public Tools</title>
            </Head>
            <DashboardPage user={user}
                headerChildren={<span className="h5">All Public Tools</span>}
            >

                <input 
                    type="file"
                    onChange={(e) => {
                        if (e.target.files) {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onload = async (e) => {
                                const text = (e.target?.result as string);
                                const data = JSON.parse(text);
                                await CompressData(data);
                            };
                            reader.readAsText(file);
                        }
                    }
                    }/>
         

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