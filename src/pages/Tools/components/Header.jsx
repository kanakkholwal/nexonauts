import { useEffect, useState } from "react"
import { IoCloseOutline, IoMenuOutline, IoMoonOutline, IoMoon } from "react-icons/io5";
import Link from "next/link";
import classes from "./_components.module.scss";

export default function Header({ NavLinks, SocialMedia, title, description }) {
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

        SetDarkMode(() => {

            if (localStorage.getItem("kkupgrader_Mode") === "true")
                return true;
            else
                return false
        })


    }, [])

    useEffect(() => {
        const header = document.querySelector("[data-header]");
        window.addEventListener("scroll", function () {
            if (window.scrollY > 100) {
                header.classList.add(classes.active);
            } else {
                header.classList.remove(classes.active);
            }
        });
    }, [])

    return (
        <>

            <header className={classes.Header} data-header>
                <div className={classes.Container}>
                    <Link href="/" className={classes.Logo}>
                        <strong>
                            K K UPGRADER
                        </strong>
                    </Link>
                    <button className={classes.ThemeToggle} onClick={ToggleTheme}>
                        {
                            DarkMode ? <IoMoon /> : <IoMoonOutline />
                        }

                    </button>
                    <nav className={classes.NavBar} data-navbar>
                        <div className={classes.NavBar_top}>
                            <Link href="/" >
                                <strong>
                                    K K UPGRADER
                                </strong>
                            </Link>
                            <button className={classes.navCloseBtn} aria-label="close menu" data-nav-toggler>
                                <IoCloseOutline />
                            </button>
                        </div>
                        <ul className={classes.NavBar_list}>
                            {
                                NavLinks.map(({ name, url }, i) => {

                                    return (
                                        <li key={i}>
                                            <a href={url} className={classes.NavBar_link}>{name}</a>
                                        </li>
                                    )

                                })
                            }

                        </ul>

                        <ul className={classes.SocialList}>
                            {
                                SocialMedia.map(({ name, icon, url }) => {
                                    return (
                                        <li key={name}>
                                            <a href={url} title={name} className={classes.SocialLink}>
                                                {icon}
                                            </a>
                                        </li>
                                    )
                                })

                            }
                        </ul>
                    </nav>
                    <button className={classes.NavOpen_btn} aria-label="open menu" data-nav-toggler>
                        <IoMenuOutline />
                    </button>
                    <div className={classes.overlay} data-nav-toggler data-overlay />
                </div>
            </header>
            <section className={classes.Section + " " + classes.Hero} id="home">
                <div className={classes.Container}>
                    <div className={classes.Hero_content}>
                        <h1 className={"h1" + " " + classes.Hero_title} data-aos="fade-up" data-aos-delay="500">{title}</h1>
                        <p className={classes.Section_text} data-aos="fade-up" data-aos-delay="750"> {description} </p>

                    </div>
                </div>
            </section>


        </>)
}