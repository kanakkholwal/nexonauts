import { useEffect } from "react";
import HomeClass from "./_Home.module.scss";
import "aos/dist/aos.css";
import Aos from "aos";

import PageMetaData from "../../components/PageMetaData";
import NavBar from "./components/Navbar";
import HeaderAnimatable from "./components/Animatable";
import Main from "./components/Main";
import ContactsSection from "./components/ContactSection";
import Footer from "./components/Footer";


const NavLinks = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "About Us",
        path: "#about-us"
    },
    {
        name: "PortFolio",
        path: "#portfolio"
    },
    {
        name: "Contact Us",
        path: "#contact-us"
    }
]
const MainContent = [
    {
        title: "About Me",
        content: "Hey There, I am Kanak Kholwal and I am a Frontend Developer and I share Web Development tips and tricks , Internet Tools and Blog Articles on this site.",
        link: {
            path: "/portfolio",
            title: "Portfolio",
        },
        ImageUrl: "/assets/svg-images/about-us.svg"
    },
    {
        title: "Tools",
        content: "Free to Use Internet Tools for everyone. From Text to Handwriting ,Svg designing ,Css Generator to Meta Tag Generator ,JavaScript Beautifier & Minifier Tools and many More.",
        link: {
            path: "/tools",
            title: "Use Tools",
        },
        ImageUrl: "/assets/svg-images/blogging.svg"
    },
    {
        title: "Blog",
        content: "News , Information , Tech Tips and Tricks ,Blogger, Awesome Css and Java Codes and Much More...",
        link: {
            path: "/blog",
            title: "Read Blog",
        },
        ImageUrl: "/assets/svg-images/blogging.svg"
    },
    {
        title: "Projects",
        content: "Many Projects have been created by us from very basic like calculator and Webpage clone to major website and nowadays I am working on a personalized library framework like Bootstrap.",
        link: {
            path: "/projects",
            title: "See Projects",
        },
        ImageUrl: "/assets/svg-images/projects.svg"
    }
]
export default function HomePage() {


    useEffect(() => {
        Aos.init();
    }, [])
    return (
        <>
            <PageMetaData />
            <div className={HomeClass.HomePage}>

                <header className={HomeClass.Header}>
                    <NavBar title={"K K Dev"} NavLinks={NavLinks} />

                    <div className={HomeClass.HeaderContainer}>
                        <div className={HomeClass.Content}>
                            <h1 data-aos="fade-up" data-aos-duration="500" data-aos-easing="ease-in-out" >
                                Let's Dive into Tech with world of Internet.
                            </h1>
                            <h4 data-aos="fade-up" data-aos-duration="550" data-aos-easing="ease-in-out" >
                                Wanna Know About Me ?
                            </h4>
                            <a href="#LetsStart" className={HomeClass.StartBtn} data-aos="fade-up" data-aos-duration="750" data-aos-easing="ease-in-out" >Get Started</a>
                        </div>
                        <div className={HomeClass.Figures} >
                            <HeaderAnimatable />
                        </div>

                    </div>
                </header>

                <main className={HomeClass.Main}>
                    <Main MainContent={MainContent} />
                </main>

                <div className={HomeClass.ContactsSection} hidden>
                    <ContactsSection />

                </div>

                <Footer />
            </div>
        </>
    )
}