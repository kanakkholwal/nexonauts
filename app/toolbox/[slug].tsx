import axios from 'axios';
import { NextSeo } from 'next-seo';

import LazyImage from "components/image";
import Newsletter from "components/newsletter";
import Footer from 'layouts/common/footer';
import Header from 'layouts/common/header';
import PublicToolType from "types/public-tool";


import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaRedditAlien, FaTelegramPlane, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
// import { LuCopy, LuVerified } from 'react-icons/lu';
import { Button } from "@/components/ui/button";
import {
    useModal
} from "components/dialog/modal";
import useShare from 'hooks/useShare';
import Link from 'next/link';
import { useRef } from 'react';
import { MdArrowBack } from "react-icons/md";

const social_icons = [
    {
        name: "facebook",
        icon: <FaFacebookF />,
    }
    , {
        name: "twitter",
        icon: <FaTwitter />,
    }
    , {
        name: "linkedin",
        icon: <FaLinkedinIn />,
    }
    , {
        name: "whatsapp",
        icon: <FaWhatsapp />,
    }
    , {
        name: "pinterest",
        icon: <FaPinterestP />,
    }
    , {
        name: "telegram",
        icon: <FaTelegramPlane />,
    }
    , {
        name: "reddit",
        icon: <FaRedditAlien />,
    }
]
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



export async function getServerSideProps(context: { query: { slug: string; }; }) {

    const slug = context.query.slug;

    try {

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/public-tools/ssr`, {
            slug: slug
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-authorization": `Bearer ${process.env.NEXT_AUTH_SECRET}`
            }
        })
        const {
            tool,
            related

        }: {
            tool: PublicToolType,
            related: PublicToolType[] | null
        } = data;

        if (!tool) {
            return {
                notFound: true,
                props: {
                    tool: null,
                    related: null,
                }
            };
        }
        return {
            props: {
                tool,
                related
            },
        }
    } catch (error) {
        console.log("Error during page generation using slug:", error);
        return {
            notFound: true,
            props: {
                tool: null,
                related: null
            },
        };
    }

}

export default function Tool({ tool, related }: {
    tool: PublicToolType,
    related: PublicToolType[] | null
}) {
    const {
        nativeShare,
        socials,
    } = useShare({
        title: tool.name,
        description: tool.description,
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/directory/${tool.slug}`,
        image: tool.coverImage,
    });
    const shareRef = useRef(null);
    const { open, close } = useModal(shareRef);

    if (!tool) return null;

    console.log(related)

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
        <Header />
        <main className='px-4 pb-24 mx-auto pt-14 sm:pt-16 sm:pb-32 sm:px-6 lg:max-w-7xl lg:px-8 mt-12'>
            <div className='flex w-full items-center my-3'>
                <Link href="/toolbox">
                    <Button className='rounded-lg  bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-5 h-10'>
                        <MdArrowBack className='inline-block h-4 w-5 mr-2' />
                        Back to ToolBox
                    </Button>
                </Link>
            </div>
            <div className='lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
                <div className='lg:row-end-1 lg:col-span-4'>
                    <nav aria-label="Breadcrumb" className='hidden'>
                        <ol role="list" className="flex items-center max-w-2xl space-x-2">
                            <li>
                                <div className="flex items-center">
                                    <a className="mr-2 text-sm font-medium text-gray-900" href="/">Home</a>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"></path>
                                    </svg>
                                </div>
                            </li>

                            <li>
                                <div className="flex items-center">
                                    <a className="mr-2 text-sm font-medium text-gray-900" href="/?type=template">Templates</a>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-4 h-5 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"></path>
                                    </svg>
                                </div>
                            </li>

                            <li className="text-sm">
                                <span className="font-medium text-gray-500">Docs</span>
                            </li>
                        </ol>
                    </nav>
                    <div className='mt-6 overflow-hidden bg-gray-100 rounded-xl'>
                        <LazyImage
                            className='w-full h-auto object-cover object-center'
                            src={tool.coverImage}
                            alt={tool.name}
                            width={600}
                            height={480}
                        />

                    </div>
                </div>
                <div className='w-full max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3'>
                    <div className="flex flex-col">
                        <div className="flex justify-between w-full lg:mt-10">
                            <div>
                                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                                    {tool.name}
                                </h1>

                                <h2 id="information-heading" className="sr-only">Tool information</h2> 
                                {/* <!-- Author meta --> */}
                                <div className="flex items-center mt-2">
                                    {/* <a className="https://cruip.com/?ref=tailwindawesome"> */}
                                        {/* <img className="rounded-full flex-shrink-0 mr-3" alt="Cruip avatar" width="24" height="24" src="https://d1w019qw3bn26k.cloudfront.net/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWTQ9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6fc01828fce3d5fedf7807c03372beb434a51aba/cruip-logo"> */}
                                    {/* </a> */}
                                    <div className="text-md">
                                        <span className="text-gray-600">By </span>
                                        <a className="font-medium text-indigo-600 hover:text-indigo-500"
                                            href={tool.author?.public_link}>{tool.author?.name}</a>
                                    </div>
                                </div>
                            </div>

                            <p className="ml-4 text-3xl font-bold sm:ml-6 text-indigo-600 font-display capitalize">{tool.pricing_type}</p>
                        </div>

                        <div className='mt-6 w-full'>
                            <Link href={tool.link}>
                                <Button className='rounded-lg w-full text-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-8 h-12'>
                                    Visit Site
                                </Button>
                            </Link>
                        </div>
                        <div className=" pt-5 mt-10 border-t border-gray-200 ">
                            <h6 className='font-medium leading-6 tracking-wider text-left text-gray-500 uppercase text-md mb-3'>
                                Info
                            </h6>
                            <div className="flex justify-between">
                                <div className="w-full font-medium leading-8 text-gray-600 text-md max-w-xxxs">Tags</div>
                                <div className="leading-8 text-right max-w-xxs">
                                    {tool.categories.map((tag, index) => {
                                        return <Link key={index} className='text-md font-medium text-indigo-600 hover:text-indigo-500' href={"/toolbox?query=" + tag.name.split(" ").join("+")}>
                                            {tag.name}
                                        </Link>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="pt-10 mt-10 border-t border-gray-200 ">
                            <h6 className='font-medium leading-6 tracking-wider text-left text-gray-500 uppercase text-md mb-3'>Related to {tool.name}</h6>
                            {related?.map((tool, index) => {
                                return (<Link className='flex gap-2 w-full mb-2 p-4 border border-grey-700 bg-slate-50 rounded-lg' href={"/toolbox/" + tool.slug} key={index}>

                                    <LazyImage src={tool.coverImage} alt="AI Directory" className="border border-border rounded-md max-w-[180px] max-h-[120px]"
                                        width={400} height={300} />
                                    <div >
                                        <h4 className='text-md font-bold font-display my-2'>{tool.name}</h4>
                                        <p>
                                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-bold font-display bg-indigo-200 text-indigo-800 capitalize">
                                                {tool.pricing_type}
                                            </span>
                                        </p>

                                    </div>

                                </Link>)
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
                    <div className="pb-5 border-b border-gray-200">
                        <h3 className="text-xl font-semibold leading-6 text-gray-900">
                            About {tool.name}
                        </h3>
                    </div>
                    <div className="py-3 prose text-gray-700 break-words xl:pt-6 xl:pb-0 prose-indigo max-w-none">
                        <p className='text-md font-medium text-grey-700  break-words '>
                            {tool.description}
                        </p>
                    </div>

                </div>
            </div>
        </main>
                            <Newsletter/>


        <Footer />


    </>
}