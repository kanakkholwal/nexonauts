import styled from "styled-components";
import Image from 'next/image';
import Link from "next/link";
import Button,{ResponsiveButton} from "components/buttons";
import Head from "next/head";
import { HiBars3 } from "react-icons/hi2";
import { RxDashboard } from "react-icons/rx";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { NavBarWrapper, MenuList, AuthButtonWrapper, NavToggle } from "components/navbar";
import Footer from "components/footer";
import { registerView } from "lib/analytics";
import { useEffect } from "react";




const ErrorWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 200px;
    width: 100%;
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
            color: rgba(var(--text-rgb),0.8);
        }
        h3{
            color: rgba(var(--text-rgb), 0.7);
        }
        p{
            color: rgba(var(--text-rgb), 0.5);
        }
    }   
`;



export default function Page() {
    const [open, setOpen] = useState(false);

    const { data: session } = useSession()
    useEffect(() =>{
        registerView({ title: "Not Found", type: "404", slug: "/404" })
    },[])
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
                {session ? <ResponsiveButton level="true" size="sm" as={Link} href="/dashboard" icon={<RxDashboard/>}>Go to Dashboard</ResponsiveButton> :
                        <>
                            <Button level="true" size="sm" as={Link} href="/login">Log In</Button>
                            <Button as={Link} size="sm" href="/signup">Sign Up</Button>
                        </>}
                    <NavToggle onClick={() => setOpen(!open)} level="true">
                        <HiBars3 />
                    </NavToggle>
                </AuthButtonWrapper>
            </NavBarWrapper>
            <ErrorWrapper>
                <Image src="/404.svg" alt="404" width={500} height={500} />
                <div>
                    <h1> 404 </h1>
                    <h4>Oops!</h4>
                    <h4>Page Not Found</h4>
                    <p >This page doesn't exist or was removed!<br />
                        We suggest you back to home </p>
                    <Button  as={Link} href="/">Back to Home</Button>
                </div>
            </ErrorWrapper>
            <Footer only="true" />
        </>)
}