import { useSession } from "next-auth/react";
import { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Image from 'next/image';
import Link from "next/link";
import Button from "components/buttons";

import { HiBars3 } from "react-icons/hi2";
import { NavBarWrapper, MenuList, AuthButtonWrapper, NavToggle } from "components/navbar";
import { Footer } from "components/footer";
import { FormAlert, FormGroup, FormElement, Input, Label, TextArea, Select } from "components/form-elements";


const ContactWrapper = styled.div`
width: 100%;
max-width: var(--max-width);
margin-inline: auto;
margin-top: 125px;
display: flex;
align-items: stretch;
justify-content: center;
padding: 1rem;
h2{
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 1rem;
}
h3{
    font-size: 1.7rem;
    font-weight: 600;
    color: rgba(var(--text-rgb), 0.7);
    margin-bottom: 1rem;
}

&>*{
    flex: auto;
}
img{
    width: 100%;
    margin-bottom: 1rem;
    max-width: 540px;
    filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.2));
}
&>div:has(>img){
    text-align: left;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 640px;
}
`;

export default function Contact() {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        selectedOption: null,


    });
    const { data: session, status } = useSession();

    const handleChange = (selectedOption) => {
        setState({ selectedOption: selectedOption.value });
    }
    return (
        <>
            <Head>
                <title>Contact Us</title>
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
            <ContactWrapper>
                <div>
                    <h2>Let's talk</h2>

                    <h3>Love to hear from you,
                        Get in touch</h3>
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" name="name" placeholder="John Doe" />
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" placeholder="user@example.com" />
                        </FormElement>
                    </FormGroup>
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="company_name">Company Name</Label>
                            <Input type="text" id="company_name" name="company_name" placeholder="Fancy Army" />
                        </FormElement>
                        <FormElement>
                            <Label htmlFor="Phone">Phone</Label>
                            <Input type="tel" id="Phone" name="Phone" placeholder="888 888 888 8" />
                        </FormElement>
                    </FormGroup>
                    <FormGroup>
                        <FormElement>
                            <Label htmlFor="chat_about">What would you like to chat about?</Label>
                            <Select options={[
                                { value: "Select one", label: "Select one" },
                                { value: "Brand Strategy", label: "Brand Strategy" },
                                { value: "Marketing / Ads", label: "Marketing / Ads" },
                                { value: "Development", label: "Development" },
                                { value: "Design / UX&UI", label: "Design / UX&UI" },
                                { value: "Other", label: "Other" },
                            ]} onChange={handleChange} />
                        </FormElement>
                    </FormGroup>
                    <FormElement>
                        <Label htmlFor="message">Message</Label>
                        <TextArea id="message" name="message" placeholder="Enter your message"
                            cols={60}
                            rows={10}

                        />
                    </FormElement>
                    <FormElement>
                        <Button type="submit" size="lg" >Send Message</Button>
                    </FormElement>
                </div>
                <div>
                    <Image src="/contact.svg" alt="Contact Us" width={540} height={540} />
                </div>
            </ContactWrapper>

            <Footer />
        </>
    )
}