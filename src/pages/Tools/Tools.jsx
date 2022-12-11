import Header from '../../components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import PageMetaData from "../../components/PageMetaData";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

const metaData = {
    title: "Tools | K K UPGRADER",
    description: "Collection of Web Tools , Design Tools , Editing and Coding Tools"
}
const NavLinks = [

    {
        name: "About",
        url: "#about",

    },
    {
        name: "Projects",
        url: "/#projects",
        children: [
            {
                name: "College Website",
                url: "/#projects",
            },
            {
                name: "UI Component Library",
                url: "/#projects",
            }
        ]
    },
    {
        name: "Blog",
        url: "#blog"
    }
    , {
        name: "Contact",
        url: "#contact"
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
export default function Tools() {


    return (
        <>
            <PageMetaData PageTitle={metaData.title} PageDescription={metaData.description} />
            <Header NavLinks={NavLinks} SocialMedia={SocialMedia} title={metaData.title.split("|")[0]} description={metaData.description} />
            <Main />
            <Footer FooterData={FooterData} />
        </>
    )
}