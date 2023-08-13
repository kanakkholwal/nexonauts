import { NextSeo } from 'next-seo';
import axios from 'axios';

import PublicToolType from "types/public-tool";
import Footer from "components/layouts/footer";

import {
    DirectoryPageNavBar,
    DirectoryPageContainer,
    SlugPage,
    SimilarTools
} from "src/layouts/directory-page";
import { RiArrowRightUpLine } from "react-icons/ri"
import { TbShare2 } from "react-icons/tb"

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
        const { 
            tool ,
            related
            
        } : {
            tool: PublicToolType,
            related: PublicToolType[] | null
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

export default function Tool({ tool ,related}:{
    tool: PublicToolType,
    related: PublicToolType[] | null
}) {


    if (!tool) return null;

    return <>
        <NextSeo
            title={tool.name}
            description={tool.description}
            openGraph={{
                url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/directory/${tool.slug}`,
                title: tool.name,
                description: tool.description,
                images: [
                    {
                        url: tool.coverImage,
                        alt: tool.name,
                    }
                ],
                site_name: 'AI Directory',
            }}
            twitter={{
                handle: '@KanakKholwal',
                site: '@KanakKholwal',
                cardType: 'summary_large_image',
            }}
        />


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
            <SlugPage>
                <div className="CoverImage">
                    <Image src={tool.coverImage} alt="AI Directory" width={600} height={480} />
                </div>
                <div>

                    <h2>{tool.name}</h2>
                    <p className="description">
                        {tool.description}
                    </p>
                    <div className="Actions">
                    <Link className="CheckOut"
                        href={tool.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                       Checkout
                       <RiArrowRightUpLine/>
                    </Link>
                    <button className="ShareBtn">
                        <TbShare2/>
                    </button>
                </div>
                </div>
            </SlugPage>
            {/* <SimilarTools>
                <div className='Header'>
                <h4 className='Title'>Similar Tools</h4>
                <Link href={"/directory/"} className='ViewAll'>
                    Explore All
                </Link>
                </div>
                <div className="Tools">
                    {related?.map((tool) => {
                        return <div className="Tool" key={tool._id}>
                            <div className="CoverImage">
                                <Image src={tool.coverImage} alt="AI Directory" width={600} height={480} />
                            </div>
                            <div className="Details">
                                <h4 className="Name">{tool.name}</h4>
                                <p className="description">
                                    {tool.description}
                                </p>
                                <div className="Actions">
                                    <Link className="CheckOut"
                                        href={tool.link} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        >
                                       Checkout
                                       <RiArrowRightUpLine/>
                                    </Link>
                                    <button className="ShareBtn">
                                        <TbShare2/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </SimilarTools> */}

        </DirectoryPageContainer>
        <Footer socialMedia={SocialMedia} />


    </>
}