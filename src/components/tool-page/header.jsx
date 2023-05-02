import styled from "styled-components";
import { NavBarWrapper as Wrapper, Logo, AuthButtonWrapper } from "components/navbar";
import Link from "next/link";
import Button from "components/buttons";
import { useState, useEffect } from "react";
import { RiMenuUnfoldLine } from "react-icons/ri";

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

export default function Header({ session, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


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
                rounded
                    onClick={() => setIsSidebarOpen((state) => !state)}><RiMenuUnfoldLine /></Toggler>

                <Logo as={Link} href="/">
                    K K UPGRADER
                </Logo>
                <Children>
                    {children}
                </Children>
                <AuthButtonWrapper>
                    {session ? <Button level="true" as={Link} href="/dashboard">Go to Dashboard</Button> :
                        <>
                            <Button level="true" as={Link} href="/login">Log In</Button>
                            <Button as={Link} href="/signup">Sign Up</Button>
                        </>}
                </AuthButtonWrapper>
            </NavBarWrapper>

        </>
    )
}