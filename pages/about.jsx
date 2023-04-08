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




const PageWrapper = styled.div`
    margin-top: 200px;
    width: 100%;
    max-width: var(--max-width);
    margin-inline: auto;
    padding: 1rem;
    background:var(--card-bg);
    h1{
        text-align:center;
    }
    li{
        margin:1rem 0;
        margin-left: 3em;
        font-weight: 500;
        list-style:disc
    }

`;



export default function Page() {
    const [open, setOpen] = useState(false);

    const { data: session } = useSession()

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
                <h1>About Us</h1>

                <p>
                    Welcome to <strong>K K UPGRADER</strong>, a team of passionate individuals dedicated to making a difference in the world.</p>

                <section className="my-3">
                    <h3 className="mb-3">Our Mission</h3>

                    <section>
                        <h4>Empowering people through technology</h4>
                        <p>Our mission is to create innovative technology solutions that empower people to achieve their goals and improve their lives. We believe that technology has the power to transform the world and make it a better place for everyone.</p>
                    </section>
                    <section>
                        <h4>Building a better future</h4>
                        <p>We are committed to building a better future for ourselves, our customers, and the world. We strive to create products and services that not only meet the needs of today, but also anticipate the needs of tomorrow.</p>
                    </section>
                    <section>
                        <h4>Driving positive change</h4>
                        <p>We are dedicated to driving positive change in the world. We believe that businesses have a responsibility to use their resources and expertise to make a positive impact on society and the environment.</p>
                    </section>
                </section>
                <section className="my-3">

                    <h3>Our Core Beliefs and Values</h3>
                    <ul>
                        <li>
                            <h4>Integrity</h4>
                            <p>We believe in always doing the right thing, even when no one is watching.</p>
                        </li>
                        <li>
                            <h4>Innovation</h4>
                            <p>We embrace creativity and constantly strive to find new and better ways to solve problems.</p>
                        </li>
                        <li>
                            <h4>Care</h4>
                            <p>We are committed to treating everyone with kindness and respect, and to making a positive impact on the world around us.</p>
                        </li>
                        <li>
                            <h4>Growth</h4>
                            <p>We believe in continuously learning and developing our skills, both as individuals and as a company.</p>
                        </li>
                        <li>
                            <h4>Collaboration</h4>
                            <p>We value teamwork and believe that working together is the key to achieving great things.</p>
                        </li>
                    </ul>
                    and ,
                    we can create a positive impact in the world.

                </section>


                We're not just a company, we're a community of like-minded individuals who strive to make a difference in everything we do.

                Our team is made up of 1 individuals who bring unique skills and experiences to the table.
                We're passionate about what we do, and we're committed to making a positive impact in the world.

                But it's not just about the work we do, it's also about the people we work with. We value our relationships with our clients and partners, and we believe that communication and collaboration are key to success.

                We're always looking for new ways to innovate and improve, and we're not afraid to take risks.
                Whether it's <strong>
                    Creating User Friendly interface , components or Real-world Projects
                </strong>, we're always pushing the boundaries and striving for excellence.

                Thank you for taking the time to learn more about us.
                We look forward to working with you and making a positive impact in the world together.


            </PageWrapper>
            <Footer only="true" />
        </>
    )
}