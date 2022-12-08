import { useEffect, useRef } from "react";
import HomeClass from "../_Home.module.scss";


export default function NavBar({ title, NavLinks }) {

    const Toggler = useRef(null);
    const NavList = useRef(null);

    useEffect(() => {
        Toggler.current.addEventListener("click", () => {
            NavList.current.classList.toggle(HomeClass.Open)
            Toggler.current.classList.toggle(HomeClass.Active)
        });

    }, [Toggler])

    return (
        <nav className={HomeClass.Navbar}>
            <div className={HomeClass.NavBrand}>
                {title}
            </div>
            <div className={HomeClass.NavContent}>
                <button className={HomeClass.NavToggle} ref={Toggler}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul className={HomeClass.NavList} ref={NavList}>
                    {
                        NavLinks?.map(({ name, path }, index) => {
                            return <li className={HomeClass.NavItem} key={name} data-aos="flip-up" data-aos-duration={(800 * index)}> <a href={path} className={HomeClass.NavLink}>{name}</a></li>
                        })
                    }

                </ul>
            </div>
        </nav>
    )
}