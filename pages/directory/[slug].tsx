import { NextSeo } from 'next-seo';
import axios from 'axios';

import PublicToolType from "types/public-tool";
import Footer from "components/layouts/footer";

import {
    DirectoryPageNavBar,
    DirectoryPageHeader,
    DirectoryPageContainer,
    SlugPageSection,
    SlugPage,
    ShareContainer,
    SlugPageMain,
    SlugPageAside,
    Header,
    Wave
} from "src/layouts/directory-page";
import { RiArrowRightUpLine, RiCloseLine } from "react-icons/ri"
import { TbShare2 } from "react-icons/tb"

import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaPinterestP, FaTelegramPlane, FaRedditAlien } from 'react-icons/fa';
import { LuCopy, LuVerified } from 'react-icons/lu';
import { IoMailOutline } from 'react-icons/io5';
import Badge from "components/topography/badge"
import Button from '@/components/buttons';
import LazyImage from "components/image";
import Link from 'next/link';
import useShare from 'hooks/useShare';
import {
    useModal,
    Modal,
} from "components/dialog/modal";
import { useRef } from 'react';

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


        <DirectoryPageContainer>

            <DirectoryPageHeader>
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
                <Wave />
            </DirectoryPageHeader>
            <SlugPage>
                <Header>
                    <div className="Meta">
                        <LazyImage src={tool.coverImage} alt="AI Directory" width={600} height={480} />
                        <div className='Info'>
                            <h1>{tool.name}
                                {/* {tool.verified && <LuVerified className='verify' size={32} title='Verified ' />} */}
                            </h1>
                            <p>
                                <Badge noBorder={true}>
                                    {tool.pricing_type}
                                </Badge>
                            </p>
                        </div>
                    </div>
                    <div className="Action">
                        <button className="ShareBtn"
                            onClick={() => {
                                // if (nativeShare !== false) {
                                //     nativeShare();
                                // } else {
                                open();
                                // }
                            }
                            }
                        >
                            <TbShare2 />
                        </button>
                        <Link href={tool.link} target='_blank' className='visit' >
                            Visit Site
                        </Link>
                    </div>
                </Header>
                <SlugPageSection>
                    <SlugPageMain>
                        <div className="overview">
                            <h6>Overview</h6>
                            <p>{tool.description}</p>
                        </div>
                        <div className="preview">
                            <h6>Previews</h6>
                            <div className='previews'>
                                <LazyImage src={tool.coverImage} alt="AI Directory" width={600} height={480} />
                            </div>
                        </div>
                    </SlugPageMain>
                    <SlugPageAside>
                        <div className="tagsWrapper">
                            <h6>Tags</h6>
                            <p className='tags'>
                                {tool.categories.map((tag, index) => {
                                    return <Badge key={index} noBorder={true} nature={"primary"} rounded={true}>
                                        {tag.name}
                                    </Badge>
                                })}
                            </p>
                        </div>
                        <div className="relatedWrapper">
                            <h6>Related to {tool.name}</h6>
                            {related?.map((tool, index) => {
                                return (<Link className='relatedCard'  href={"/directory/" + tool.slug} key={index}>

                                    <LazyImage src={tool.coverImage} alt="AI Directory" width={600} height={480} />
                                    <div className="Details">
                                        <h4>{tool.name}</h4>
                                        <p>
                                            <Badge noBorder={true} nature={"theme"} rounded={true}>
                                                {tool.pricing_type}
                                            </Badge>
                                        </p>

                                    </div>

                                </Link>)
                            })}
                        </div>
                    </SlugPageAside>
                </SlugPageSection>


            </SlugPage>
          
            <Modal
                ref={shareRef}
            ><ShareContainer>
                    <div className='Header'>
                        <h4 className='Title'>Share</h4>
                        <button className='CloseBtn' onClick={close}>
                            <RiCloseLine />
                        </button>
                    </div>
                    <div className='socials'>
                        {socials.map((social, index) => {
                            const icon = social_icons.find((item) => item.name === social.name)
                            if (!icon)
                                return null
                            else
                                return (<Button level={true} as={"a"} href={social.url} data-social={social.name} key={index} target='_blank' rel="noopener noreferrer" title={"Share on " + social.name} className='item'>
                                    {icon.icon}
                                </Button>)
                        })}
                    </div>
                </ShareContainer>

            </Modal>
        </DirectoryPageContainer>
        <Footer socialMedia={SocialMedia} />


    </>
}