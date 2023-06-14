import Header from "components/tool-page/header";
import Footer from "components/tool-page/footer";
import { MainWrapper, ContentWrapper, Hero } from "components/tool-page/wrapper";
import SideNav from "components/tool-page/sidenav";
import Link from "next/link";
import { CategoryList,ToolList } from "pages/tools/ToolsList";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

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

export default function ToolPage({ headerChildren, children, session, metadata }) {
    


    return (
        <>
            <SideNav routes={CategoryList} user={session?.user}/>
            <MainWrapper id="main_wrapper" className="isSidenavOpen">
                <Header session={session} routes={[...ToolList]} >
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
