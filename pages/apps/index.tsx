import React from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import AppPage ,{AppContainer,AppCard} from 'layouts/app-page';
import { NextSeo } from 'next-seo';
import {TbChevronRight} from 'react-icons/tb';
import { 
    SearchContainer,
    StyledHeading,
    StyledSubHeading,
    StyledForm,
    StyledInput,
    StyledButton,
    Suggestions
} from "components/search/components";
import { TbSearch } from "react-icons/tb";
import { useState } from "react";


export default function App({ apps,popularApps}) {

    
    const {data:session} = useSession();

    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    
    const handleSearch = async (query:string) => {
        if(query.length > 0){
            setLoading(true);
            try{
                const response = await fetch(`/api/apps/search?query=${query}`);
                const data = await response.json();
                if(data.success === true){
                    setData(data);
                    console.log(data);
                    setError(null);
                }
            }catch(error){
                setError(error);
            }finally{
                setLoading(false);
            }
        }
    }



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
             <SearchContainer>
                <StyledHeading>
                    Search for Apps
                </StyledHeading>
                <StyledSubHeading>
                    Find perfect apps for your needs
                </StyledSubHeading>
                <StyledForm onSubmit={(e) =>{
                    e.preventDefault();
                    handleSearch(query);
                }}>
                    <StyledButton type="submit">
                        <TbSearch/>
                    </StyledButton>
                    <StyledInput type="text" placeholder={"Search for an app or what kind of work you need..."} 
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        value={query}
                        />
                </StyledForm>
                {popularApps && popularApps.length > 0 && (<Suggestions>
                    <span>
                    Popular Searches : 
                    </span>
                    {popularApps.map((item, index) => {
                        return (
                            <span key={index}
                            onClick={(e) =>{
                                e.preventDefault();
                                e.stopPropagation();
                                setQuery(item.name);
                            }}
                            >
                                {item.name}
                            </span>) })}

                </Suggestions>)}
            </SearchContainer>

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
                   
                                    <p>{app.shortDescription}</p>
                                    <div className='footer'>
                                        <span className="category">{app.category.replaceAll("_"," ")}</span>
                                    <a href={app.path} className="btn btn-primary">Go to App <TbChevronRight/></a>
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

    const {apps,popularApps}  = data || {} as {
        apps:any[],
        popularApps:any[]
    }



    return {
        props: {
            apps:apps || [],
            popularApps:popularApps || []
        },

    }
}