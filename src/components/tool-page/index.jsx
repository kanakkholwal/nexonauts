import Header from "components/layouts/header";
import Footer from "components/tool-page/footer";
import { MainWrapper, ContentWrapper, Hero } from "components/tool-page/wrapper";
import SideNav from "components/layouts/sidenav";
import { CategoryList,ToolList } from "pages/tools/ToolsList";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import { TbTools ,TbSmartHome,TbBrandBlogger,TbDashboard} from "react-icons/tb";
import { GrResources } from "react-icons/gr";
import { RiAppsLine } from "react-icons/ri";

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
        sessionRequired: true,
        searchable: true,
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
const routes = (userRole) => {
    return [
        {
            title: "Home",
            icon: <TbSmartHome size={16}/>,
            path: "/",
        },
        {
            title: "Dashboard",
            icon: <TbDashboard size={16}/>,
            path: "/dashboard",
            sessionRequired: true,
        },
        {
            title: "Apps",
            icon: <RiAppsLine size={16} />,
            path: "/apps",
        },
        {
            title: "Tools",
            icon: <TbTools  size={16}/>,
            path: "/tools",
        },
        {
            title: "AI Directory",
            icon: <GrResources  size={16}/>,
            path: "/directory",
        },
        {
            title: "Blog",
            icon: <TbBrandBlogger  size={16}/>,
            path: "/blog",
        }
    ]
}
export default function ToolPage({ headerChildren, children, session, metadata ,...props}) {
    


    return (
        <>
            <SideNav routes={routes(session?.user?.role)} user={session?.user}/>
            <MainWrapper id="main_wrapper" className="isSidenavOpen">
                <Header user={session?.user} routes={[...ToolList]} >
                    {headerChildren ? headerChildren : null}
                </Header>
                <ContentWrapper>
                    <Hero>
                        <h1>
                            {metadata?.title}
                        </h1>
                        <p>
                            {metadata?.description}
                        </p>
                    </Hero>
                    {children}
                </ContentWrapper>
                <Footer socialMedia={SocialMedia} />

            </MainWrapper>
        </>
    )
}
