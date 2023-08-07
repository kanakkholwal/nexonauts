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
import {Wobble} from "components/Loader"

import {TbSearch,TbExternalLink,TbArrowBigRightLine} from "react-icons/tb";
import Link from "next/link";

import { Input,Select } from "components/form-elements";


import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { useEffect, useState } from "react";

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
    tools : defaultTools,
    categories
}) {

    const [tools, setTools] = useState<PublicToolType[]>(defaultTools);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [settings, setSettings] = useState({
        search: "",
        pricing: "Default",
        category: "Default",
    });
    console.log(categories);

    // useEffect(() =>{
    //     axios.post("/api/public-tools/all",{},{
    //         headers:{
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     .then(res =>{
    //         setTools(res.data);
    //         setLoading(false);
    //     }
    //     )
    //     .catch(err =>{
    //         setError(true);
    //         setLoading(false);
    //     }
    //     )

    // },[])

  

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
                         />
                        <button className="SearchButton"><TbSearch/></button>
                    </div>
                    <Select
                        label="Pricing Type"
                        value={"Default"}
                        options={[
                            {
                                label: "Default",
                                value: "Default"
                            },
                            
                        ]}
                        lg={true}
                        onChange={option =>{
                            console.log(option)
                        }}
                    />
                </DirectoryPageSearchContainer>

<div className="d-flex justify-content-between align-items-stretch g-3">

                <DirectoryPageSearchResults>
                    {tools.map((tool, index) => {

                    return (<div className="SearchResult" key={tool._id}>

                                <img src={tool.coverImage} alt={tool.name} />
                           
                           
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
                    {loading ? <Wobble/> : null}
                </DirectoryPageSearchResults>

                <DirectoryPageSearchFilters>
                    {categories.map((category) =>{
                        return (
                            <div className="Filter" key={category._id}>
                                <h3>{category.name}</h3>
                            </div>
                        )
                    }) }
                </DirectoryPageSearchFilters>

</div>

            </DirectoryPageContainer>
            <Footer socialMedia={SocialMedia}/>
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
            tools:response.data.tools as PublicToolType[],
            categories : response.data.categories,
            data,
        },

    }
}