import { ToolList } from "pages/tools/ToolsList";
import React from 'react';
import ToolPage from "components/tool-page";
import { useSession } from "next-auth/react";
import PageMetaData from "components/PageMetaData";
import {
    ToolCard,
    CardContainer
} from "components/tools"; import Head from "next/head";


export async function getStaticPaths() {
    const Categories = ToolList.map(({ category }) => {

        return {
            params: {
                category: category.toLocaleLowerCase().split(" ").join("-"),
                categoryName: category
            }
        }
    });

    return {
        paths: Categories,
        fallback: true,
    }
}

export async function getStaticProps({ params }) {



    return { props: { params } }
}



export default function Tool({ params }): JSX.Element {
    const { data: session } = useSession();

    const ToolsInThisCategory = ToolList.filter(({ category }) => category.toLocaleLowerCase().split(" ").join("-") === params.category);

    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href={process.env.WEBSITE_URL || 'https://kkupgrader.eu.org' + "/tools/category" + params.category}
                    key="canonical"
                />
            </Head>
            <ToolPage headerChildren={null} session={session || null} metadata={{
                title: params.categoryName,
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
            <PageMetaData PageTitle={params.categoryName} PageDescription={"  "} SiteName={''} PageUrl={''} PreviewImage={''} PageType={''} PageLocale={''} />
        </>
    )
}
