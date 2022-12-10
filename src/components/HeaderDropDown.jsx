import { useState, useEffect, useRef } from "react";
import classes from "./_Header.module.scss";


export default function HeaderDropDown({ NavLinks, open }) {
    const [isOpen, SetIsOpen] = useState(false);

    return (
        <ul className={classes.NavBar_list + (open ? " " + classes.isActive : "")} onClick={(e) => {
            e.stopPropagation()
            SetIsOpen(!isOpen)
        }}>
            {
                NavLinks.map(({ name, url, children }, i) => {
                    return (
                        <li key={i} className={classes.NavBarItem} >
                            <a href={url} className={classes.NavBar_link}>
                                {name}
                                {children?.length > 0 && (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6" /></svg>
                                )}
                            </a>
                            {children?.length > 0 && <HeaderDropDown NavLinks={children} open={isOpen} />}
                        </li>
                    )

                })
            }
        </ul >
    )
}