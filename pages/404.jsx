import styled from "styled-components";
import Image from 'next/image';
import Link from "next/link";
import Button from "components/buttons";
import Head from "next/head";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import { useSession } from "next-auth/react";

const NavBarWrapper = styled.div`
    background-color: rgb(244 247 254 / 20%);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    filter: none;
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border-width: 1.5px;
    border-style: solid;
    border-color: rgb(255 255 255 / 10%);
    display: flex;
    min-height: 75px;
    margin-inline: auto;
    margin-top: 0px;
    padding-bottom: 8px;
    right: 12px;
    padding-top: 8px;
    top: 12px;
    width: calc(100vw - 6%);
    align-items: center;
    justify-content: ${({ align }) => align ? align : 'space-between'};
    font-size: 16px;
`;
const MenuList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 380px;
        a {
            color: rgba(var(--text-color), 0.5);
            font-size: 1.7rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            &:hover {
                color: rgba(var(--text-color), 0.8);
            }
        }
@media (max-width: 920px) {
    position: fixed;
    inset:-16px;
    right: auto;
    width: 25rem;
    max-width:calc(100% - 60px);
    height: calc(100vh + 60px);
    background-color: rgba(0,0,0,0.8);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
    
}
`;
const AuthButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
    `;
const NavToggle = styled(Button)`
height: 40px;
padding: 0.75rem;
display: flex;
align-items: center;
justify-content: center;
border: none;
color: rgba(var(--text-rgb), 0.5);
cursor: pointer;
svg{
    width: 24px;
    height: 24px;
}
@media (min-width: 920px) {
    display: none;
}

`


const ErrorWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 100px;
    width: 100%;
    height: 100vh;

    img{
        max-width: 480px;
    }
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        text-align: right;
        padding: 1rem;
        h2{
            font-size: 10rem;
            font-weight: 600;
            color: rgba(var(--text-rgb),0.8);
        }
        h3{
            font-size: 3rem;
            font-weight: 600;
            color: rgba(var(--text-rgb), 0.7);
        }
        p{
            font-size: 1.7rem;
            font-weight: 600;
            color: rgba(var(--text-rgb), 0.5);
        }
        a{
            font-size: 1.7rem;
        }
        @media (max-width: 768px) {
            text-align: center;
            h2{
                font-size: 8rem;
            }
            h3{
                font-size: 2.5rem;
            }
            p{
                font-size: 1.5rem;
            }

    }
`;


export default function Page() {
    const [open, setOpen] = useState(false);

    const { data: session } = useSession()

    return (
        <>
            <Head>
                <title>404 - K K UPGRADER</title>
            </Head>
            <NavBarWrapper>
                <Link href="/">
                    <Image src="/textLogo.svg" alt="K K UPGRADER" width={120} height={100} />
                </Link>
                <MenuList open={open}>
                    <Link href="/">Home</Link>
                    <Link href="/tools">Tools</Link>
                    <Link href="/about">About</Link>
                    <Link href="/pricing">Pricing</Link>
                </MenuList>
                <AuthButtonWrapper>
                    {session ? <Button as={Link} href="/dashboard">Go to Dashboard</Button> :
                        <>
                            <Button level="true" as={Link} href="/login">Log In</Button>
                            <Button as={Link} href="/signup">Sign Up</Button>
                        </>}
                    <NavToggle onClick={() => setOpen(!open)} level="true">
                        <HiBars3 />
                    </NavToggle>
                </AuthButtonWrapper>
            </NavBarWrapper>
            <ErrorWrapper>
                <Image src="/404.svg" alt="404" width={500} height={500} />
                <div>
                    <h2> 404 </h2>
                    <h3>Ooops!</h3>
                    <h3>Page Not Found</h3>
                    <p >This page doesn't exist or was removed!<br />
                        We suggest you back to home </p>
                    <Button level="true" size="lg" as={Link} href="/">Back to Home</Button>

                </div>
            </ErrorWrapper>

        </>)
}