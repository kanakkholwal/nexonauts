import Header from "components/layouts/header";
import Footer from "components/layouts/footer";
import { BreadCrumb } from "components/breadcrumb";
import { MainWrapper, ContentWrapper, } from "components/layouts/wrapper";
import SideNav from "components/layouts/sidenav";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { BiBell } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { TbTools, TbMessageDots, TbBrandBlogger } from "react-icons/tb";
import { RiAdminLine,RiPagesLine } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";


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

const routes = (userRole :string ) => {
        return [
            {
                title: "Home",
                icon: <RxDashboard />,
                path: "/",
            }
        ]
}
export default function AppPage({ headerChildren , children, user } :{
    headerChildren?: React.ReactNode,
    children: React.ReactNode,
    user: any
}) {


    return (
        <>
            <SideNav routes={routes(user?.role)} user={user} />
            <MainWrapper id="main_wrapper" className="isSidenavOpen">
                <Header user={user} routes={routes(user?.role)}>
                    {headerChildren ? headerChildren : null}
                </Header>
                <ContentWrapper>
                    <BreadCrumb />
                    {children}
                </ContentWrapper>
                <Footer socialMedia={SocialMedia} />

            </MainWrapper>
        </>
    )
}
