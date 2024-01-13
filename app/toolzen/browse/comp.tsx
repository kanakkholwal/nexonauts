"use client";

import axios from "axios";
import PublicToolType from "types/public-tool";

import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import Link from "next/link";
import { CgSpinner } from "react-icons/cg";

import { X } from 'lucide-react';


import { Input } from "@/components/ui/input";
import LazyImage from "components/image";
import { Bird, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { HiOutlineChevronDown } from "react-icons/hi";





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
            <div className="flex items-start justify-start gap-6 h-full w-full max-w-7xl mx-auto pt-32">
                <section id="filter" className="min-w-92 max-w-96 grow w-auto sticky top-24">
                    <div className="w-full flex flex-col space-y-2 text-center sm:text-left mb-5">
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                            Filter Tools
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Filter Tools by category, pricing, and more.
                        </p>
                        <div className="mb-4">
                            <p className="text-base font-semibold text-slate-600 mb-4">
                                By Categories
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant="slate"
                                    size="sm"
                                    className={"text-xs !h-8 " + (filter.categories.length === 0 ? "bg-accent-foreground hover:bg-accent-foreground/90 text-white" : "")}
                                    onClick={() => {
                                        setFilter({ ...filter, categories: [] })
                                    }}
                                >
                                    All
                                </Button>
                                {categories.map((category) => (
                                    <Button
                                        key={category.slug}
                                        variant="slate"
                                        size="sm"
                                        className={"text-xs !h-8 capitalize " + (filter.categories.includes(category.slug) ? "bg-accent-foreground hover:bg-accent-foreground/90 text-white" : "")}
                                        onClick={() => {
                                            if (filter.categories.includes(category.slug)) {
                                                setFilter({ ...filter, categories: filter.categories.filter((item) => item !== category.slug) })
                                            } else {
                                                setFilter({ ...filter, categories: [...filter.categories, category.slug] })
                                            }

                                        }}
                                    >
                                        {category.name.split("_").join(" ")}
                                    </Button>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="mt-auto flex flex-col  gap-2 w-full ">
                        <Button onClick={() => {
                            setFilter({
                                ...filter,
                                pricing_type: "Any",
                                categories: [],
                            })

                        }}>
                            Apply Filters
                        </Button>
                        <Button
                            variant="slate"
                            onClick={() => {
                                setFilter({
                                    ...filter,
                                    pricing_type: "Any",
                                    categories: [],
                                })
                            }}
                        >
                            Clear Filters
                        </Button>

                    </div>
                </section>
                <section id="content" className="grow w-full">


                    <form className="flex w-full gap-4 items-center justify-start mx-auto mt-0 mb-10" onSubmit={(e) => {
                        e.preventDefault();
                        // handleSearch(e);
                    }} id="search">
                        <div className="relative w-full">

                            <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5" size={20} />
                            <Input
                                type="text"
                                name="query"
                                id="query"
                                value={settings.query}
                                variant="fluid"
                                placeholder="Search for a AI, tools, services, and resources"
                                className="w-full pl-10 pr-4 py-2 h-14 rounded-xl"
                                onChange={debounce(handleSearch, 500)}
                                required={true}
                            />
                            <Button className="rounded-full text-md bg-transparent hover:bg-transparent absolute z-20 top-1/2 right-0 transform -translate-y-1/2"
                                disabled={loading}
                                variant="slate"
                                type="reset"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!loading) {
                                        setSettings({
                                            ...settings,
                                            query: ""
                                        })
                                    }

                                }}>
                                {settings.query.trim() === "" ? null : loading ? <Loader2 className="h-5 w-5 mr-1 animate-spin" size={20} /> : <X className="h-5 w-5 mr-1" size={20} />}
                            </Button>
                        </div>
                    </form>

                    <div id="results">
                        <div className="grid mx-auto gap-x-6 gap-y-12 md:grid-cols-2 xl:gap-x-8 2xl:gap-x-12 2xl:gap-y-16 xl:gap-y-14 mt-8">
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
                                                    <Link className="w-full justify-center inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white transition duration-150 bg-primary/60 hover:bg-primary/70"
                                                        href={`/toolzen/tools/${tool.slug}`}>
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
                                                <Link className="block group" href={`/toolzen/tools/${tool.slug}`}>
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="flex items-center text-xl font-bold leading-7 text-gray-900 group-hover:text-primary">
                                                            {tool.name}
                                                        </h3>
                                                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-bold font-display bg-primary/20 text-primary/80 capitalize">
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
                        {filteredTools.length === 0 && !loading ? <div className="w-full flex-col flex justify-center items-center gap-6 text-center">
                            <Bird className="h-80 w-full mx-auto transform-gpu hover:-scale-x-100" size={96} />
                            <h2 className="text-lg">
                                No tools found for {settings.query ? `'${settings.query}'` : "your search"}
                            </h2>
                            <Button variant="slate" className="rounded-full px-5" onClick={() => {
                                setSettings({
                                    ...settings,
                                    query: "",
                                })
                                setFilter({
                                    ...filter,
                                    categories: [],
                                })
                            }}>
                                Clear your search and try again
                            </Button>
                        </div> : null}
                        {(filteredTools.length > 0 && hasMore) ? <div className="w-full flex justify-center items-center my-8">
                            <Button className="rounded-full text-md bg-primary/10 text-primary hover:bg-primary/20 px-8 h-12"
                                disabled={!hasMore || loadingMore}
                                onClick={() => {
                                    loadMoreData();
                                }}
                            >

                                {!loadingMore ? "Load More" : "Loading..."}
                                {!loadingMore ? <HiOutlineChevronDown className="h-5 w-5 ml-3" size={20} /> : null}
                                {loadingMore ? <CgSpinner className="h-5 w-5 animate-spin ml-3" size={20} /> : null}

                            </Button>
                        </div> : null}



                    </div>
                </section>
            </div>
            <section className="bg-white dark:bg-slate-700 max-w-lg px-4 pt-12 mx-auto md:max-w-screen-2xl md:px-6 xl:px-8 2xl:px-12">

















            </section>


        </>
    )
}



