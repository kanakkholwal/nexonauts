import React from 'react';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import { useSession } from "next-auth/react";


export async function getStaticPaths() {
    // Return a list of possible value for toolName
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/public-tools/ssr`,{
        headers:{
            "Content-Type":"application/json",
            "x-authorization":`Bearer ${process.env.NEXT_AUTH_SECRET}`
        }
    })

    const {tools}  =  data;
    const paths = tools.map(({ slug }) => {
        return {
            params: {
                slug: slug,
            }
        };
    }) || [];
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the tool using params.appName
    try {

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/public-tools/ssr`,{
            slug:params.slug
        },{
            headers:{
                "Content-Type":"application/json",
                "x-authorization":`Bearer ${process.env.NEXT_AUTH_SECRET}`
            }
        })
        const {tool}  =  data;

        if (!tool) {
            return {
                notFound: true,
                revalidate: 60,
                props: {
                    tool: null,
                }
            };
        }
        return {
            props: {
                tool
            },
            revalidate: 60,

        }
    } catch (error) {
        console.log("Error during page generation using slug:", error);
        return {
            notFound: true,
            props: {
                tool: null,
            },
            revalidate: 60,
        };
    }

}

export default function Tool({tool}){


    if(!tool) return null;

    return <>
        {/*  */}
        {tool._id}
    </>
}