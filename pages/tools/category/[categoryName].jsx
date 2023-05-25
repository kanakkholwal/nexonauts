import { ToolList, CategoryList } from "pages/tools/ToolsList";
import React from 'react';
import ToolPage from "components/tool-page";
import { useSession } from "next-auth/react";
import PageMetaData from "components/PageMetaData";
import {
    ToolCard,
    CardContainer
} from "components/tools"; import Head from "next/head";


import { registerView } from "lib/analytics";
import { useEffect } from "react";


export async function getStaticPaths() {
    // Return a list of possible value for toolName
    const paths = CategoryList.map(({ path }) => {
        return {
            params: {
                categoryName: path.split("/").pop()
            }
        };
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {

    const path = CategoryList.find(({ path }) => path.split("/").pop() === params.categoryName).path;

    if(!path)
    {
        return {
            notFound: true
        }
    }
    return { props: { path } }
}





export default function Tool({ path }){
    const { data: session } = useSession();

    const Category = CategoryList.find((category) => category.path === path);
    const ToolsInThisCategory = ToolList.filter(({ category }) => category === Category.title);
    useEffect(() =>{
        registerView({ title: "Tools Category" + Category.title, type: "page", slug: "/tools/category/"+path })
    },[])
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href={process.env.WEBSITE_URL || 'https://kkupgrader.eu.org' + "/tools/category" + Category.path.split("/").pop()}
                    key="canonical"
                />
            </Head>
            <ToolPage headerChildren={null} session={session || null} metadata={{
                title: Category.title,
                description: ""
            }}>
                <CardContainer>

                    {
                        ToolsInThisCategory.map(({ title, description, path, category, online }, index) => {
                            return <ToolCard path={path} key={index} title={title} description={description} category={category} online={online} style={{ animationDelay: (0.1 * index) + "s" }} />

                        })
                    }

                </CardContainer>
            </ToolPage>
            <PageMetaData PageTitle={Category.title} PageDescription={"  "} SiteName={''} PageUrl={''} PreviewImage={''} PageType={''} PageLocale={''} />
        </>
    )
}
