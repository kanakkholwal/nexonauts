import Header from "components/tool-page/header";
import Footer from "components/tool-page/footer";
import styled from "styled-components";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";
import Link from "next/link";

const MainWrapper = styled.main`
width: 100%;
max-width: var(--max-width);
margin-inline: auto;
margin-top: 10rem;
`;
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
export default function ToolPage({ headerChildren, children, session }) {


    return (
        <>
            <Header session={session}>
                {headerChildren ? headerChildren : <>
                    <Link href="/tools">Tools</Link>
                    <Link href="/about">About</Link>
                    <Link href="/pricing">Pricing</Link>
                </>}
            </Header>
            <MainWrapper>
                {children}
            </MainWrapper>
            <Footer socialMedia={SocialMedia} />
        </>
    )
}
