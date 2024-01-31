"use client";

import { useState } from 'react';

import { Button } from "@/components/ui/button";

import { cn } from '@/lib/utils';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter();
    const token = useSearchParams()?.get('token') ?? null;
    const verify = async () => {
        await axios.get(`/api/auth/verify?token=${token}`)
            .then((response) => {
                console.log(response.data.message);
                // Handle successful verification
                router.push(response.data.callbackUrl);
            })
            .catch((error) => {
                console.log(error.response.data.message);
                // Handle verification error
            })
    }
    useEffect(() => {
        if (token) {
            verify()
        }
        else {
            router.push('/signup');
        }
    }, [token]);




    return (<>
        <h2 className='font-bold text-xl mt-5'>
            {isLoading ? 'Verifying' : 'Verify Email'}
        </h2>
        <p className='text-base text-slate-600 mb-8'>
            {isLoading ? 'Please wait while we verify your email' : 'Please wait while we verify your email'}
        </p>

        <div className={cn("grid gap-6 lg:max-w-lg text-left", className)} {...props}>

            <div className="flex justify-center items-center w-full">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="h-20 w-20" fill="none"><style dangerouslySetInnerHTML={{ __html: "@keyframes loader3{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}" }} /><path fill="#0A0A30" d="M6.685 13.626a1.626 1.626 0 100-3.252 1.626 1.626 0 000 3.252zm5.315 0a1.626 1.626 0 100-3.252 1.626 1.626 0 000 3.252zm5.316 0a1.626 1.626 0 100-3.252 1.626 1.626 0 000 3.252z" style={{ animation: 'loader3 1s cubic-bezier(.63,-.71,.32,1.28) infinite both', transformOrigin: 'center center' }} /></svg>

            </div>

            {!isLoading && <Button disabled={isLoading} type="submit" className="mt-2 tracking-wide" size="lg">

                Go to Login
            </Button>}

        </div>
    </>)
}


