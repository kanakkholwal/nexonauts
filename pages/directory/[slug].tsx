import { NextSeo } from 'next-seo';
import axios from 'axios';
import { useSession } from "next-auth/react";

import Head from "next/head";
import PublicToolType from "types/public-tool";
import Footer from "components/layouts/footer";

import {
    DirectoryPageNavBar,
    DirectoryPageContainer,
    DirectoryPageHero
} from "src/layouts/directory-page";

import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import Image from "next/image";
import Link from 'next/link';

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

export async function getStaticPaths() {
    // Return a list of possible value for toolName
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/public-tools/ssr`, {
        headers: {
            "Content-Type": "application/json",
            "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`
        }
    })

    const { tools } = data;
    const paths = tools.map(({ slug }) => {
        return {
            params: {
                slug: slug,
            }
        };
    }) || [];
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the tool using params.appName
    try {

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/public-tools/ssr`, {
            slug: params.slug
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`
            }
        })
        const { tool } : {
            tool: PublicToolType
        } = data;

        if (!tool) {
            return {
                notFound: true,
                revalidate: 60,
                props: {
                    tool: null,
                }
            };
        }
        return {
            props: {
                tool
            },
            revalidate: 60,

        }
    } catch (error) {
        console.log("Error during page generation using slug:", error);
        return {
            notFound: true,
            props: {
                tool: null,
            },
            revalidate: 60,
        };
    }

}

export default function Tool({ tool }:{
    tool: PublicToolType
}) {


    if (!tool) return null;

    return <>
        <Head>
            <title>{tool.name}</title>
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
                <div className="illustration">
                    <Image src={tool.coverImage} alt="AI Directory" width={600} height={480} />
                </div>
                <div>

                    <h2>{tool.name}</h2>
                    <p className="description">
                        {tool.description}
                    </p>

                    <Link className="SubmitYourTool"
                        href={tool.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                       Checkout
                    </Link>
                </div>
            </DirectoryPageHero>

        </DirectoryPageContainer>
        <Footer socialMedia={SocialMedia} />


    </>
}