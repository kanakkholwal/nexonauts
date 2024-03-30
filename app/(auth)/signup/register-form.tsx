"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRound } from 'lucide-react';
import Link from "next/link";
import { useState } from "react";
import { BiLockOpenAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { LuMail } from "react-icons/lu";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";
import { LuCheckCircle2 } from "react-icons/lu";
import toast from "react-hot-toast";
import { z } from "zod";


const formSchema = z.object({
    name: z.string().min(4, {
        message: 'Name must be at least 4 characters long'
    }),
    email: z.string().email(),
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
})


interface Props {
    registerUser: (data: {
        name: string,
        email: string,
        password: string
    }) => Promise<{
        success: boolean,
        message: string,
    }>,
}

export function RegisterForm({ registerUser }: Props) {
    const searchParams = useSearchParams() as URLSearchParams;
    const router = useRouter();
    const redirect = searchParams.get("redirect") ?? "/feed";
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
        setLoading(true);
        toast.promise(registerUser(data), {
            loading: 'Creating account...',
            success: (data: any) => {
                console.log(data);
                setState("registered");
                if (redirect) {
                    router.push(`/login?redirect=${redirect}`);
                    return `Account created successfully. Please check your email to verify your account`
                }
                router.push("/login");
                return `Account created successfully. Please check your email to verify your account`
            },
            error: (err) => {
                console.log(err);
                return err.message || "An error occurred while creating account"
            }
        });
        setLoading(false)

    }


    const [state, setState] = useState<"onboarding" | "registered">("onboarding");


    return (<>
        {state === "onboarding" && <>
            <div className="mb-2xl text-center mt-10 p-4 space-y-2">
                <h1 className="text-[32px] font-extrabold leading-heading tracking-[-1px] lg:text-4xl lg:tracking-[-2px] mb-md">
                    Create an account
                </h1>
                <p className="text-concrete text-xl">
                    Start your journey with {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                </p>
            </div>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-lg items-center gap-1.5">
                    <FormField
                        control={form.control}
                        name="name"

                        render={({ field }) => (
                            <FormItem>
                                <div className='relative group'>
                                    <FormLabel className='absolute top-1/2 -translate-y-1/2 left-4 z-50'>
                                        <UserRound className='w-4 h-4' />
                                    </FormLabel>
                                    <FormControl className='relative'>
                                        <Input
                                            placeholder="John Doe"
                                            type="text"
                                            autoCapitalize="none"
                                            autoComplete="name"
                                            disabled={loading}
                                            autoCorrect="off"
                                            className='pl-10 pr-5'
                                            {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )} />
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
                                            placeholder="johndoe@acme.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            disabled={loading}
                                            autoCorrect="off"
                                            className='pl-10 pr-5'
                                            {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                            placeholder="*********"
                                            type="password"
                                            autoCapitalize="none"
                                            autoComplete="password"
                                            autoCorrect="off"
                                            disabled={loading}
                                            className='pl-10 pr-5'
                                            {...field} />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        width={"full"}
                        disabled={loading}
                        className="mt-4"
                        onClick={async () => {
                            setLoading(true);
                            await form.handleSubmit(onSubmit)();
                            setLoading(false);
                        }}
                        type="submit">
                        {loading && <CgSpinner className="animate-spin mr-2" />}
                        {loading ? "Creating account..." : "Create a new Account"}
                    </Button>

                </form>
            </Form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 text-muted-foreground">
                        OR SIGN UP WITH
                    </span>
                </div>
            </div>
            <div className='grid w-full max-w-lg items-center gap-1.5'>
                <Button variant="light" type="button" disabled={loading} width={"full"}
                    onClick={async () => {
                        setLoading(true);
                        await signIn('google', { callbackUrl: redirect })
                        setLoading(false);

                    }}>
                    {loading ? (
                        <CgSpinner className=" animate-spin" />
                    ) : (
                        <FcGoogle />
                    )}
                    {loading ? "Signing in..." : "Sign in with Google"}
                </Button>
            </div>
            <div className="pt-lg  max-w-lg text-center">
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
                <Button width="full" className="mt-4" onClick={() => router.push("/login")}>
                    Login to your account
                </Button>
            </div>
        </>}
    </>)
}

