import { useEffect, useContext } from "react"
import classes from "./_Home.module.scss";
import { IoCloseOutline, IoMenuOutline, IoMoonOutline, IoMoon } from "react-icons/io5";
import Link from "next/link";
import { ThemeContext } from "../Home"

export default function Header({ NavLinks, SocialMedia }) {
    const { DarkMode, ToggleTheme } = useContext(ThemeContext);

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

    )
}