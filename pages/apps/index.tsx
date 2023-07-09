import React from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import AppPage ,{AppContainer,Card} from 'layouts/app-page';
import { NextSeo } from 'next-seo';


export default function App({ apps}) {

    
    const {data:session} = useSession();



    return (
        <AppPage user={session?.user} headerChildren={<span className='h6'>All Apps</span>}>
            <NextSeo
                title="All Apps"
                description="All Apps"
                canonical={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/apps`}
                openGraph={{
                    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/apps`,
                    title: "All Apps",
                    description: "All Apps",
                    images: [
                        {
                            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/logo.png`,
                            width: 800,
                            height: 600,
                            alt: "All Apps",
                        },
                    ],
                }}
            />
            <AppContainer>
                {apps.map(app =>{
                    return (
                        <Card className="mb-4" key={app._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{app.name}</h5>
                                    <p className="card-text">{app.shortDescription}</p>
                                    <a href={app.path} className="btn btn-primary">Go to App</a>
                                </div>
                            </div>
                        </Card>
                    )
                })}
            </AppContainer>

        </AppPage>
    )
}

export async function getServerSideProps(context) {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/apps/all`)

    const {apps}  = data || []



    return {
        props: {
            apps
        },

    }
}