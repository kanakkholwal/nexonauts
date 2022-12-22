import { useEffect, useState } from "react";
import ViewCounter from "@/components/ViewCounter"
// import ShareCounter from "@/components/ShareCounter"
import { IoCloseOutline, IoMenuOutline, IoMoonOutline, IoMoon } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { RiEyeLine, RiShareForward2Fill } from "react-icons/ri";

import Link from "next/link";
import classes from "./_Header.module.scss";
import HeaderDropDown from "./HeaderDropDown";
import styled from "styled-components";
import Input from "@/components/form-elements/Input";



const SearchContainer = styled.div`
position:relative;
margin-inline: inherit;
display: inherit;
align-items: inherit;
width: inherit;
height: inherit;
`;
const SearchDropDown = styled.div`
position:absolute;
top:100%;
left:0;
right:0;
width:100%;
padding: 1rem;
`;
const SearchDropDownList = styled.ul`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:2em;
`;
const SearchDropDownItem = styled.li`
display:grid;
`;
const SearchInput = styled(Input)`
transition: all 0.35s var(--open-transition);
padding-left:38px;
`;
const SearchIcon = styled.div`
display: flex;
padding: 0.75rem;
align-items: center;
justify-content: center;
padding: 18px;
margin-right:-50px;
z-index: 3;
`;





export default function Header({ NavLinks, SocialMedia, title, description, Search, pageId = null }) {
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


        const navbar = document.querySelector("[data-navbar]");
        const navTogglers = document.querySelectorAll("[data-nav-toggler]");
        const navClose = document.querySelectorAll("[data-nav-close]");
        const overlay = document.querySelectorAll("[data-overlay]");
        const SearchBar = document.querySelector("[data-search]");
        const SearchTogglers = document.querySelectorAll("[data-search-toggler]");
        const SearchClose = document.querySelectorAll("[data-search-close]");

        const toggleNavbar = function () {
            navbar.classList.toggle(classes.active);
            Array.from(overlay).map((item) => item.classList.toggle(classes.active));
        }
        const toggleSearch = function () {
            SearchBar.classList.toggle(classes.IsOpen);
            Array.from(overlay).map((item) => item.classList.toggle(classes.active));
            if (window.scrollY < 100)
                header.classList.toggle(classes.active);

        }
        const closeNavbar = function () {
            navbar.classList.remove(classes.active);
            Array.from(overlay).map((item) => item.classList.remove(classes.active));
        }
        const closeSearch = function () {
            SearchBar.classList.remove(classes.IsOpen);
            Array.from(overlay).map((item) => item.classList.remove(classes.active));
            if (window.scrollY < 100)
                header.classList.remove(classes.active);
        }

        addEventOnElements(navTogglers, "click", toggleNavbar);
        addEventOnElements(SearchTogglers, "click", toggleSearch);
        addEventOnElements(navClose, "click", closeNavbar);
        addEventOnElements(SearchClose, "click", closeSearch);

        SetDarkMode(() => {

            if (localStorage.getItem("kkupgrader_Mode") === "true")
                return true;
            else
                return false
        })


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

                    <button className={classes.NavOpen_btn} aria-label="open menu" data-nav-toggler>
                        <IoMenuOutline />
                    </button>
                    <Link href="/" className={classes.Logo}>
                        <strong>
                            K K UPGRADER
                        </strong>
                    </Link>
                    <div className={classes.NavCTA}>
                        <button className={classes.ThemeToggle} onClick={ToggleTheme} aria-label="Dark Mode Toggle" type="button">
                            {
                                DarkMode ? <IoMoon /> : <IoMoonOutline />
                            }
                        </button>
                        {Search && <>
                            <button className={classes.SearchToggle} aria-label="Search on Site" data-search-toggler type="button">
                                <HiOutlineSearch />
                            </button>
                        </>}
                    </div>

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

                        <HeaderDropDown NavLinks={NavLinks} />
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
                    <div className={classes.NavSearch} data-search >
                        <SearchContainer>
                            <SearchIcon><HiOutlineSearch /></SearchIcon>
                            <SearchInput type="search" outlined />
                            <SearchDropDown>
                                <SearchDropDownList>
                                    {Search?.map((item, index) => <SearchDropDownItem key={index}>{item.title}</SearchDropDownItem>)}
                                </SearchDropDownList>
                            </SearchDropDown>
                        </SearchContainer>
                    </div>
                </div >
                <div className={classes.overlay} data-nav-close data-overlay data-search-close />

            </header>

            <section className={classes.Section + " " + classes.Hero} id="hero">
                <div className={classes.Container}>

                    <div className={classes.Hero_content}>
                        <h1 className={"h1"} data-aos="fade-up" data-aos-delay="100">{title}</h1>
                        <p className={classes.Section_text} data-aos="fade-up" data-aos-delay="150"> {description} </p>
                        {pageId && <>
                            <div className="m-auto d-flex justify-content-center align-items-center" style={{ gap: "1rem" }}>
                                <span className="Badge Badge_info"><RiEyeLine /> <ViewCounter slug={pageId} /></span>
                                {/* <span className="Badge"><ShareCounter slug={pageId} />{" "} <RiShareForward2Fill /> </span> */}
                            </div>
                        </>

                        }
                    </div>
                </div>
            </section>


        </>)
}