
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Image from 'next/image';
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserAuthForm } from './forgot-form';


export const metadata: Metadata = {
    title: "Signin | NexoNauts",
    description: "Login to an account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "register, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}


export default async function Page() {
    const session = await getServerSession(authOptions);
    if (session) return redirect("/dashboard");

    return (
        <div className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-2xl z-20 border border-border dark:border-slate-700/70 rounded-xl prose dark:prose-invert py-4 px-6 w-full max-w-2xl flex flex-col justify-center items-center">

                <Link href='/' className="text-center">
                    <Image className="h-10 mx-auto dark:invert" src="/assets/logo.svg" alt="Nexonauts.png" width={200} height={40} priority />
                </Link>
                <h2 className="mt-0">
                    Forgot Password
                </h2>
                <p>
                    Enter your email to reset your password
                </p>
                <UserAuthForm  className="flex-auto w-full" key={"form"}/>

        </div>
    )
}
