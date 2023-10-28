import { CATEGORIES } from 'lib/apps/utils';
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
import Layout from 'layouts/apps/layout';
import dbConnect from 'lib/dbConnect';
import { GetSessionParams, getSession } from "next-auth/react";
import Link from 'next/link';
import { BiSliderAlt } from 'react-icons/bi';
import { FaAngleRight } from 'react-icons/fa';
import { RiSearch2Line } from "react-icons/ri";
import { AppType } from 'src/types/app';
import { sessionType } from "src/types/session";
import { SessionUserType } from 'src/types/user';
import { getAllApps } from "src/utils/app";

export default function App({ apps, popularApps, user }: {
    user: SessionUserType | null,
    apps: AppType[],
    popularApps: AppType[]

}) {



    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { category } = router.query;


    const handleFilters = useCallback(() => {
        if (category) {
            return apps.filter(app => app.categories.includes(category as string));
        }
        return apps;
    }, [category]);

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
        <Layout user={user}>
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
            <div className="max-full grow">
                <h1 className="text-3xl font-bold">
                    All Applications
                </h1>
                <p className="text-slate-500 mt-2 line-clamp-3">
                    Find perfect apps for your needs
                </p>


                <section className='max-w-[1170px] mt-8 mx-auto px-4 sm:px-8 xl:px-0 z-10 mb-10'>
                    <div className='mt-5 group shadow-lg relative aiSearch-border-gredient border border-[#8f59ec] rounded-lg lg:py-2 lg:pl-6 p-4 flex gap-1 justify-center md:justify-between lg:flex-row items-center'>
                        <RiSearch2Line className='text-accent-foreground w-5 h-5' />
                        <Input placeholder={"Search for an app or what kind of work you need..."} className='w-auto max-w-full grow'
                            onChange={(e) => {
                                setQuery(e.target.value);
                            }}
                            value={query}
                        />
                        <Button className="hero-button-gradient" onClick={() => {
                            handleSearch(query);
                        }}>
                            Search Apps
                        </Button>
                        <Button variant="slate" onClick={() => {
                            handleSearch(query);
                        }}>
                            <BiSliderAlt className='text-accent-foreground w-5 h-5' />
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
                        {apps.map(app => {
                            const Category = CATEGORIES.find((category) =>  app.categories.includes(category.value));

                            return (
                                <Card key={app._id} className='py-5 flex flex-col justify-between group'>
                                    <CardHeader className="py-4 px-2">
                                        <div className='flex gap-2 items-center justify-start'>
                                            <span className='icon-border group-hover:bg-primary/10 relative max-w-[80px] bg-slate-200 w-full h-20 rounded-full inline-flex items-center justify-center  ml-3 '>
                                                {Category ? <Category.Icon className="w-6 h-6" /> : null}
                                            </span>
                                            <CardTitle className='font-bold text-2xl mb-4'>{app.name}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className='px-5 flex flex-col items-start'>
                                        <CardDescription className='text-md font-medium text-slate-600'>{app.shortDescription}</CardDescription>

                                    </CardContent>
                                    <CardFooter>
                                        <Link href={app.path} className='inline-flex items-center text-white font-semibold hero-button-gradient relative rounded-lg  text-sm  gap-1.5 py-3 px-6 shadow-button hover:button-gradient-hover hover:shadow-none'>
                                            Try Out <FaAngleRight className='w-4 h-4 ml-2' />
                                        </Link>
                                    </CardFooter>

                                </Card>
                            )
                        })}
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: GetSessionParams) {
    const session = (await getSession(context)) as sessionType | null;

    await dbConnect();
    const { apps, popularApps } = await getAllApps();

    return {
        props: {
            apps: JSON.parse(JSON.stringify(apps)) || [],
            popularApps: JSON.parse(JSON.stringify(popularApps)) || [],
            user: session?.user || null
        },

    }
}