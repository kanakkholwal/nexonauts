import { ToolContainer } from "components/tools";
import Layout from 'layouts/apps/layout';
import { useSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import { ToolList } from "pages/tools/ToolsList";
import SimilarTools from "pages/tools/components/SimilarTools";

// import { registerView } from "lib/analytics";
// import { useEffect } from "react";


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

    const component = ToolList.find(({ path }) => path.split("/").pop() === params.toolName);
    if (!component) {
        return {
            notFound: true
        }
    }



    return { props: { slug: component.path } }
}



export default function Tool({ slug }) {
    const { data: session } = useSession() as any

    const ToolComponent = ToolList.find(({ path }) => path === slug);
    if (!ToolComponent) {
        return {
            notFound: true
        }
    }
    // useEffect(() =>{
    //     registerView({ title: ToolComponent.title, type: "tool", slug:slug })
    // },[])
    return (
        <>

            <NextSeo
                title={ToolComponent.title}
                description={ToolComponent.description}


            />
            <Layout user={session?.user}>

                <div className="max-full grow">
                    <h1 className="text-3xl font-bold">
                        {ToolComponent.title}
                    </h1>


                    <p className="text-slate-500 mt-2 line-clamp-3">
                        {ToolComponent.description}
                    </p>
                    <ToolContainer>
                        {ToolComponent.Component}
                    </ToolContainer>
                    <SimilarTools category={ToolComponent.category} tool={ToolComponent} />

                </div>

            </Layout>
        </>
    )
}
