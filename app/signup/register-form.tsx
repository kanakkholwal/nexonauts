"use client";

import { Metadata } from "next";


import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { BiLockOpenAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
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
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "sonner";
import * as z from "zod";
export const metadata: Metadata = {
    title: "Signup | " + process.env.NEXT_PUBLIC_APP_NAME,
    description: "Register for an account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "register, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}
const FormSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(50, { message: 'Name cannot exceed 50 characters' }),
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
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' })
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

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);

        setIsLoading(true);
        if (data.password !== data.confirmPassword) {
            setIsLoading(false);
            toast.error('Passwords do not match');
            return;
        }

        toast.promise(signUpPromise(data), {
            loading: 'Signing up...',
            success: (data: any) => {
                console.log(data);
                setIsLoading(false)
                return data?.message || "Signed up successfully"
            },
            error: (err) => {
                console.log(err);
                setIsLoading(false)
                return err.message || "An error occurred while logging in"
            }
        })

    }
    const signUpPromise = async (data: {
        email: string,
        name: string,
        password: string
    }) => new Promise(async (resolve, reject) => {
        try {
            await axios.post('/api/auth/signup',
                {
                    email: data.email,
                    name: data.name,
                    password: data.password,
                }).then((response) => {
                    console.log(response);
                    if (response.data?.success) {
                        resolve(response.data)
                    }
                    else {
                        reject(response.data)
                    }
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                });

        }
        catch (error) {
            reject(error);
        }
    })





    return (
        <div className={cn("grid gap-6 lg:max-w-lg text-left", className)} {...props}>
            <div className='grid gap-2'>
                <Button variant="ghost" type="button" disabled={isLoading}
                    className='border-slate-200 shadow-sm border hover:border-primary/50 border-solid dark:bg-slate-800 dark:border-slate-700 dark:hover:border-primary/50 dark:hover:bg-slate-900 dark:text-slate-200'
                    data-aos="flip-down"
                    data-aos-delay="1100"
                    onClick={async () => {
                        setIsLoading(true);
                        await signIn('google', { callbackUrl: "/dashboard" })
                        setIsLoading(false);

                    }}            >
                    {isLoading ? (
                        <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <FcGoogle className="mr-2 h-4 w-4" />
                    )}{" "}Sign Up with Google
                </Button>
                <Button variant="dark" type="button" disabled={isLoading}  data-aos="flip-up" data-aos-delay="1100"
                className="border-slate-200 shadow-sm border hover:border-primary/50 border-solid dark:bg-slate-800 dark:border-slate-700 dark:hover:border-primary/50 dark:hover:bg-slate-900 dark:text-slate-200"
                    onClick={async () => {
                        setIsLoading(true);
                        await signIn('github', { callbackUrl: "/dashboard" })
                        setIsLoading(false);
                    }}   >
                    {isLoading ? (
                        <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <FiGithub className="mr-2 h-4 w-4" />
                    )}{" "}
                    Sign Up with Github
                </Button>
                <p className="or my-5">
                    Or sign up with email
                </p>
            </div>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
                    <div className="flex flex-col lg:flex-row w-full justify-between gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <div className='relative group'>
                                        <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                            <GoPerson className='w-4 h-4' />
                                        </FormLabel>
                                        <FormControl className='relative'>
                                            <Input
                                                id="name"
                                                placeholder="Enter your name"
                                                type="text"
                                                autoCapitalize="none"
                                                autoComplete="name"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                className='pl-12 !py-6 pr-5 !mt-0  group-focus-within:ring-2 ring-primary'
                                                {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className='relative group'>

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
                                                className='pl-12 !py-6 pr-5 !mt-0  group-focus-within:ring-2 ring-primary'
                                                {...field} />
                                        </FormControl>

                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className='relative group'>

                                    <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                        <BiLockOpenAlt className='w-4 h-4' />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            placeholder="Enter your password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoComplete="password"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            className='pl-12 !py-6 pr-5 !mt-0 group-focus-within:ring-2 ring-primary'

                                            {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <div className='relative group'>

                                    <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                        <BiLockOpenAlt className='w-4 h-4' />
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="confirmPassword"
                                            placeholder="Confirm your password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoComplete="password"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            className='pl-12 !py-6 pr-5 !mt-0 group-focus-within:ring-2 ring-primary'

                                            {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={isLoading} type="submit" className="mt-2 tracking-wide" size="lg">
                        {isLoading && (
                            <AiOutlineLoading className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign Up with Email
                    </Button>
                    <p className='text-left text-sm font-medium text-slate-500 dark:text-slate-300'>
                        Already have an account? <Link href="/login" className='text-primary underline'>Sign in</Link>
                    </p>
                </form>
            </Form>


        </div>
    )
}
