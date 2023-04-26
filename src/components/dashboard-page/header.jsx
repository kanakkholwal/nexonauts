import { NavBarWrapper as Wrapper, ProfileDropDownInfo, ProfileWrapper, Profile, ProfileDropDown, ProfileDropDownItem } from "components/navbar";
import styled from "styled-components";
import Link from "next/link";
import { signOut } from 'next-auth/react';
import Button from "components/buttons";
import { useState, useEffect,useRef } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { TbTools } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAdminPanelSettings, MdLogout } from "react-icons/md";
import Image from "next/image";

const NavBarWrapper = styled(Wrapper)`
max-width: 100%;
width: 100%;
position: sticky;
top: 0;
inset-inline: 0;  
border-radius: 0;
`;
const Children = styled.div`
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: auto;
`;

const Toggler = styled(Button)`
padding:0.75rem;
margin-inline-end:0.75rem;
`;

export default function Header({ user, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [open, setOpen] = useState(false);
    let ProfileRef = useRef(null);

    useEffect(() => {
        let sidenavPanel = document.body.querySelector("#sidenav_panel");
        let MainPanel = document.body.querySelector("#main_wrapper");

        if (!window.matchMedia("(min-width: 1024px)").matches) {
            sidenavPanel.classList.remove('isOpen');
            MainPanel.classList.remove('isSidenavOpen');
        }
        document.addEventListener("mousedown",(e) =>{
            if (e.target.id === "sidenav_panel" || e.target.id === "main_wrapper") {
                setIsSidebarOpen(false);
            }
            if(ProfileRef.current && !ProfileRef.current.contains(e.target)){
                setOpen(false);
            }
        })


    }, []);
    useEffect(() => {
        let sidenavPanel = document.body.querySelector("#sidenav_panel");
        let MainPanel = document.body.querySelector("#main_wrapper");

        if (!sidenavPanel.classList.contains('isOpen')) {
            sidenavPanel.classList.add('isOpen');
            MainPanel.classList.add('isSidenavOpen')
        }
        else {
            sidenavPanel.classList.remove('isOpen');
            MainPanel.classList.remove('isSidenavOpen')
        }

    }, [isSidebarOpen]);




    return (
        <>
            <NavBarWrapper>
                <Toggler level="true"
                    onClick={() => setIsSidebarOpen((state) => !state)}><RiMenuUnfoldLine /></Toggler>
                <Children>
                    {children}
                </Children>
                <ProfileWrapper>
                    <Profile onClick={() => setOpen(!open)} role="button" tabIndex="0">
                        <Image src={user.profileURl ?? "https://res.cloudinary.com/kanakkholwal-portfolio/image/upload/v1680632194/kkupgrader/placeholder_rwezi6.png"} height={40} width={40} alt={user?.name ?? "User Profile"} />
                    </Profile>
                    <ProfileDropDown open={open} ref={ProfileRef}>
                        <ProfileDropDownInfo>
                            <h5 className="d-flex justify-content-between align-items-center">
                                {user?.name ?? "User Name"}
                            </h5>
                            <p>
                                {user?.email ?? "User Email"}
                            </p>
                        </ProfileDropDownInfo>
                        {
                            user?.role === "admin" && <ProfileDropDownItem as={Link} href="/dashboard/admin">
                                <MdOutlineAdminPanelSettings /> Admin</ProfileDropDownItem>
                        }
                        <ProfileDropDownItem as={Link} href="/">
                            <BiHomeAlt2 />
                            Home</ProfileDropDownItem>
                        <ProfileDropDownItem as={Link} href="/tools">
                            <TbTools />
                            Tools</ProfileDropDownItem>
                        <ProfileDropDownItem as={Link} href="/dashboard/profile">
                            <FaRegUser />
                            Profile</ProfileDropDownItem>
                        <ProfileDropDownItem as={Link} href="/dashboard/settings">
                            <IoSettingsOutline />
                            Settings</ProfileDropDownItem>
                        <ProfileDropDownItem as={"button"} onClick={(e) => {
                            e.preventDefault();
                            signOut();
                        }}>Log Out
                            <MdLogout />
                        </ProfileDropDownItem>
                    </ProfileDropDown>
                </ProfileWrapper>
            </NavBarWrapper>

        </>
    )
}