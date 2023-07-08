import React from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import TextInputToTextOutput from 'layouts/text_input_to_text_output';

const componentPath = {
    grammar_check: () => {
        return <div>Grammar Check</div>
    }
}
export async function getStaticPaths() {
    // Return a list of possible value for toolName
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/app/all`)
    const {apps}  =  data;
    const paths = apps.map(({ appId }) => {
        return {
            params: {
                appName: appId.replace("_", "-")
            }
        };
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the tool using params.appName
    try {

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/app/all`)
        const {apps}  =  data;
        const component = apps.find(({ appId }) => appId.replace("_", "-") === params.appName);

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
            revalidate: 10,

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


    return (
        <>
            {hardCoded ?
                <div>
                    {ToolComponent && <div>Not ready for Hard Coded Apps</div>}
                </div>
                : <Components app={app} user={session?.user}/>
            }

        </>
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