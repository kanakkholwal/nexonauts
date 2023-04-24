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
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-top: 200px;
    width: 100%;
    max-width: var(--max-width);
    margin-inline: auto;
    padding: 1rem;
    background:var(--card-bg);
    h1{
        text-align:center;
    }

`;



export default function Page() {
    const [open, setOpen] = useState(false);

    const { data: session } = useSession()

    return (
        <>
            <Head>
                <title>Privacy Policy - K K UPGRADER</title>
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
                <h1>Privacy Policy for K K UPGRADER</h1>
                <section>
                    <p>At K K UPGRADER,we understand the importance of protecting your privacy and personal information. This privacy policy explains the type of information we collect,how we use it,and how we protect it.</p>
                    <h2>Information We Collect</h2>
                    <p>We collect personal information that is necessary for us to provide our services to you. This includes the information you provide when you contact us,register for an account,and use our services. We may ask for your name,email address,phone number,company name,address,and other contact information.</p>
                    <p>We may also collect information about how you use our website and services,including your IP address,browser type,internet service provider,date and time stamp,referring/exit pages,and the number of clicks. We use this information to analyze trends,administer the site,track user movements,and gather demographic information.</p>
                    <h2>How We Use Your Information</h2>
                    <p>We use the information we collect to provide,operate,and maintain our website,improve and personalize your experience,develop new products and services,and communicate with you directly or through our partners. We may also use your information for customer service,fraud prevention,and marketing purposes.</p>
                    <h2>Log Files</h2>
                    <p>We use log files to track the use of our website. These files include information such as your IP address,browser type,internet service provider,date and time stamp,referring/exit pages,and the number of clicks. This information is used to analyze trends,administer the site,track user movements,and gather demographic information. This information is not linked to any personally identifiable information.</p>
                    <h2>Cookies and Web Beacons</h2>
                    <p>Like most websites,K K UPGRADER uses cookies to store information about your preferences and the pages you visit on our website. Cookies are small data files that are stored on your device. We use cookies to personalize your experience and optimize our website's performance.</p>
                    <h2>Our Advertising Partners</h2>
                    <p>We work with third-party advertising partners,including Google,to serve ads to our site visitors. These partners may use cookies and web beacons to collect information about your browsing behavior on our website and other sites. This information is used to personalize advertising content and measure the effectiveness of advertising campaigns.</p>
                    <h2>Third-Party Privacy Policies</h2>
                    <p>Our privacy policy does not apply to third-party advertisers or websites. We advise you to consult the privacy policies of these third-party ad servers for more information about their practices and instructions on how to opt-out of certain options.</p>
                    <h2>CCPA Privacy Rights</h2>
                    <p>Under the California Consumer Privacy Act(CCPA),California consumers have the right to request that a business that collects their personal data disclose the categories and specific pieces of personal data that the business has collected about them. They also have the right to request that the business delete any personal data about them that it has collected and to opt-out of the sale of their personal data.</p>
                    <h2>GDPR Data Protection Rights</h2>
                    <p>Under the General Data Protection Regulation(GDPR),users have the right to access their personal data and request that it be corrected or erased. We take data protection seriously and will make every effort to respond to these requests in a timely and efficient manner.</p>
                    <h2>Data Security</h2>
                    <p>We take the security of your personal information seriously and use industry-standard practices to protect it from unauthorized access,disclosure,alteration,or destruction.</p>
                    <h2>Updates to This Policy</h2>
                    <p>We reserve the right to update this policy at any time. We encourage you to review this policy periodically to stay informed about how we collect,use,and protect your personal information.</p>
                    <h2>Contact Us</h2>
                    <p>If you have any questions or concerns about our privacy policy,please contact us at support@kkupgrader.eu.org.</p>
                </section>


            </PageWrapper>
            <Footer only="true" />
        </>
    )
}