import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import classes from "./components/_Home.module.scss"
import PageMetaData from "../../components/PageMetaData";
import Aos from "aos";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io5";



export const ThemeContext = createContext(null);
function Home({ PageData }) {
    const [DarkMode, SetDarkMode] = useState(false);
    const ToggleTheme = () => {
        SetDarkMode(!DarkMode);
        localStorage.setItem("kkupgrader_Mode", !DarkMode);

    }


    useEffect(() => {

        if (DarkMode)
            document.body.classList.add("DarkMode");
        else
            document.body.classList.remove("DarkMode");


    }, [DarkMode])
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



        Aos.init({
            offset: 200,
            duration: 750,
            easing: 'ease-in-out',
            delay: 100,
        });


        SetDarkMode(() => {

            if (localStorage.getItem("kkupgrader_Mode") === "true")
                return true;
            else
                return false
        })


    }, [])



    return (
        <ThemeContext.Provider value={{ DarkMode, ToggleTheme }}>
            <PageMetaData />
            <Header NavLinks={PageData.NavLinks} SocialMedia={PageData.SocialMedia} />
            <Main data={PageData.MainContent} />
            <Footer SocialMedia={PageData.SocialMedia} />
        </ThemeContext.Provider>
    )
}

export default Home;
