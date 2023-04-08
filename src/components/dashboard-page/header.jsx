import styled from "styled-components";
import { NavBarWrapper as Wrapper, Logo, ProfileWrapper, Profile, ProfileDropDown, ProfileDropDownItem } from "components/navbar";
import Link from "next/link";
import { signOut } from 'next-auth/react';
import Button from "components/buttons";
import { useState, useEffect } from "react";
import { RiMenuUnfoldLine } from "react-icons/ri";
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


    useEffect(() => {
        let sidenavPanel = document.body.querySelector("#sidenav_panel");
        let MainPanel = document.body.querySelector("#main_wrapper");

        if (!window.matchMedia("(min-width: 1024px)").matches) {
            sidenavPanel.classList.remove('isOpen');
            MainPanel.classList.remove('isSidenavOpen');
        }


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
                    <ProfileDropDown open={open}>
                        <ProfileDropDownItem as={Link} href="/dashboard/profile">Profile</ProfileDropDownItem>
                        <ProfileDropDownItem as={Link} href="/dashboard/settings">Settings</ProfileDropDownItem>
                        <ProfileDropDownItem as={"button"} onClick={(e) => {
                            e.preventDefault();
                            signOut();
                        }}>Log Out</ProfileDropDownItem>
                    </ProfileDropDown>
                </ProfileWrapper>
            </NavBarWrapper>

        </>
    )
}