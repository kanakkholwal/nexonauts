import styled from "styled-components";
import { NavBarWrapper, Logo, AuthButtonWrapper } from "components/navbar";
import Link from "next/link";
import Button from "components/buttons";

const Children = styled.div`
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: auto;
`;


export default function Header({ session, children }) {


    return (
        <>
            <NavBarWrapper>
                <Logo as={Link} href="/">
                    K K UPGRADER
                </Logo>
                <Children>
                    {children}
                </Children>
                <AuthButtonWrapper>
                    {session ? <Button as={Link} href="/dashboard">Go to Dashboard</Button> :
                        <>
                            <Button level="true" as={Link} href="/login">Log In</Button>
                            <Button as={Link} href="/signup">Sign Up</Button>
                        </>}
                </AuthButtonWrapper>
            </NavBarWrapper>

        </>
    )
}