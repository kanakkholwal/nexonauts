import React from 'react';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import { useSession } from "next-auth/react";
import AppPage from 'layouts/app-page';
import TextInputToTextOutput from 'layouts/text_input_to_text_output';
const componentPath = {
    grammar_check: () => {
        return <div>Grammar Check</div>
    }
}
export async function getStaticPaths() {
    // Return a list of possible value for toolName
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/apps/all`)

    const {apps}  =  data;
    const paths = apps.map(({ appId }) => {
        return {
            params: {
                appName: appId.replaceAll("_", "-")
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

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/apps/all`)
        const {apps}  =  data;
        const component = apps.find(({ appId }) => appId.replaceAll("_", "-") === params.appName);

        if (!component) {
            return {
                notFound: true,
                revalidate: 60,
                props: {
                    app: null,
                    hardCoded: false,
                }
            };
        }
        return {
            props: {
                app: component,
                hardCoded: false
            },
            revalidate: 60,

        }
    } catch (error) {
        console.log("Error during page generation using slug:", error);
        return {
            notFound: true,
            props: {
                app: null,
                hardCoded: false,
            },
            revalidate: 60,
        };
    }

}



export default function App({ app, hardCoded }) {
    var ToolComponent = null;

    if (hardCoded !== false) {
        ToolComponent = componentPath[app.appId]
    }
    
    const {data:session} = useSession();


    if(!app) return null;
    console.log(app)

    return (
        <AppPage user={session?.user} headerChildren={<span className='h6'>{app.name}</span>}>
            <NextSeo
                title={app.name}
                description={app.shortDescription}
                canonical={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/apps/${app.appId.replaceAll("_", "-")}`}
                openGraph={{
                    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/apps/${app.appId.replaceAll("_", "-")}`,
                    title: app.name,
                    description: app.shortDescription,
                    images: [
                        {
                            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/logo.png`,
                            width: 800,
                            height: 600,
                            alt: app.name,
                        },
                    ],
                }}
            />
            {hardCoded ?
                <div>
                    {ToolComponent && <div>Not ready for Hard Coded Apps</div>}
                </div>
                : <Components app={app} user={session?.user}/>
            }

        </AppPage>
    )
}
const Components = ({ app ,user}) => {
    if (app.type === "text_input_to_text_output") {
        return (<TextInputToTextOutput app={app} user={user}/>)
    }
    return (<>
        App Type : {app.type}
    </>)



}