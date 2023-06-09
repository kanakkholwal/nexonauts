import Head from "next/head";
import { registerView } from "lib/analytics";
import { useEffect } from "react";


export default function AiDirectory() {


    // useEffect(() =>{
    //     registerView({ title: "Dashboard", type: "dashboard", slug: "/dashboard" })
    // },[])


    return (
        <>
            <Head>
                <title>Ai directory</title>
            </Head>
            <div>
                Coming Soon!

            </div>
        </>
    )
}


export async function getServerSideProps(context) {


  

    return {
        props: { 
            
        },

    }
}