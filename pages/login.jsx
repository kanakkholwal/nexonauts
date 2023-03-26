import { useRef } from "react";
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';

import Head from "next/head";
import Image from "next/image";
// Components 
// import Login from "@backend/components/LoginCard";
import classes from "@backend/styles/_Login.module.scss";
import LocalImage from "components/LocalImage";
import Input from "components/form-elements/Input";
import PasswordInput from "components/form-elements/PasswordInput";
import Button from "components/buttons";
import { FormElement, Label } from "components/form-elements";
import styled from "styled-components";
import illustration from "assets/images/login-illustration.webp";

const PageWrapper = styled.div`
display: flex;
align-items: stretch;
justify-content: center;
width: 100%;
height: 100vh;

@media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

`;
const Illustration = styled.div`
display: flex;
justify-content: center;
width: 100%;
height: 100%;
background-color: rgba(var(--theme-rgb), 0.1);
@media (max-width: 768px) {
    display: none;
}
position: relative;
h2{
    margin-top: 100px;
}
img {
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    object-fit: cover;
    object-position: center;
    z-index: -1;
}
`;
const FormWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;
height: 100%;
padding: 2rem 1.5rem;
gap: 1rem;
text-align: left;
`;
const Form = styled.form`
display: flex;
flex-direction: column;
align-items: flex-start;
width: clamp(300px, 100%, 400px);
gap: 1rem;
${FormElement} {
    width: 100%;
}
${Button} {
    width: 75%;
    max-width: 240px;
    text-align: center;
    margin-inline: auto;
}
`;

export const metadata = {
    title: "Login",
    description: "Login to your account",
    keywords: "Login, Account, Dashboard",
    // image: "/assets/images/illustration_dashboard.webp",
    url: "/login"
}
async function createUser(email, password) {
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name: "Kanak", role: "admin" }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
}
export default function Login({ }) {
    const { status } = useSession();
    const router = useRouter();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    if (status === "loading") {
        return "Loading...";
    }

    if (status === "authenticated") {
        router.push('/dashboard');
    }






    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        // optional: Add validation here

        await signIn('credentials', {
            redirect: '/dashboard',
            email: enteredEmail,
            password: enteredPassword,
        }).then((data) => console.log(data))
            .catch((error) => console.log(error));


        // await createUser(enteredEmail, enteredPassword).then((data) => console.log(data))
        //     .catch((error) => console.log(error));


    }
    return (


        <PageWrapper>
            <Illustration>
                <h2>Hi,Welcome Back</h2>
                <Image src={illustration} width="600" height="600" alt="Dashboard Illustration" />

            </Illustration>
            <FormWrapper>

                <Form onSubmit={submitHandler}>
                    <h2>Welcome back !!</h2>
                    <p>Sign in to your account to continue</p>
                    <FormElement>
                        <Input type="email" placeholder="Enter your Email" outlined
                            id="email" required ref={emailInputRef} />
                        <Label>Enter Your Email</Label>
                    </FormElement>
                    <FormElement>
                        <PasswordInput placeholder="Enter your Password" outlined v
                            id="password" required
                            inputRef={passwordInputRef} />

                        <Label>Enter Your Password</Label>
                    </FormElement>
                    {/* <div className="d-flex justify-content-center align-items-center"> */}
                    <Button type="submit" onClick={submitHandler} >Login </Button>
                    {/* </div> */}

                </Form>


            </FormWrapper>


        </PageWrapper >
    )
}

