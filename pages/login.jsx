import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useSession, signIn, getSession } from 'next-auth/react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
// Components 
import PasswordInput from "components/form-elements/PasswordInput";
import Button from "components/buttons";
import { IndeterminateLinearLoader } from "components/Loader";
import { FormElement, Label, FormAlert, Input } from "components/form-elements";
import styled from "styled-components";
import illustration from "assets/images/login-illustration.webp";
import { registerView } from "lib/analytics";
import toast, { Toaster } from "react-hot-toast";
import {FcGoogle} from "react-icons/fc";
import {FiGithub} from "react-icons/fi";

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
.h1{
    margin-top: 100px;
    font-weight:600;
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
background:var(--card-bg);
${FormElement}{
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
}

.forgot-password{
    display: block;
    font-size: 0.9rem;
    width: 100%;
    text-align: right;
    margin: 0.5rem 0;
    color: rgba(var(--theme-rgb), 0.75);
    &:hover{
        color: rgba(var(--theme-rgb), 1);
    }
}

.login{
  display: flex;
  width:100%;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  font-size: 1rem;
  font-weight: 500;
  border: none;
 border-radius: 0.75rem;
}
.or{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 0.5rem;
    margin: 1rem 0;
    color: rgba(var(--grey-rgb), 0.5);
    &:before, &:after{
        content: "";
        flex: 1;
        height: 1px;
        background: rgba(var(--grey-rgb), 0.2);
    }
}
.social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  flex-direction: column;
  button{
  display: flex;
  width:100%;
  justify-content: flex-start;
  padding: 0.75rem 1rem;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  gap: 1rem;
  flex-shrink: 0;
  border: none;
  color:inherit;
  border-radius: 0.75rem;
  &.google{
  background: #FFF;
  box-shadow: 0px 2.4054rem 4.4672rem 0px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(var(--grey-rgb), 0.2);
}
&.github {
  background: #000;
  color: #f6f6f6;      
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.1);
}
&.facebook {
  background: #1877F2;
  box-shadow: 0px 38.486881256103516px 71.47562408447266px 0px rgba(0, 0, 0, 0.07);
}

    }
}
.no-account{
    font-size: 0.9rem;
    font-weight: 500;
    margin-block: 1rem;
    text-align: center;
    display: block;
    a{
        color: var(--theme);
        text-decoration: none;
    }

}
`;


const Form = styled.form`
display: flex;
flex-direction: column;
align-items: flex-start;
width: clamp(300px, 100%, 400px);
${'' /* gap: 1rem; */}
${FormElement} {
    width: 100%;
}
${Button} {
    text-align: center;
    margin-inline: auto;
}
h2{
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}
p{
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
}
.forgot-pass{
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 1rem;
}
`;
const metadata = {
    title: "Login to your account",
    description: "Login to your account",
    keywords: "login, login page, login form, login to account, login to dashboard, login"
}
export default function Login({ }) {
    const { session, status } = useSession();
    const router = useRouter();
    const [state, setState] = useState({
        email: {
            value: "",
            error: false,
            errorMessage: ""
        },
        password: {
            value: "",
            error: false,
            errorMessage: ""
        },
        recaptcha: {
            verified: true,
            error: false,
            errorMessage: ""
        },
        formState: {
            state: "initial" || "error" || "success" || "loading",
            message: ""
        }
    });





    const isEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleCaptcha = async (value) => {


        await axios.post("/api/recaptcha", {
            token: value
        }).then((response) => {
            // console.log(response);
            setState({
                ...state,
                recaptcha: {
                    verified: response.data.verified,
                    error: !response.data.verified,
                    errorMessage: ""
                }
            })

        }).catch((error) => {
            console.log(error);
            setState({
                ...state,
                recaptcha: {
                    verified: false,
                    error: true,
                    errorMessage: error.message || "Something went wrong"
                }
            })
        })

    }


    async function submitHandler(event) {
        event.preventDefault();

        const enteredEmail = state.email.value;
        const enteredPassword = state.password.value;

        if (!isEmail(enteredEmail)) {

            toast.error("Please enter a valid email address");
            return;
        }
        if (state.recaptcha.verified === false) {
            toast.error("Please verify that you are not a robot");
            return;
        }






        const signInPromise = async() => new Promise(async (resolve, reject) => {
            try {
                signIn('credentials', {
                    callbackUrl: router.query.continue || "/dashboard",
                    email: enteredEmail,
                    password: enteredPassword,
                    redirect: false
                }).then((data) => {
                    console.log(data);
                    if (data.ok === false) {
                        reject(data.error);
                        return;
                    }
                    else if (data.ok === true) {
                        resolve(data);
                        router.push(router.query.continue || "/dashboard");
                        return;
                    }
                    resolve(data);
                })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    }
                    )
            }
            catch (error) {
                reject(error);
            }
        })


        toast.promise(signInPromise(), {
            loading: 'Logging in...',
            success: "Logged in successfully",
            error: (err) => {
                return err || "An error occurred while logging in";
            }
        })


    }

    useEffect(() => {
        if (session && status === "authenticated") {
            router.push(router.query.continue || "/dashboard");
        }
    }, [session, status])
    useEffect(() => {
        registerView({ title: "Login", type: "page", slug: "/login" })
    }, [])




    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="keywords" content={metadata.keywords} />
            </Head>

            <PageWrapper>
                <Illustration>
                    <Link href="/" className="h1">
                        {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                    </Link>
                    <Image src={illustration} width="600" height="600" alt="Dashboard Illustration" priority={true} />

                </Illustration>
                <FormWrapper>
                    <Form onSubmit={submitHandler}>
                        <h2 >Hi, Welcome back !!</h2>
                        <p>Sign in to your account to continue</p>
                        <FormElement>
                            <Input type="email" placeholder="Enter your Email" outlined value={state.email.value}
                                id="email" required onChange={(e) => {
                                    setState({
                                        ...state,
                                        email: {
                                            value: e.target.value,
                                            error: !isEmail(e.target.value),
                                            errorMessage: "Please enter a valid email"
                                        }
                                    })
                                }}
                                level={true}

                                className={state.email.error ? "isInvalid" : ""}
                            />
                            <Label htmlFor="email">Enter Your Email</Label>
                            {state.email.error && <FormAlert nature="danger">{state.email.errorMessage}</FormAlert>}
                        </FormElement>
                        <FormElement>
                            <PasswordInput placeholder="Enter your Password" outlined
                                id="password" required
                                value={state.password.value}
                                className={state.password.error ? "isInvalid" : ""}
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        password: {
                                            value: e.target.value,
                                            error: false,
                                            errorMessage: ""
                                        }
                                    })
                                }}
                                level={true}
                            />
                            {state.password.error && <FormAlert nature="danger">{state.password.errorMessage}</FormAlert>}
                            <Label htmlFor="password">Enter Your Password</Label>

                        </FormElement>

                        <FormElement align="center" className="m-0 g-0">
                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                onChange={handleCaptcha}
                                size="invisible"
                            />
                        </FormElement>
                        {state.formState.state === "error" && <FormAlert nature="danger">{state.formState.message}</FormAlert>}
                        {state.formState.state === "success" && <FormAlert nature="success">{state.formState.message}</FormAlert>}
                        {state.formState.state === "loading" && <IndeterminateLinearLoader />}
                        <p className="forgot-password"><Link href="/forgot-password" >Forgot Password? </Link></p>
                        <Button type="submit" onClick={submitHandler} className="login">Login </Button>
                        <p className="or">Or</p>
                        <div className="social">
                            <button onClick={() => signIn('google', { callbackUrl: router.query.continue || "/dashboard" })} className="google"><FcGoogle  size={18}/> Continue with Google </button>
                            {/* <button onClick={() => signIn('github', { callbackUrl: rou ter.query.continue || "/dashboard" })} className="github apple"> <FiGithub size={18}/> Continue with Github </button> */}

                        </div>

                        <p className="no-account">Don't have an account? <Link href="/signup">Sign Up</Link></p>
                    </Form>


                </FormWrapper>
            </PageWrapper>
            <Toaster
                position="bottom-center"

            />
        </>)
}

export async function getServerSideProps(context) {


    const session = await getSession(context);

    if (session)

        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }

    return {
        props: {

        },

    }


}
