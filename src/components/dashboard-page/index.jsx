import Header from "./header";
import Footer from "./footer";
import { MainWrapper, ContentWrapper, Hero } from "./wrapper";
import SideNav from "./sidenav";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { TbTools } from "react-icons/tb";

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

export default function DashboardPage({ headerChildren, children, user }) {


    return (
        <>
            <SideNav links={[
                {
                    title: "Dashboard",
                    path: "/dashboard",
                    icon: <RxDashboard />,
                },
                {
                    title: "Blog",
                    path: "/dashboard/blog",
                    icon: <BsFillJournalBookmarkFill />,
                },
                {
                    title: "Tools",
                    path: "/dashboard/tools",
                    icon: <TbTools />,
                },

            ]} user={user} />
            <MainWrapper id="main_wrapper" className="isSidenavOpen">
                <Header user={user}>
                    {headerChildren ? headerChildren : null}
                </Header>
                <ContentWrapper>
                    {children}
                </ContentWrapper>
                <Footer socialMedia={SocialMedia} />

            </MainWrapper>
        </>
    )
}
