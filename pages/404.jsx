import styled from "styled-components";
import Image from 'next/image';
import Link from "next/link";
import Button from "components/buttons";
import Head from "next/head";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { NavBarWrapper, MenuList, AuthButtonWrapper, NavToggle } from "components/navbar";
import Footer from "components/footer";




const ErrorWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 200px;
    width: 100%;
    // height: 100vh;
    max-width: var(--max-width);
    margin-inline: auto;

    &>*{
        flex: auto;
    }
    img{
        max-width: 480px;
        filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.2));
    }
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        text-align: right;
        padding: 1rem;
        width: 100%;
        max-width: 480px;
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
                    <h3>Oops!</h3>
                    <h3>Page Not Found</h3>
                    <p >This page doesn't exist or was removed!<br />
                        We suggest you back to home </p>
                    <Button size="lg" as={Link} href="/">Back to Home</Button>
                </div>
            </ErrorWrapper>
            <Footer only="true" />
        </>)
}