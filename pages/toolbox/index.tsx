import axios from "axios";
import Footer from 'layouts/common/footer';
import { NextSeo } from 'next-seo';
import {
    GoToTop
} from "src/layouts/directory-page";
import PublicToolType from "types/public-tool";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";
import { TbSearch } from "react-icons/tb";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";


import LazyImage from "components/image";
import Header from "layouts/common/header";
import { useEffect, useMemo, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";
import { RxArrowUp } from "react-icons/rx";





export default function AiDirectory({
    tools: defaultTools,
    categories,
    pricing_types
}) {

    const [tools, setTools] = useState<PublicToolType[]>(defaultTools);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [settings, setSettings] = useState<{
        query: string;
        page: number;
        limit: number;
        grid: boolean;
        show: boolean;
    }>({
        query: "",
        page: 0,
        limit: 10,
        grid: false,
        show: false,

    });
    const [pagination, setPagination] = useState<{
        currentPage: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
    }>({
        currentPage: 0,
        pageSize: 10,
        totalPages: 0,
        totalItems: 0,
    })
    const [filter, setFilter] = useState<{
        pricing_type: string;
        categories: string[];
        open: boolean
    }>({
        pricing_type: "Any",
        categories: [],
        open: false,
    });

    const filteredTools = useMemo(() => {

        return tools.filter(tool => {
            let isValid = true;

            // Other code...
            console.log(tool)

            if (filter.pricing_type !== "Any" && tool.pricing_type !== filter.pricing_type) {
                isValid = false;
            }

            if (filter.categories.length > 0 && !filter.categories.some(category => tool.categories.findIndex(toolCategory => toolCategory.slug === category) >= 0)) {
                isValid = false;
            }
            // console.log(tool.pricing_type)

            return isValid;
        }) as PublicToolType[];
    }, [filter, tools, settings.query]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    async function loadMoreData() {
        setLoadingMore(true)
        try {
            const response = await axios.post(`/api/public-tools/search?query=${settings.query}&page=${pagination.currentPage + 1}&limit=${settings.limit}`);

            setTools(prevTools => [...prevTools, ...response.data.tools]);
            setPagination(response.data.pagination)

            if (response.data.tools.length < settings.limit) {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingMore(false);
        }
    }



    useEffect(() => {
        if (loadingMore) {


            loadMoreData();
        }
    }, [loadingMore]);


    // search with debounce function
    const debounce = (func: { (e: any): Promise<void>; apply?: any; }, delay: number | undefined) => {
        let debounceTimer: string | number | NodeJS.Timeout | undefined
        return function () {
            const context = this
            const args = arguments
            clearTimeout(debounceTimer)
            debounceTimer
                = setTimeout(() => func.apply(context, args), delay)
        }
    }

    const handleSearch = async (e: { preventDefault: () => void; target: { value: any; }; }) => {
        e.preventDefault();
        setSettings({
            ...settings,
            query: e.target.value
        })
        if (settings.query === "") {
            setTools(defaultTools);
            setLoading(false);
            return;
        }

        setLoading(true)
        await axios.post(`/api/public-tools/search?query=${settings.query}&page=${settings.page}&limit=${settings.limit}`)
            .then((res) => {
                console.log(res.data)
                setTools(res.data.tools)
            })
            .catch((err) => {
                setError(err)
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }



    return (
        <>
            <NextSeo
                title="AI Directory - AI Tools, Services, and Resources"
                description="AI Directory is a curated list of AI tools, services, and resources. Find the best AI tools for your business."
                canonical={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/directory/`}
                openGraph={{
                    url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/directory/`,
                    title: "AI Directory - AI Tools, Services, and Resources",
                    description: "AI Directory is a curated list of AI tools, services, and resources. Find the best AI tools for your business.",
                }}
            />
            <Header />
            <section className="relative z-10 mt-20 lg:mt-15 xl:mt-20 pb-18 bg-slate-100 overflow-hidden">

                <div className="text-center px-4 py-20">
                    <h1 className="font-extrabold text-4xl  mb-3">
                        Toolbox - AI, Tools, Services, and Resources
                    </h1>
                    <h5 className="flex items-center justify-center gap-2 text-slate-600">
                        A curated list of AI, tools, services, and resources. Find the best AI tools for your business.
                    </h5>
                </div>
                <form className="relative max-w-3xl px-4 mx-auto mt-0 mb-10 sm:px-6 flex items-center bg-white p-4 rounded-full" onSubmit={(e) => {
                    e.preventDefault();
                    // handleSearch(e);
                }}>
                    <TbSearch className="h-5 w-5" size={20} />

                    <Input
                        type="text"
                        name="query"
                        id="query"
                        placeholder="Search for a AI, tools, services, and resources"
                        onChange={debounce(handleSearch, 500)}
                        required={true}
                    />
                    <Button className="rounded-full text-md">
                        <TbSearch className="h-5 w-5 mr-1" size={20} />
                        Search
                    </Button>
                </form>
            </section>
            <section className="bg-white dark:bg-slate-700 max-w-lg px-4 pt-12 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 hidden items-center justify-between " aria-labelledby="filter settings">
                    <Select onValueChange={(value) => {
                        setFilter({
                            ...filter,
                            pricing_type: value
                        })
                    }}>
                        <SelectTrigger className="w-[180px] bg-slate-200 dark:bg-slate-400">
                            <SelectValue placeholder="Pricing Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {pricing_types?.length > 0 ? [{
                                label: "Any",
                                value: "Any"
                            }, ...pricing_types.map((type) => {
                                return {
                                    label: type,
                                    value: type
                                }
                            })].map((type: { label: string; value: string; }) => {
                                return (<SelectItem value={type.value} key={type.value} className="capitalize">{type.label}</SelectItem>)
                            }) : [
                                {
                                    label: "Any",
                                    value: "Any"
                                },
                                {
                                    label: "Free",
                                    value: "free"
                                },
                                {
                                    label: "Paid",
                                    value: "paid"
                                },
                                {
                                    label: "Freemium",
                                    value: "freemium"
                                },
                                {
                                    label: "Open Source",
                                    value: "open-source"
                                }].map((type: { label: string; value: string; }) => {
                                    return (<SelectItem value={type.value} key={type.value} className="capitalize">{type.label}</SelectItem>)
                                })}

                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => {
                        setFilter(prevFilter => ({
                            ...prevFilter,
                            categories: prevFilter.categories.includes(value)
                                ? prevFilter.categories.filter(cat => cat !== value)
                                : [...prevFilter.categories, value]
                        }));
                    }}>
                        <SelectTrigger className="w-[180px] bg-slate-200">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            {categories.map((category: {
                                _id: string;
                                name: string;
                                slug: string;

                            }, index: number) => {
                                return (<SelectItem value={category.slug} key={index}>
                                    {category.name}
                                </SelectItem>
                                )
                            })}

                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>

                <div className="grid mx-auto gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 2xl:gap-x-12 2xl:gap-y-16 xl:gap-y-14 mt-8">
                    {filteredTools.map((tool) => {

                        return (<div key={tool._id} >
                            <div className="flex flex-col w-full overflow-hidden bg-gray-100 rounded-2xl h-72 sm:h-80 md:h-72 lg:h-64 xl:h-80">
                                <div className="relative flex items-center justify-center flex-shrink-0 h-full group">
                                    <LazyImage className="w-9/10 sm:w-10/12 lg:w-9/10 xl:w-10/12 h-auto rounded-lg shadow-md mx-auto object-cover object-left-top transition ease-in-out duration-300"
                                        width={350}
                                        height={200}
                                        src={tool.coverImage} alt={tool.name} />
                                    <div className="absolute inset-0 transition duration-200 bg-gray-900 opacity-0 rounded-2xl group-hover:opacity-60"></div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center transition duration-200 opacity-0 group-hover:opacity-100">

                                        <div className="shadow-sm w-33 rounded-2xl">
                                            <Link className="w-full justify-center inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white transition duration-150 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cool-indigo-500"
                                                href={`/toolbox/${tool.slug}`}>
                                                Check it Out
                                                <FiExternalLink size={20} className="h-4 w-4 ml-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col justify-between flex-1 px-6 pt-6 pb-0">
                                    <div className="flex-1">
                                        <Link className="block group" href={`/toolbox/${tool.slug}`}>
                                            <div className="flex items-center justify-between">
                                                <h3 className="flex items-center text-xl font-bold leading-7 text-gray-900 group-hover:text-cool-indigo-600">
                                                    {tool.name}
                                                </h3>
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-bold font-display bg-indigo-200 text-indigo-800 capitalize">
                                                    {tool.pricing_type}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-base font-medium leading-6 text-gray-500 line-clamp-2">
                                                {tool.description}
                                            </p>

                                        </Link>
                                    </div>
                                </div>
                            </div>


                        </div>)
                    })}
                </div>
                <div className="w-full flex justify-center items-center my-8">
                    <Button className="rounded-full text-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-8 h-12"
                        disabled={!hasMore || loadingMore}
                        onClick={() =>{
                            loadMoreData();
                        }}
                    >

                        {!loadingMore ? "Load More" : "Loading..."}
                        {!loadingMore ? <HiOutlineChevronDown className="h-5 w-5 ml-3" size={20} /> : null}
                        {loadingMore ? <CgSpinner className="h-5 w-5 animate-spin ml-3" size={20} /> : null}

                    </Button>
                </div>






                {filteredTools.length === 0 && !loading ? <div className="NoResults">
                    <h2>No results found</h2>
                    <p>Try another search query</p>
                </div> : null}







            </section>
            <Footer />

            <GoToTop role="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window?.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                }}
            >
                <RxArrowUp size={20} />

            </GoToTop>
        </>
    )
}


export async function getServerSideProps(context: any) {

    let data = {
        type: "idle",
        message: ""
    } as {
        type: string,
        message: string
    };


    const response = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/public-tools/all`, {
        limit: 15
    }, {
        headers: {
            "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`,
        }
    })
        .then(response => {
            data.type = "success";
            data.message = response.data.message;
            console.log(response.data)
            return response;
        })
        .catch(error => {
            data.type = "error";
            data.message = error.message;
            return error.response
        });


    return {
        props: {
            tools: response.data.tools as PublicToolType[],
            categories: response.data.categories,
            pricing_types: response.data.pricing_types as string[] | undefined || [],
            data,
        },

    }
}