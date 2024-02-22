import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Image from 'next/image';
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserAuthForm } from './verify-form';


export const metadata: Metadata = {
    title: "Verify Email | NexoNauts",
    description: "Login to an account on NexoNauts",
    keywords: "register, account, NexoNauts",
    publisher:"noindex, nofollow"
}


export default async function Page({ searchParams }: {
    searchParams: {
        token?: string
    };
}) {
    const session = await getServerSession(authOptions);
    if (session) return redirect("/dashboard");


    return (
        <>
   

                <UserAuthForm className="flex-auto w-full" key={"form"} />



        </>
    )
}
