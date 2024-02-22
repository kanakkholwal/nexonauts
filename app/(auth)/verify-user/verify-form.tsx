"use client";

import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import axios from 'axios';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgSpinner } from "react-icons/cg";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import verifyPng from "./verified.png";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const router = useRouter();
    const token = useSearchParams()?.get('token') ?? null;
    const verify = async () => {
        await axios.get(`/api/auth/verify?token=${token}`)
            .then((response) => {
                console.log(response.data.message);
                // Handle successful verification
                router.push(response.data.callbackUrl);
                setSuccess(response.data.message)
            })
            .catch((error) => {
                console.log(error.response.data)
                setError(error.response.data.message);
                // Handle verification error
            }).finally(() => {
                setIsLoading(false);
            })
    }
    useEffect(() => {
        if (token && token?.trim() !== '') {
            verify()
        }
        else {
            router.push('/signup');
        }
    }, [token]);




    return (<>
        <header className="mb-2xl text-center mt-10 p-4 space-y-2">
            <h1 className="text-[32px] font-extrabold leading-heading tracking-[-1px] lg:text-4xl lg:tracking-[-2px] mb-md">
                {isLoading ? 'Verifying' : 'Verify Email'}

            </h1>
            <p className="text-concrete text-xl">
                {isLoading ? 'Please wait while we verify your email' : 'Please wait while we verify your email'}
            </p>
        </header>
        <main className="flex flex-col items-center justify-center w-full p-4 space-y-4">


            <div className={cn("grid gap-6 lg:max-w-lg text-left mb-5", className)} {...props}>

                <div className="flex justify-center items-center w-full">
                    {isLoading && <CgSpinner className="animate-spin h-24 w-24 text-primary" />}
                    {error && <MdOutlineReportGmailerrorred className="h-24 w-24 text-red-500" />}
                    {success && <Image src={verifyPng} height={320} width={320} alt="Verify Email" className="w-80 h-80" />}
                </div>
                <Button disabled={isLoading} type="submit" className="mt-2 tracking-wide" size="lg" onClick={() => {
                    router.push('/login')
                }}>
                    Go to Login
                </Button>

            </div>
        </main>

    </>)
}


