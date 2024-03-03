"use client";

import { ArrowUpRight } from 'lucide-react';
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function GoToBtn() {
    const { data: session } = useSession();
    const isSignedIn = !!session?.user;

    
    return <Link

        className="relative ml-auto hidden md:flex  h-9 items-center justify-center before:absolute before:inset-0 before:rounded-full  before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-primaryLight sm:px-4 before:border before:border-gray-200 before:bg-primary/10 dark:before:bg-gray-800"
        href={isSignedIn ? "/feed" : "/login?ref=navbar-button"}>
        <span className="relative text-sm font-semibold  text-primary dark:text-white">
            {isSignedIn ? <>
            Go to Feed <ArrowUpRight className="inline-block ml-1 w-5 h-5" />
            </> : "Sign In"}
        </span>
        
    </Link>
}