import { ToolList } from "pages/tools/ToolsList";
import React from 'react';
import ToolPage from "components/tool-page";
import SimilarTools from "pages/tools/components/SimilarTools";
import { ToolContainer } from "components/tools";
import { useSession } from "next-auth/react";
import PageMetaData from "components/PageMetaData";
import Head from "next/head";



export async function getStaticPaths() {
    // Return a list of possible value for toolName
    const paths = ToolList.map(({ path }) => {
        return {
            params: {
                toolName: path.split("/").pop()
            }
        };
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {

    const componentPath = ToolList.find(({ path }) => path.split("/").pop() === params.toolName).path;

    if(!componentPath)
    {
        return {
            notFound: true
        }
    }

    return { props: { slug: componentPath } }
}



export default function Tool({ slug }) {
    const { data: session } = useSession();

    const ToolComponent = ToolList.find(({ path }) => path === slug);

    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href={process.env.WEBSITE_URL || 'https://kkupgrader.eu.org' + slug}
                    key="canonical"
                />
            </Head>
            <ToolPage headerChildren={null} session={session || null} metadata={{
                title: ToolComponent.title,
                description: ToolComponent.description
            }}>
                <ToolContainer>
                    {ToolComponent.Component}
                </ToolContainer>
                <SimilarTools category={ToolComponent.category} />

            </ToolPage>
            <PageMetaData PageTitle={ToolComponent.title} PageDescription={ToolComponent.description} SiteName={''} PageUrl={''} PreviewImage={''} PageType={''} PageLocale={''} />
        </>
    )
}
