import ToolsList from "src/pages/Tools/ToolsList";
import React from 'react';
import ToolPage from "components/tool-page";
import { useSession } from "next-auth/react";
import PageMetaData from "components/PageMetaData";
import Card from "src/pages/Tools/components/Card";
import Head from "next/head";



export async function getStaticPaths() {
    // Return a list of possible value for toolName
    const paths = ToolsList.map(({ category }) => {
        return {
            params: {
                category: category.toLocaleLowerCase().split(" ").join("-")
            }
        };
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {

    const ToolsInThisCategory = ToolsList.filter(({ category }) => category.toLocaleLowerCase().split(" ").join("-") === params.category);


    return { props: { slug: ToolsInThisCategory } }
}



export default function Tool({ slug }): JSX.Element {
    const { data: session } = useSession();

    const ToolComponent = ToolsList.find(({ path }) => path === slug);

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
                {
                    ToolList.map(({ title, description, path, category, online }, index) => {
                        return <Card path={path} key={index} title={title} description={description} category={category} online={online} style={{ animationDelay: (0.1 * index) + "s" }} />

                    })
                }

            </ToolPage>
            <PageMetaData PageTitle={ToolComponent.title} PageDescription={ToolComponent.description} SiteName={''} PageUrl={''} PreviewImage={''} PageType={''} PageLocale={''} />
        </>
    )
}
