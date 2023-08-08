import Head from "next/head";
import axios from "axios";
import PublicToolType from "types/public-tool";
import Footer from "components/layouts/footer";

import {
    DirectoryPageNavBar,
    DirectoryPageContainer,
    DirectoryPageHero,
    DirectoryPageSearchContainer,
    DirectoryPageSearchResults,
    DirectoryPageSearchFilters,
    GoToTop
} from "src/layouts/directory-page";
import { Wobble } from "components/Loader"
import { IconButton } from "components/buttons"

import { TbSearch, TbExternalLink, TbArrowBigRightLine } from "react-icons/tb";
import Link from "next/link";

import { Input, Select, CheckBox, Label, FormElement } from "components/form-elements";


import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { CiGrid2H, CiGrid41 } from "react-icons/ci"
import { RiArrowRightUpLine } from "react-icons/ri"
import { RxArrowUp } from "react-icons/rx"
import { CgMenuRightAlt } from "react-icons/cg"
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const SocialMedia = [
    {
        name: "Github",
        icon: <IoLogoGithub />,
        url: "https://github.com/kkupgrader",
    },
    {
        name: "Instagram",
        icon: <IoLogoInstagram />,
        url: "https://www.instagram.com/kanakkholwal/",
    },
    {
        name: "LinkedIn",
        icon: <IoLogoLinkedin />,
        url: "https://www.linkedin.com/in/kanak-kholwal/",
    },
    {
        name: "Twitter",
        icon: <IoLogoTwitter />,
        url: "https://twitter.com/KanakKholwal",
    },
]

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
    }>({
        pricing_type: "Default",
        categories: [],
    });

    const filteredTools = useMemo(() => {

        return tools.filter(tool => {
            let isValid = true;
    
            // Other code...
    
            if (filter.pricing_type !== "Default" && tool.pricing_type !== filter.pricing_type) {
                isValid = false;
            }
    
            if (filter.categories.length > 0 && !filter.categories.some(category => tool.categories.findIndex(toolCategory => toolCategory.slug === category) >= 0)) {
                isValid = false;
            }
            // console.log(tool.pricing_type)
    
            return isValid;
        }) as PublicToolType[];
    }, [filter,tools,settings.query]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    async function loadMoreData() {
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
    const lastToolRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const observer = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting && hasMore && !loadingMore) {
                setLoadingMore(true);
            }
        },
        { root: null, rootMargin: '0px', threshold: 1 }
    );

    if (lastToolRef.current) {
        observer.observe(lastToolRef.current);
    }

    return () => {
        if (lastToolRef.current) {
            observer.unobserve(lastToolRef.current);
        }
    };
}, [hasMore, loadingMore]);

    
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
            <Head>
                <title>AI directory</title>
            </Head>
            <DirectoryPageContainer>
                <DirectoryPageNavBar>
                    <Link href="/directory" className="Title">
                        AI Directory
                    </Link>
                    <div className={"LinkList " + (settings.show ? " show":"")}>
                        <Link href="/">
                            Home
                        </Link>
                        <Link href="/apps">
                            Services
                        </Link>
                        <Link href="/tools">
                            Tools
                        </Link>
                        <Link href="/blog">
                            Blog
                        </Link>
                    </div>
                    <Link href="/submit" className="Submit">
                        Submit
                    </Link>
                    <IconButton type="button" className="toggler"
                        onClick={() => {

                            setSettings((prevSettings) =>{
                                return {
                                    ...prevSettings,
                                    show: !prevSettings.show
                                }
                            })
                        }
                    }
                    >
                        <CgMenuRightAlt size={16}/>
                    </IconButton>
                </DirectoryPageNavBar>

                <DirectoryPageHero>
                    <div>

                        <h2 className="title">Your Path to Peak Efficiency</h2>
                        <p className="description">Unlock your productivity potential with AI-powered tools that streamline your workflow, optimize tasks, and elevate your success. Embrace a future of seamless efficiency at the Productivity Hub.</p>

                        <Link className="SubmitYourTool"
                            href="/submit">
                            Submit your tool <RiArrowRightUpLine size={20}/>
                        </Link>
                    </div>
                    <div className="illustration">
                        <img src="assets/images/illustration_dashboard.png" alt="AI Directory" />
                    </div>
                </DirectoryPageHero>
                <DirectoryPageSearchContainer>
                    <div className="SearchBar">
                        <Input type="search"
                            level={true}
                            placeholder="Search for a tool"
                            lg={true}
                            onChange={debounce(handleSearch, 500)}
                        />
                        <button className="SearchButton"><TbSearch /></button>
                    </div>
                    <Select
                        label="Pricing Type"
                        value={filter.pricing_type}
                        options={pricing_types?.length > 0 ? pricing_types.map(type => {
                            return {
                                label: type,
                                value: type
                            }
                        })  :[
                            {
                                label: "Default",
                                value: "Default"
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
                            },


                        ]}
                        lg={true}

                        onChange={(option: { value: string;label:string}) => {
                            // console.log(option.value)
                            setFilter(prevFilter => ({
                                ...prevFilter,
                                pricing_type: option.value
                            }));
                        }}
                    />
                </DirectoryPageSearchContainer>

                <div className="d-flex justify-content-between align-items-stretch g-3">

                    <DirectoryPageSearchResults>
                        <div className="info">
                            <div className="count">{filteredTools.length} tools found</div>
                            <div className="line" />
                            <div className="options">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSettings({
                                            ...settings,
                                            grid: !settings.grid,
                                        })
                                    }}
                                    className="layout"
                                >
                                    <span className={"grid " + (settings.grid ? " active" : "")}>
                                        <CiGrid41 />
                                    </span>
                                    <span className={"list " + (!settings.grid ? "active" : "")}>
                                        <CiGrid2H />
                                    </span>

                                </button>
                            </div>

                        </div>

                        {loading ? <div className="d-flex justify-content-center align-items-center my-2"><Wobble /></div> : null}
                        <div className={"Results " + (settings.grid ? " grid" : "")}>
                            {filteredTools.map((tool,index) => {

                                return (<div className={"SearchResult "} key={tool._id} style={{
                                    animationDelay: `${index * 0.01}s`
                                }}>

                                    <Image
                                        width={350}
                                        height={400}
                                        src={tool.coverImage} alt={tool.name} />


                                    <div className="SearchResultContent">
                                        <h3>{tool.name}</h3>
                                        <p>{tool.description}</p>

                                        <div className="Meta">

                                            <span className="pricing_type">{tool.pricing_type}</span>
                                        </div>
                                        <div className="actions">

                                            <Link href={`/directory/${tool.slug}`} className="CheckOut">
                                                Check it Out
                                                <TbArrowBigRightLine />
                                            </Link>
                                            <Link href={tool.link} className="TryOut" target="_blank">
                                                Try it Out
                                                <TbExternalLink />
                                            </Link>
                                        </div>
                                    </div>

                                </div>)
                            })}
                        </div>
                        {filteredTools.length === 0 && !loading ? <div className="NoResults">
                            <h2>No results found</h2>
                            <p>Try another search query</p>
                        </div> : null}
                        {loadingMore ? <div className="d-flex justify-content-center align-items-center my-2"><Wobble /></div> : null}

                        <div className="footer" id="search-footer" ref={lastToolRef}>
                            {!hasMore ? <div className="NoMoreResults">
                               No more results
                            </div> : null
                                }

                            {/* <button
                                type="button"
                                className="prev"
                                onClick={() => {
                                    // setPage(prevPage => prevPage + 1);
                                }}
                            >
                                    Previous
                            </button>
                            <div className="page">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                            </div>
                            <button
                                type="button"
                                className="next"
                                onClick={() => {
                                    // setPage(prevPage => prevPage + 1);
                                }}
                            >
                                    Next
                            </button> */}

                        </div>


                    </DirectoryPageSearchResults>

                    <DirectoryPageSearchFilters>
                        {categories.map((category: {
                            _id: string;
                            name: string;
                            slug: string;

                        }) => {
                            return (
                                <FormElement className="Filter" key={category._id}>
                                    <CheckBox
                                        checked={filter.categories.includes(category.slug)}
                                        onChange={() => {

                                            setFilter(prevFilter => ({
                                                ...prevFilter,
                                                categories: prevFilter.categories.includes(category.slug)
                                                    ? prevFilter.categories.filter(cat => cat !== category.slug)
                                                    : [...prevFilter.categories, category.slug]
                                            }));
                                            

                                        }
                                        }
                                        id={category.slug}

                                    />
                                    <Label htmlFor={category.slug}>{category.name}</Label>
                                </FormElement>
                            )
                        })}
                    </DirectoryPageSearchFilters>

                </div>

            </DirectoryPageContainer>
            <Footer socialMedia={SocialMedia} />

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
                <RxArrowUp size={20}/>

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