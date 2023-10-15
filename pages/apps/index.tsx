import axios from 'axios';
import { CATEGORIES } from 'lib/apps/utils';
import { useSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import { useCallback } from 'react';
// FiltersContainer
// import Chip from '@/components/topography/chips';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useRouter } from 'next/router';
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from 'layouts/common/footer';
import Header from 'layouts/common/header';
import Hero from 'layouts/common/hero';
import Link from 'next/link';
import { RiSearch2Line } from "react-icons/ri";

export default function App({ apps, popularApps }) {


    const { data: session } = useSession();

    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { category } = router.query;


    const handleFilters = useCallback(() => {
        if (category) {
            return apps.filter(app => app.category === category);
        }
        return apps;
    }
        , [category]);

    const handleSearch = async (query: string) => {
        if (query.length > 0) {
            setLoading(true);
            try {
                const response = await fetch(`/api/apps/search?query=${query}`);
                const data = await response.json();
                if (data.success === true) {
                    setData(data);
                    console.log(data);
                    setError(null);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
    }




    return (
        <>
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
            <Header />
            <Hero title={"AI Apps"}
            path={[ { name: "AI Apps", path: "/apps" }]}
            />
            <section className='max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 z-10 mb-10'>
                <div className='mt-5 group shadow-lg relative aiSearch-border-gredient border border-[#8f59ec] rounded-lg lg:py-2 lg:px-6 p-4 flex justify-center md:justify-between lg:flex-row items-center'>
                    <RiSearch2Line className='text-accent-foreground w-5 h-5' />
                    <Input placeholder={"Search for an app or what kind of work you need..."} className='w-auto max-w-full grow'
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    value={query}
                    />
                    <Button className="hero-button-gradient" onClick={() =>{
                            handleSearch(query);
                    }}>
                        Search Apps
                    </Button>
                    {/* Popular suggestions for search .... */}
                    {/* <div className='hidden group-focus-within:block group-focus-visible:block group-focus:block absolute z-50 bg-slate-50 top-[100%] left-2 right-2 shadow-2xl p-4 rounded-lg'>
                        <h4 className='text-slate-700'>
                            Popular Searches :
                        </h4>
                        <ul>
                        {popularApps?.map((item, index:number) => {
                            return (
                                <li key={index}
                                    className='text-accent-foreground cursor-pointer hover:text-accent-foreground-hover'
                                    aria-label={item.name}
                                    role='button'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setQuery(item.name);
                                    }}
                                >
                                    {item.name}
                                </li>)
                        })}
                        </ul>
                    </div> */}
                </div>
        

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-7 pt-7'>
                    {handleFilters()?.sort((prev, curr) => {
                        // put recommended apps first
                        if (prev.recommended && !curr.recommended) {
                            return -1
                        }
                        if (!prev.recommended && curr.recommended) {
                            return 1
                        }
                    }).map(app => {
                        const Category = CATEGORIES.find((category) => category.value === app.category)

                        return (
                            <Card key={app._id} className='py-9 px-8 flex flex-col justify-between'>
                                <CardContent>
                                    <span className='icon-border group-hover:shadow-lg group-hover:bg-white relative max-w-[80px] bg-slate-100 w-full h-20 rounded-full inline-flex items-center justify-center mb-8 mx-auto'>
                                        {Category ?  <Category.Icon className="w-6 h-6" />:null}
                                    </span>
                                    <CardHeader>
                                        <CardTitle className='font-bold text-2xl mb-4'>{app.name}</CardTitle>
                                        <CardDescription className='text-md text-slate-600'>{app.shortDescription}</CardDescription>
                                    </CardHeader>

                                </CardContent>
                                <CardFooter>
                                    <Link href={app.path} className='mt-9 inline-block button-border-gradient relative rounded-lg  text-sm  gap-1.5 py-3 px-6 shadow-button hover:button-gradient-hover hover:shadow-none'>
                                        Try Out
                                    </Link>
                                </CardFooter>

                            </Card>
                        )
                    })}
                </div>
            </section>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/apps/all`)

    const { apps, popularApps } = data || {} as {
        apps: any[],
        popularApps: any[]
    }



    return {
        props: {
            apps: apps || [],
            popularApps: popularApps || []
        },

    }
}