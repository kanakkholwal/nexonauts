import { MetaData, FooterArea, ToolListJSON, HeaderArea } from "@/pages/Tools/Tool";
import React from 'react';
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";


const NavLinks = [

    {
        name: "All Tools",
        url: "/tools",

    },
    {
        name: "Web Tools",
        url: "#!",
        children: [
            {
                name: "Meta Tag Generator",
                url: "/tools/meta-tag-generator",
            },
            {
                name: "iFrame Embed Code Generator",
                url: "/tools/iframe-generator"
            }
        ]
    },
    {
        name: "Portfolio",
        url: "/#portfolio"
    }
    , {
        name: "Contact",
        url: "/#contact"
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
export async function getStaticPaths() {
    // Return a list of possible value for toolName
    const paths = ToolListJSON.map(({ path }) => {
        return {
            params: {
                toolName: path.split("/").pop()
            }
        };
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {

    const componentPath: string = ToolListJSON.find(({ path }) => path.split("/").pop() === params.toolName).path;


    return { props: { componentPath } }
}



export default function Tool({ componentPath }): JSX.Element {

    const ToolComponent = ToolListJSON.find(({ path }) => path === componentPath);

    return (
        <>
            <MetaData PageTitle={ToolComponent.title} PageDescription={ToolComponent.description} SiteName={''} PageUrl={''} PreviewImage={''} PageType={''} PageLocale={''} />
            <HeaderArea title={ToolComponent.title} description={ToolComponent.description} NavLinks={NavLinks} SocialMedia={SocialMedia} />
            <main className="G_MainContent">
                {ToolComponent.Component}
            </main>
            <FooterArea FooterData={FooterData} />
        </>
    )
}
