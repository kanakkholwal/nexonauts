import ToolPage from "components/tool-page";
import { ToolList } from "pages/tools/ToolsList";
import PageMetaData from "components/PageMetaData";
import {
    ToolCard,
    CardContainer
} from "components/tools";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import Head from 'next/head';
import { useSession } from "next-auth/react";
import { registerView } from "lib/analytics";
import { useEffect } from "react";


const metadata = {
    title: "Tools | K K UPGRADER",
    description: "Collection of Web Tools , Design Tools , Editing and Coding Tools"
}

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
export const FooterData = {
    Links: {
        Heading: "Useful Links",
        LinkList: [
            {
                name: "About",
                url: "/about",
            },
            {
                name: "Projects",
                url: "/projects",
            },
            {
                name: "Contact",
                url: "/contact",
            },

        ]
    },
    About: {
        title: "More From Us",
        description: "",
        LinkList: [
            {
                name: "Blog",
                url: "https://kkupgrader.blogspot.com",
            },
            {
                name: "Genesis UI",
                url: "https://genesis-ui.netlify.app",
            }
        ],
        Social: [
            ...SocialMedia
        ]
    }

}
export default function Tools() {

    const { data: session } = useSession();
    useEffect(() =>{
        registerView({ title: "All Tools", type: "page", slug: "/tools" })
    },[])

    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href={process.env.WEBSITE_URL || 'https://kkupgrader.eu.org' + "/tools"}
                    key="canonical"
                />
            </Head>
            <ToolPage session={session || null} metadata={{
                title: metadata.title.split("|")[0],
                description: metadata.description
            }}>
                <CardContainer>
                    {ToolList.map(({ title, description, path, category, online }, index) => {
                        return <ToolCard path={path} key={index} title={title} description={description} category={category} online={online} index={index} style={{ animationDelay: (0.1 * index) + "s" }} />
                    })}
                </CardContainer>
            </ToolPage>
            <PageMetaData PageTitle={metadata.title} PageDescription={metadata.description} />

        </>
    )
}