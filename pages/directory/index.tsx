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
    DirectoryPageSearchFilters
} from "src/layouts/directory-page";
import { Wobble } from "components/Loader"

import { TbSearch, TbExternalLink, TbArrowBigRightLine } from "react-icons/tb";
import Link from "next/link";

import { Input, Select, CheckBox, Label, FormElement } from "components/form-elements";


import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { useEffect, useState } from "react";
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
    categories
}) {

    const [tools, setTools] = useState<PublicToolType[]>(defaultTools);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [settings, setSettings] = useState({
        query: "",
        page: 0,
        limit: 10,
    });
    const [filter, setFilter] = useState<{
        pricing_type: string;
        categories: string[];
    }>({
        pricing_type: "Default",
        categories: [],
    })

    // search with debounce function
    const debounce = (func, delay) => {
        let debounceTimer
        return function () {
            const context = this
            const args = arguments
            clearTimeout(debounceTimer)
            debounceTimer
                = setTimeout(() => func.apply(context, args), delay)
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setSettings({
            ...settings,
            query: e.target.value
        })
        if(settings.query === ""){
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
                    <div className="LinkList">
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

                </DirectoryPageNavBar>

                <DirectoryPageHero>
                    <div>

                        <h2>Your Path to Peak Efficiency</h2>
                        <p className="description">Unlock your productivity potential with AI-powered tools that streamline your workflow, optimize tasks, and elevate your success. Embrace a future of seamless efficiency at the Productivity Hub.</p>

                        <Link className="SubmitYourTool"
                            href="/submit">
                            Submit your tool
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
                        options={[
                            {
                                label: "Default",
                                value: "Default"
                            },
                            {
                                label: "Free",
                                value: "Free"
                            },
                            {
                                label: "Paid",
                                value: "Paid"
                            },
                            {
                                label: "Freemium",
                                value: "Freemium"
                            },
                            {
                                label: "Open Source",
                                value: "open-source"
                            },


                        ]}
                        lg={true}

                        onChange={option => {
                            setFilter({
                                ...filter,
                                pricing_type: option.value
                            })
                        }}
                    />
                </DirectoryPageSearchContainer>

                <div className="d-flex justify-content-between align-items-stretch g-3">

                    <DirectoryPageSearchResults>
                        {loading ? <Wobble /> : null}

                        {tools.filter(tool => {
                            let isValid = true;
                            // if(settings.search === ""){
                            //     return true;
                            // }else 
                            // if(tool.name.toLowerCase().includes(settings.search.toLowerCase())){
                            //     return tool;
                            // }
                            if (filter.pricing_type !== "Default") {
                                if (tool.pricing_type !== filter.pricing_type) {
                                    isValid = false;
                                }
                            }

                            if (filter.categories.length === 0) {
                                isValid = true;
                            }
                            // check if filter categories matches with tool categories
                            if (filter.categories.some(category => tool.categories.findIndex(toolCategory => toolCategory.slug === category) >= 0)) {
                                isValid = true;
                            }

                            return isValid;
                        }).map((tool) => {

                            return (<div className="SearchResult" key={tool._id}>

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
                                    <div className="d-flex g-1">

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
                    </DirectoryPageSearchResults>

                    <DirectoryPageSearchFilters>
                        {categories.map((category) => {
                            return (
                                <FormElement className="Filter" key={category._id}>
                                    <CheckBox
                                        checked={filter.categories.includes(category.slug)}
                                        onChange={() => {

                                            if (filter.categories.includes(category.slug)) {
                                                setFilter({
                                                    ...filter,
                                                    categories: filter.categories.filter((cat) => cat !== category.slug)
                                                })
                                            } else {
                                                setFilter({
                                                    ...filter,
                                                    categories: [...filter.categories, category.slug]
                                                })
                                            }

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
        </>
    )
}


export async function getServerSideProps(context) {

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
            data,
        },

    }
}