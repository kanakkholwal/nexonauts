import { useState } from 'react';
import Link from "next/link";

import classes from "./_components.module.scss";

const navLinks = [
    { title: "Home", path: "/" },
    { title: "Blog", path: "/blog" },
    { title: "About", path: "/about-us" },

]
export default function Header({ title, description }) {
    const [open, SetOpen] = useState(false);

    return (
        <>
            <nav className={classes.NavBar}>
                <Link href="/" className={classes.NavBrand}>K K UPGRADER</Link>

                <div className={classes.NavContent}>
                    <div className={classes.NavToggler} onClick={() => SetOpen(!open)}>
                        <div class={classes.hamburgerBurger + (open ? " " + classes.isActive : "")} >
                            <span class={classes.hamburgerBox}>
                                <span class={classes.hamburgerInner}></span>
                            </span>
                        </div>
                    </div>
                    <ul className={classes.NavList + (open ? " " + classes.isOpen : "")}>

                        {
                            navLinks.map((link, index) => {

                                return (
                                    <li key={index} className={classes.NavItem}>
                                        <a className={classes.NavLink} href={link.path} title={link.title}>{link.title}</a>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </div>
            </nav>
            <header className={classes.Header}>
                <h1 className={classes.title}> {title} </h1>
                <h3 className={classes.description}> {description} </h3>

            </header>
        </>

    )
}