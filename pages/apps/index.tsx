import { CATEGORIES } from 'lib/apps/utils';
import { NextSeo } from 'next-seo';
import { useCallback, useMemo } from 'react';
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
import SearchFilter, { filterType } from 'layouts/apps/search-filter';
import dbConnect from 'lib/dbConnect';
import { GetSessionParams, getSession } from "next-auth/react";
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CgSpinnerAlt } from 'react-icons/cg';
import { FaAngleRight } from 'react-icons/fa';
import { GrFormClose } from 'react-icons/gr';
import { RiSearch2Line } from "react-icons/ri";
import { AppType, MemberShipType } from 'src/types/app';
import { sessionType } from "src/types/session";
import { SessionUserType } from 'src/types/user';
import { getAllApps } from "src/utils/app";

export default function App({ apps, popularApps, user }: {
    user: SessionUserType | null,
    apps: AppType[],
    popularApps: AppType[]

}) {



    const [query, setQuery] = useState("");
    const [data, setData] = useState({
        apps: apps,
        total: apps.length,
        success: false,
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { category } = router.query;

    const [filter, setFilter] = useState<filterType>({
        categories: [category ? category as string : ""],
        membership: [],
        popularity: "",
    });


    const handleFilters = useCallback(() => {
        router.push({
            pathname: "/apps",
            query: {
                query: query,
                category: filter.categories.join(","),
                membership: filter.membership,
                popularity: filter.popularity,
            },
        },undefined, { shallow: true});
    }, []);
    //  memoize apps with filters 
    const filteredApps = useMemo(() => {
        let filteredApps = apps;
        if (filter.categories.length > 0) {
            filteredApps = filteredApps.filter((app) => {
                return filter.categories.every((category) => app.categories.includes(category));
            });
        }
        if (filter.membership.length > 0) {
            filteredApps = filteredApps.filter((app :AppType) => {
                return filter.membership.some(item => app.membership.includes(item as MemberShipType))
            });
        }
        if (filter.popularity !== "") {
            // if(filter.popularity === "popular"){

            // }
            // filteredApps = filteredApps.filter((app) => {
            //     return app.popularity === filter.popularity;
            // });
        }
        return filteredApps;
    }, [apps, filter]);
        


    const handleSearch = async (query: string) => {
        if (query.length > 0) {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/apps/search?query=${query}`);
                const data = await response.json();
                if (data.success === true) {
                    if(data.total === 0){
                        toast.error("No apps found");
                        return;
                    }
                    if(data.total > 0){
                        toast.success(`${data.total} apps found`);
                    }
                    setData({
                        apps: [
                            ...apps,
                            ...data.result,
                        ],
                        total: data.total,
                        success: true,
                    });
                    console.log(data);
        
                }
            } catch (error) {
                setError(error);
                toast.error(error.message);
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
                                router.push({
                                    pathname: "/apps",
                                    query: {
                                        query: e.target.value,
                                        category: filter.categories.join(","),
                                        membership: filter.membership,
                                        popularity: filter.popularity,
                                    },
                                },undefined, { shallow: true
                                })
                            }}
                            value={query}
                        />
                        <Button
                            size="icon"
                            variant="secondary"
                            disabled={query.trim().length === 0}
                            className={"flex-shrink-0 !p-3 !rounded-full !bg-none " + (query.trim().length === 0 ? "hidden" : "")}
                            onClick={() => {
                                if(loading){
                                    return;
                                }
                                if(query.trim().length > 0){
                                    setQuery("");
                                }
                            }}>
                            {loading? <CgSpinnerAlt className='w-4 h-4 animate-spin' />:<GrFormClose className='w-4 h-4' />}

                        </Button>
                        <Button className="hero-button-gradient" onClick={() => {
                            handleSearch(query);
                        }}>
                            Search Apps
                        </Button>
                        <SearchFilter categories={CATEGORIES.map((category) => category.value)} filter={filter} setFilter={setFilter} handleFilters={handleFilters} />
                    </div>


                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-7 pt-7'>
                        {filteredApps.map(app => {
                            const Category = CATEGORIES.find((category) => app.categories.includes(category.value));

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