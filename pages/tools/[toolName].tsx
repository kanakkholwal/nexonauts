import { MetaData, FooterArea, ToolListJSON } from "../../src/pages/Tools/Tool";
import React from 'react';



export async function getStaticPaths() {
    // Return a list of possible value for toolName
    const paths = ToolListJSON.map(({ path }) => {
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

    const componentPath: string = ToolListJSON.find(({ path }) => path.split("/").pop() === params.toolName).path;


    return { props: { componentPath } }
}



export default function Tool({ componentPath }): JSX.Element {

    const ToolComponent = ToolListJSON.find(({ path }) => path === componentPath);

    return (
        <>
            <MetaData PageTitle={ToolComponent.title} PageDescription={ToolComponent.description} SiteName={''} PageUrl={''} PreviewImage={''} PageType={''} PageLocale={''} />
            {/* <HeaderArea title={ToolComponent.title} description={ToolComponent.description} /> */}
            <main className="G_MainContent">
                {ToolComponent.Component}
            </main>
            <FooterArea />
        </>
    )
}
