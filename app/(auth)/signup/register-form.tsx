"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
// import { FaApple } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { LuCheckCircle2 } from "react-icons/lu";
import { RiErrorWarningLine } from "react-icons/ri";

interface Props {
    validateEmail: (email: string) => Promise<boolean>,
    validateUsername: (username: string) => Promise<boolean>,
}
const INVALID_CHARACTERS = [" ", "-", "@", "#", "%", "^", "!", "~", "*", "(", ")", "=", "+", ".", ">", ",", "<", "?", `"`, `'`, "{", "}", "[", "]", "|", "$", ":", ";", "&"]

export function RegisterForm({ validateEmail, validateUsername }: Props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validity, setValidity] = useState({
        email: {
            loading: false,
            valid: false,
        },
        username: {
            loading: false,
            valid: false,
        },
        password: {
            loading: false,
            valid: false,
            errorMessage: ""
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [state, setState] = useState<"onboarding" | "registered">("onboarding");

    const signUp = async () => {

        return new Promise(async (resolve, reject) => {
            setLoading(true);
            try {
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        username,
                        password,
                    }),
                });
                const data = await res.json();
                if (res.ok) {
                    setState("registered");
                    resolve(data);
                } else {
                    setError(data.message);
                    reject(data);
                }
            } catch (err: any) {
                setError(err?.message ?? "Something went wrong");
                reject(err);
            } finally {
                setLoading(false);
            }
        })
    }

    return (<>
        {state === "onboarding" && <>
            <div className="grid w-full max-w-lg items-center gap-1.5">
                <Label htmlFor="name">Enter your Name</Label>

                <Input type="text" id="name" placeholder="e.g. John Doe"  value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid w-full max-w-lg items-center gap-1.5">
                <Label htmlFor="email">Enter your Email</Label>
                <div className="relative">
                    <Input type="email" id="email" placeholder="e.g. johndoe@gmail.com"

                        // 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        value={email} onChange={(e) => {
                            setEmail(e.target.value);
                            //  check with regex if email is valid
                            const regex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$", "i");
                            if (regex.test(e.target.value)) {
                                setValidity({ ...validity, email: { ...validity.email, loading: true } })
                                validateEmail(e.target.value)
                                    .then((valid: boolean) => {
                                        setValidity({ ...validity, email: { ...validity.email, loading: false, valid: valid } })
                                    }).catch((err) => {
                                        setValidity({ ...validity, email: { ...validity.email, loading: false, valid: false } })
                                    })
                            }
                        }}
                        className="pr-10" />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {validity.email.loading ? <CgSpinner className="animate-spin h-5 w-5" /> :
                            validity.email.valid ? <LuCheckCircle2 className="h-5 w-5 text-green-500" /> : validity.email.valid === false ? <RiErrorWarningLine className="h-5 w-5 text-red-500" /> : null}
                    </span>
                </div>
            </div>
            <div className="grid w-full max-w-lg items-center gap-1.5">
                <Label htmlFor="password">Enter your username</Label>
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-regular text-gray-500 dark:text-gray-500">
                        nexonauts.com/devs/
                    </span>
                    <Input type="text" id="username"
                        pattern="^[a-zA-Z0-9_]" 
                        value={username} onChange={(e) => {
                            // prevent invalid characters 

                            setUsername(e.target.value
                                .split('')
                                .filter(char => !INVALID_CHARACTERS.includes(char))
                                .join('').trim());
                            if (username.length > 3) {
                                validateUsername(username)
                                    .then((valid: boolean) => {
                                        setValidity({ ...validity, username: { ...validity.username, loading: false, valid: valid } })
                                    }).catch(() => {
                                        setValidity({ ...validity, username: { ...validity.username, loading: false, valid: false } })
                                    })
                            }


                        }}
                        placeholder="username" className="pl-[11.25rem] pr-10" />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {validity.username.loading ? <CgSpinner className="animate-spin h-5 w-5" /> :
                            validity.username.valid ? <LuCheckCircle2 className="h-5 w-5 text-green-500" /> : validity.username.valid === false ? <RiErrorWarningLine className="h-5 w-5 text-red-500" /> : null}

                    </span>
                </div>
            </div>
            <div className="grid w-full max-w-lg items-center gap-1.5">
                <Label htmlFor="password">Enter your password</Label>
                <div className="relative">
                    <Input
                        type={"text"} id="password" 
                        value={password} onChange={(e) => {
                            setPassword(e.target.value);
                            const { valid, message } = isStrongPassword(e.target.value);
                            setValidity({ ...validity, password: { loading: false, valid: valid, errorMessage: message } })

                        }}
                        placeholder="********" />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {validity.password.valid && <LuCheckCircle2 className="h-5 w-5 text-green-500" />}
                    </span>
                </div>
            {validity.password.valid === false && <p className="text-red-500 text-sm font-semibold text-left">{validity.password.errorMessage}</p>}
            </div>
            <div className="grid w-full max-w-lg items-center gap-1.5">
                <Button className="w-full rounded-full"

                    disabled={loading || (validity.password.valid === false || validity.email.valid === false || validity.username.valid === false)}
                    onClick={() => {
                        if (!isStrongPassword(password)) {
                            toast.error("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character")
                            return;
                        }

                        toast.promise(signUp(), {
                            loading: "Creating account...",
                            success: (data) => {
                                return <> Account created successfully!</>
                            },
                            error: (err) => {
                                return <>{err.message}</>
                            }
                        })

                    }}
                    size="lg">
                    {loading && <CgSpinner className="animate-spin mr-2 h-5 w-5" />}
                    Create a new Account
                </Button>
            </div>
            <div className="pt-lg  max-w-lg text-center">
                <p className="text-center my-4 capitalize text-sm text-concrete font-semibold">
                    OR SIGN UP WITH
                </p>
                <div className="w-full max-w-lg flex flex-col gap-3">
                    <Button variant="outline" size="lg" className="w-full rounded-full">
                        {loading ? <CgSpinner className="animate-spin mr-2 h-5 w-5" /> : <FcGoogle className="mr-2 h-6 w-6" />}

                        Sign up with Google
                    </Button>
                    {/* <Button className="rounded-full ease-linear duration-300 text-base font-medium text-slate-100 bg-slate-700 hover:bg-slate-800 shadow-lg" size="lg">
                <FaApple className="mr-2 h-6 w-6" />
                Sign up with Apple
              </Button> */}
                </div>
                <div className="flex justify-center mt-8">
                    <p className="text-concrete">Already have an account ?&nbsp;</p>
                    <Link className=" text-primary inline-flex hover:underline"
                        href="/login" data-testid="login_redirect">Log in</Link>
                </div>
                <p className="text-concrete text-xs lg:text-sm pt-8">By clicking <span className="font-semibold">Create account / Sign up</span>, you agree to {process.env.NEXT_PUBLIC_WEBSITE_NAME}'s {" "}
                    <Link className="!text-concrete text-primary inline-flex hover:underline"
                        href={process.env.NEXT_PUBLIC_WEBSITE_URL + "/tos"}>Terms</Link> {" "}
                    and confirm you have read our <Link className="!text-concrete text-primary inline-flex hover:underline"
                        href={process.env.NEXT_PUBLIC_WEBSITE_URL + "/privacy"}>Privacy Policy</Link>.
                    You may receive offers, news and updates from us.
                </p>
            </div>
        </>}
        {state === "registered" && <>
            <div className="grid w-full max-w-lg items-center gap-1.5">
                <div className="flex flex-col items-center justify-center">
                    <LuCheckCircle2 className="h-16 w-16 text-green-500" />
                    <h1 className="text-2xl font-semibold text-black">Account created successfully!</h1>
                    <p className="text-concrete text-sm">Please check your email to verify your account</p>
                </div>
            </div>
        </>}
    </>)
}
function isStrongPassword(password: string) {
    const minLength = 8;
    const minUppercase = 1;
    const minLowercase = 1;
    const minNumbers = 1;
    const minSpecialChars = 1;
    const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

    const uppercaseRegex = /[A-Z]/g;
    const lowercaseRegex = /[a-z]/g;
    const numbersRegex = /[0-9]/g;

    // Check minimum length
    if (password.length < minLength) {
        return {
            valid: false,
            message: `Password must contain at least ${minLength} characters`
        }
    }

    // Check for minimum uppercase letters
    if ((password.match(uppercaseRegex) || []).length < minUppercase) {
        return {
            valid: false,
            message: `Password must contain at least ${minUppercase} uppercase letter`
        }
    }

    // Check for minimum lowercase letters
    if ((password.match(lowercaseRegex) || []).length < minLowercase) {
        return {
            valid: false,
            message: `Password must contain at least ${minLowercase} lowercase letter`
        }
    }

    // Check for minimum numbers
    if ((password.match(numbersRegex) || []).length < minNumbers) {
        return {
            valid: false,
            message: `Password must contain at least ${minNumbers} number`
        }
    }

    // Check for minimum special characters
    if (!specialChars.test(password) || (password.match(specialChars) || []).length < minSpecialChars) {
        return {
            valid: false,
            message: `Password must contain at least ${minSpecialChars} special character`
        }
    }

    return {
        valid: true,
        message: "Password is strong"
    }
}
