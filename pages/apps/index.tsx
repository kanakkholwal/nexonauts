import React from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import AppPage ,{AppContainer,AppCard} from 'layouts/app-page';
import { NextSeo } from 'next-seo';
import {TbChevronRight} from 'react-icons/tb';

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
                {apps?.sort((prev,curr) =>{
                    // put recommended apps first
                    if(prev.recommended && !curr.recommended){
                        return -1
                    }
                    if(!prev.recommended && curr.recommended){
                        return 1
                    }
                }).map(app =>{
                    return (
                        <AppCard key={app._id}>
                            <h5>{app.name}</h5>
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-text">{app.shortDescription}</p>
                                    <a href={app.path} className="btn btn-primary">Go to App <TbChevronRight/></a>
                                </div>
                            </div>
                        </AppCard>
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