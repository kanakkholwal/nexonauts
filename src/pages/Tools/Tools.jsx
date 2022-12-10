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
        url: "#about"
    },
    {
        name: "Projects",
        url: "#projects"
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
export default function Tools() {


    return (
        <>
            <PageMetaData PageTitle={metaData.title} PageDescription={metaData.description} />
            <Header NavLinks={NavLinks} SocialMedia={SocialMedia} />
            <Main />
            <Footer />
        </>
    )
}