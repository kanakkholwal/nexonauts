import styled from "styled-components";
import Image from 'next/image';
import Link from "next/link";
import Button from "components/buttons";
import { Card, CardBody, CardHeader } from "components/Card";
import Head from "next/head";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { NavBarWrapper, MenuList, AuthButtonWrapper, NavToggle } from "components/navbar";
import Footer from "components/footer";
import { registerView } from "lib/analytics";
import { useEffect } from "react";




const PageWrapper = styled.div`
    margin-top: 200px;
    width: 100%;
    max-width: var(--max-width);
    margin-inline: auto;
    padding: 1rem;
    h1{
        text-align:center;
    }

`;



export default function Page() {
    const [open, setOpen] = useState(false);

    const { data: session } = useSession()
    useEffect(() =>{
        registerView({ title: "Pricing", type: "page", slug: "/pricing" })
    },[])
    return (
        <>
            <Head>
                <title>About - K K UPGRADER</title>
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
            <PageWrapper>
                <h1>
                    Our Pricing
                </h1>
                <div className="d-flex align-items-center justify-content-evenly g-3 flex-wrap">
                    <Card>
                        <CardHeader>
                            <h3>Free</h3>
                        </CardHeader>
                        <CardBody>

                            <ul>
                                <li>Up to 5 pro actions per day</li>
                                <li>Basic analytics</li>
                                <li>Email support</li>
                            </ul>
                            {session ? <Button as={Link} href="/dashboard">Go to Dashboard</Button> :
                                <Button as={Link} href="/signup">SignUp</Button>}

                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <h3>
                                Pro
                            </h3>
                        </CardHeader>
                        <CardBody>

                            <ul>
                                <li>Unlimited actions</li>
                                <li>Advanced analytics</li>
                                <li>Prioritized email support</li>
                                <li>API access</li>
                            </ul>
                            <div>
                                {
                                    session ? <Button as={Link} href="/pro/upgrade">Upgrade to Pro</Button> :
                                        <Button as={Link} href="/signup">Sign Up Now</Button>}

                            </div>
                        </CardBody>
                    </Card>

                </div>



            </PageWrapper>
            <Footer only="true" />
        </>
    )
}