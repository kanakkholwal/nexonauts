import Footer from 'layouts/common/footer';
import Header from 'layouts/common/header';
import Hero from 'layouts/common/hero';

import { getSession, signIn } from "next-auth/react";

import Aos from 'aos';
import illustration from "assets/images/login-illustration.webp";
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button";
import { BiLockOpenAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import { LuMail } from "react-icons/lu";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import * as z from "zod";
const FormSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email format' })
        .min(5, { message: 'Email must be at least 5 characters long' })
        .max(100, { message: 'Email cannot exceed 100 characters' }),

    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(50, { message: 'Password cannot exceed 50 characters' })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
            {
                message:
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            }
        ),
});


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);

        setIsLoading(true)

        toast.promise(signInPromise(data), {
            loading: 'Logging in...',
            success: (data) => {
                console.log(data);
                setIsLoading(false)
                return `Logged in successfully`
            },
            error: (err) => {
                console.log(err);
                setIsLoading(false)
                return err.message || "An error occurred while logging in"
            }
        })

    }
    const signInPromise = async (data: {
        email: string,
        password: string
    }) => new Promise(async (resolve, reject) => {
        try {
            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            }).then((data) => {
                console.log(data);
                if (data && data.ok === false) {
                    reject(data.error);
                    return;
                }
                else if (data && data.ok === true) {
                    resolve(data);
                    router.push(("/dashboard"));
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





    return (
        <div className={cn("grid gap-6 lg:max-w-lg", className)} {...props}>
            <div className='flex flex-wrap gap-2 justify-center items-center'>
                <Button variant="ghost" type="button" disabled={isLoading}
                    onClick={async () => {
                        setIsLoading(true);
                        await signIn('google', { callbackUrl: "/dashboard" })
                        setIsLoading(false);

                    }}            >
                    {isLoading ? (
                        <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <FcGoogle className="mr-2 h-4 w-4" />
                    )}{" "}Login with Google
                </Button>
                <Button variant="dark" type="button" disabled={isLoading}
                    onClick={async () => {
                        setIsLoading(true);
                        await signIn('github', { callbackUrl: "/dashboard" })
                        setIsLoading(false);

                    }}            >
                    {isLoading ? (
                        <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <FiGithub className="mr-2 h-4 w-4" />
                    )}{" "}
                    Login with Github
                </Button>
                <span className="relative block font-medium text-sm text-center my-7">
                    <span className="block absolute left-0 top-1/2 h-[1px] w-22.5 bg-grey-800"></span>
                    <span className="block absolute right-0 top-1/2 h-[1px] w-22.5 bg-grey-800"></span>
                    Or sign in with email
                </span>
            </div>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                    <LuMail className='w-4 h-4' />
                                </FormLabel>
                                <FormControl className='relative'>
                                    <Input
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        className='pl-12 !py-6 pr-5 !mt-0'
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                    <BiLockOpenAlt className='w-4 h-4' />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        id="password"
                                        placeholder="*********"
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="password"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        className='pl-12 !py-6 pr-5 !mt-0'

                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <Button disabled={isLoading} type="submit" className="mt-4" size="lg">
                        {isLoading && (
                            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In with Email
                    </Button>
                </form>
            </Form>


        </div>
    )
}


export default function Page() {

    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    }, [])
    return (
        <>
            <NextSeo
                title={`Login | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`}
                description="Login to your account to access your dashboard"

            />

            <Header />
            <Hero
                title="Login to your account"
                path={[{ name: "Login", path: "/login" }]}
            />
            <section className='pt-17 pb-17 lg:pb-22 xl:pb-27 my-8'>
                <div className='max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0'>
                    <div className='rounded-3xl bg-violet-100 flex shadow-lg ' data-aos="fade-in-up">
                        <div className='hidden lg:block w-full lg:w-1/2'>
                            <div className="relative py-20 pl-17 pr-22">
                                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
                                {/* <h2 className="max-w-[292px] font-bold text-white text-heading-4 mb-10">Unlock the Power of Writing Tool</h2> */}
                                <div className="relative aspect-[61/50] max-w-[427px] mx-auto w-full flex items-center justify-center">
                                    <Image src={illustration} width={600} height={600} alt="Dashboard Illustration" priority={true} />

                                </div>
                            </div>

                        </div>
                        <div className='w-full lg:w-1/2'>
                            <div className='py-8 sm:py-20 pl-8 sm:pl-21 pr-8 sm:pr-20'>
                                <div className='text-center'>
                                    <h2 className='font-bold text-4xl mb-4'>Welcome back!</h2>
                                    <p className='text-md text-slate-600 mb-10'>Login to your account to access your dashboard</p>
                                <UserAuthForm />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
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
