"use client"
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import classes from "./components/_Home.module.scss"
import PageMetaData from "../../components/PageMetaData";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";

const PageData = {
    NavLinks: [

        {
            name: "About",
            url: "#about",

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

    ],
    MainContent: {
        hero: {
            title: "I'm Frontend Web  Developer & Web 3 Enthusiast.",
            subtitle: "Hello! I'm Kanak, a FullStack Web Developer based in India. I’m very passionate  about the work that I do.",
            image: "assets/images/me.png",
        },
        sections: {
            about: {
                title: "What I Do?",
                description: "Hey There, I am Kanak Kholwal and I am a Frontend Developer and I create beautiful Websites with mobile friendly and SEO optimized Designs . I also build Simple but useful Internet Tools and write Blog about Tech and Programming.",
                skills: [
                    {
                        name: "HTML / CSS3 / SCSS",
                        percentage: 90,
                        color: "#8e34e7"
                    },
                    {
                        name: "Javascript",
                        percentage: 85,
                        color: "#4574cb"
                    },
                    {
                        name: "ReactJs / NextJs",
                        percentage: 70,
                        color: "#40b577"
                    },
                    {
                        name: "Firebase",
                        percentage: 75,
                        color: "#db6281"
                    },

                ]
            },
            projects: {
                title: "Latest Projects",
                description: "Check out some of my latest projects with creative ideas.",
                link: '/projects',
                list:
                    [
                        {
                            category: "ExpressJs,ReactJs ,SASS ,Firebase",
                            title: "College Result Website",
                            description: "To display college results across all majors and years with extended functionalities.",
                            link: "https://nith-result.web.app/",
                            image: "assets/images/result-site.webp",
                            theme: {
                                color: {
                                    light: "#a07cc5",
                                    dark: "#f4e9ff"
                                },
                                bg: {
                                    light: "#f8f5fb",
                                    dark: "#6658d3"
                                }
                            }
                        },
                        {
                            category: "SASS , VanillaJs",
                            title: "Web UI Component Library ",
                            description: "To develop an open-source web component library for quick development .",
                            link: "https://genesis-ui.netlify.app/",
                            image: "assets/images/web-design.svg",
                            theme: {
                                color: {
                                    light: "#3f78e0",
                                    dark: "#0a0e13"
                                },
                                bg: {
                                    light: "#f1f5fd",
                                    dark: "#3f78e0"
                                }
                            }
                        },

                        {
                            category: "SASS , NextJs ,ReactJs",
                            title: "Web Tools(beta)",
                            description: "To develop web tools for websites for basic web development operations like SEO and image conversion,etc.",
                            link: "/tools",
                            image: "assets/images/web-tools.svg",
                            theme: {
                                color: {
                                    light: "rgb(0, 82, 73)",
                                    dark: "rgb(0, 82, 73)"
                                },
                                bg: {
                                    light: "#d4f3e1",
                                    dark: "rgb(47 188 106)"
                                }
                            }
                        },
                    ]
            },
            blog: {
                title: "Blog",
                blogName: "kkupgrader.blogspot.com",
                link: "https://kkupgrader.blogspot.com",
                image: "assets/svg-images/blogging.svg",
                description: "News , Information , Tech Tips and Tricks ,Blogger, Awesome Css and Java Codes and Much More..."
            }
        }
    },
    SocialMedia: [
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
}
export const ThemeContext = createContext(null);
function Home() {
    // const [DarkMode, SetDarkMode] = useState(false);
    // const ToggleTheme = () => {
    //     SetDarkMode(!DarkMode);
    //     localStorage.setItem("kkupgrader_Mode", !DarkMode);

    // }
    // useEffect(() => {
    //     if (localStorage.getItem("kkupgrader_Mode") === "true" || window.matchMedia('(prefers-color-scheme: dark)')) {
    //         localStorage.setItem("kkupgrader_Mode", true);
    //         SetDarkMode(true);
    //     }
    // }, [])

    // useEffect(() => {




    //     if (DarkMode)
    //         document.body.classList.add("DarkMode");
    //     else
    //         document.body.classList.remove("DarkMode");


    // }, [DarkMode])
    useEffect(() => {


        const addEventOnElements = function (elements, eventType, callback) {
            for (let i = 0, len = elements.length; i < len; i++) {
                elements[i].addEventListener(eventType, callback);
            }
        }
        /**
         * NAVBAR TOGGLE FOR MOBILE
         */

        const navbar = document.querySelector("[data-navbar]");
        const navTogglers = document.querySelectorAll("[data-nav-toggler]");
        const overlay = document.querySelector("[data-overlay]");

        const toggleNavbar = function () {
            navbar.classList.toggle(classes.active);
            overlay.classList.toggle(classes.active);
            document.body.classList.toggle("overlayActive");
        }

        addEventOnElements(navTogglers, "click", toggleNavbar);






        // SetDarkMode(() => {

        //     if (localStorage.getItem("kkupgrader_Mode") === "false")
        //         return false
        //     else if (localStorage.getItem("kkupgrader_Mode") === "true" || window.matchMedia('(prefers-color-scheme: dark)'))
        //         return true;
        //     else
        //         return false
        // })


    }, [])



    return (
        <>
            <PageMetaData />
            <Header NavLinks={PageData.NavLinks} SocialMedia={PageData.SocialMedia} />
            <Main data={PageData.MainContent} />
            <Footer SocialMedia={PageData.SocialMedia} />
        </>
    )
}

export default Home;
