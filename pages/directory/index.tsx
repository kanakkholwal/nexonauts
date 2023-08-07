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
import {TbSearch} from "react-icons/tb";
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

}) {

    const [tools, setTools] = useState<PublicToolType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [settings, setSettings] = useState({
        search: "",
        pricing: "Default",
        category: "Default",
    });

    useEffect(() =>{
        axios.post("/api/public-tools/all",{},{
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res =>{
            setTools(res.data);
            setLoading(false);
        }
        )
        .catch(err =>{
            setError(true);
            setLoading(false);
        }
        )

    },[])

  

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
                    
                </DirectoryPageSearchResults>

                <DirectoryPageSearchFilters>
                    
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
    // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/public-tools/all`,{},{
        // headers: {
    //         "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`,
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then(response => {
    //         data.type = "success";
    //         data.message = response.data.message;
    //        return response.data;
    //     })
    //     .catch(error => {
    //         data.type = "error";
    //         data.message = error.message;
    //         return error.response
    //     });
  

    return {
        props: { 
            // tools:response.data.tools as PublicToolType[],
            data,
        },

    }
}