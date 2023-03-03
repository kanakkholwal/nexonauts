import { useEffect, useState } from "react";
import ViewCounter from "@/components/ViewCounter"
// import ShareCounter from "@/components/ShareCounter"
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { HiOutlineSearch, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { RiEyeLine, RiShareForward2Fill } from "react-icons/ri";

import Link from "next/link";
import { useRouter } from 'next/router'
import classes from "./_Header.module.scss";
import HeaderDropDown from "./HeaderDropDown";
import styled, { keyframes } from "styled-components";
import Input from "@/components/form-elements/Input";

const pop = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
    visibility: hidden;
   }
    
  to {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
 }

`


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
top: calc(100% + 20px);
left:0;
right:0;
width: calc(100% - 30px);
margin: auto;
padding: 1rem;
backdrop-filter: blur(4px);
background: var(--drop-bg);
box-shadow: var(--drop-shadow);
border-radius: 8px;
transition:all .15s cubic-bezier(0,0,.2,1) 150ms;
@media (max-width: 992px){
top: calc(100% + 40px);
}
`;
const SearchDropDownList = styled.ul`
padding-block: 1.5rem;
margin-inline: auto;
display: grid;
grid-gap: 1rem;

@media (min-width: 768px) {
padding: 1.5rem;
grid-template-columns: repeat(2, 5fr);
}

@media (min-width: 992px) {
grid-template-columns: repeat(3, 3.3fr);
}

@media (min-width: 1400px) {
grid-template-columns: repeat(4, 2.5fr);
}
`;
const SearchDropDownItem = styled.li`
flex: 1 1 auto;
opacity: 0;
visibility: hidden;
transition: all 250ms ease-in-out;
animation-name: ${pop};
animation-duration: 0.83s;
animation-direction: normal;
animation-iteration-count: 1;
animation-fill-mode: forwards;
`;
const Item = styled.a`
display: flex;
justify-content: space-between;
flex-direction: column;
gap: 0.5rem;
padding:0.75rem;
background: var(--card-bg);
box-shadow: var(--card-shadow);
border-radius: var(--border-radius,.5rem);
`;
const ItemHeading = styled.h4`
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
text-transform: uppercase;
white-space: normal;
word-break: break-all;
letter-spacing: 2px;
--webkit-line-clamp: 2;
`;
const ItemDescription = styled.p`
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
-webkit-line-clamp: 3;
`;
const CategoryList = styled.p`
display: flex;
flex-wrap:wrap;
gap:0.25rem;
justify-content:flex-start;
align-items:center;
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
margin-right:-55px;
z-index: 3;
`;





export default function Header({ NavLinks, SocialMedia, title, description, Search, pageId = null }) {
    const [DarkMode, SetDarkMode] = useState(false);
    const [SearchArray, SetSearchArray] = useState("");
    const router = useRouter()

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

        const removeEventOnElements = function (elements, eventType, callback) {
            for (let i = 0, len = elements.length; i < len; i++) {
                elements[i].removeEventListener(eventType, callback);
            }
        }


        const navbar = document.querySelector("[data-navbar]");
        const navTogglers = document.querySelectorAll("[data-nav-toggler]");
        const navClose = document.querySelectorAll("[data-nav-close]");
        const overlay = document.querySelectorAll("[data-overlay]");
        const SearchBar = document.querySelector("[data-search]");
        const SearchTogglers = document.querySelectorAll("[data-search-toggler]");
        const SearchClose = document.querySelectorAll("[data-search-close]");
        const header = document.querySelector("[data-header]");

        const toggleNavbar = function () {
            navbar.classList.toggle(classes.active);
            Array.from(overlay).map((item) => item.classList.toggle(classes.active));
        }
        const toggleSearch = function () {
            SearchBar.classList.toggle(classes.IsOpen);
            SearchBar.inert = !SearchBar.inert;
        }
        document.addEventListener("mouseup", (e) => {
            if (!header.contains(e.target))
                closeSearch()
        })
        const closeNavbar = function () {
            navbar.classList.remove(classes.active);
            Array.from(overlay).map((item) => item.classList.remove(classes.active));
        }
        const closeSearch = function () {
            SearchBar.classList.remove(classes.IsOpen);
            SearchBar.inert = true;
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


        window.addEventListener("scroll", function () {
            if (window.scrollY > 100) {
                header.classList.add(classes.active);
            } else {
                header.classList.remove(classes.active);
            }
        });
        const handleRouteChange = (url, { shallow }) => {
            closeSearch()
        }
        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            removeEventOnElements(navTogglers, "click", toggleNavbar);
            removeEventOnElements(SearchTogglers, "click", toggleSearch);
            removeEventOnElements(navClose, "click", closeNavbar);
            removeEventOnElements(SearchClose, "click", closeSearch);
            router.events.off('routeChangeComplete', handleRouteChange)

        }
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
                                DarkMode ? <HiOutlineSun /> : <HiOutlineMoon />
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
                    <div className={classes.NavSearch} data-search inert="true">
                        <SearchContainer>
                            <SearchIcon><HiOutlineSearch /></SearchIcon>
                            <SearchInput type="search" outlined onChange={(e) => {
                                SetSearchArray(Search?.
                                    filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()) || item.description.toLowerCase().includes(e.target.value.toLowerCase()))
                                )

                            }} spellCheck={false} />
                            <SearchDropDown className={classes.NavSearchDropDown}>
                                <SearchDropDownList>
                                    {
                                        SearchArray.length > 0 ?
                                            SearchArray.map((item, index) => {

                                                return (<SearchDropDownItem key={index}>
                                                    <Item as={Link} href={item.path}>

                                                        <ItemHeading>{item.title}</ItemHeading>
                                                        <CategoryList>
                                                            <span className=" Badge  mb-2 ">{item.category}</span>
                                                            <span className={"Badge  mb-2 ms-2 " + (item.online ? "Badge_success" : "Badge_danger")} title={item.online ? " Tool is working Fine :)" : "Tool has Some Issues ;)"}>{item.online ? "On" : "Off"}</span>
                                                        </CategoryList>
                                                        <ItemDescription>{item.description}</ItemDescription>
                                                    </Item>
                                                </SearchDropDownItem>)
                                            })
                                            : <>
                                                No Result
                                            </>
                                    }
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