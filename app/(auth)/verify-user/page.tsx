
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Image from 'next/image';
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserAuthForm } from './verify-form';


export const metadata: Metadata = {
    title: "Signin | NexoNauts",
    description: "Login to an account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "register, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}


export default async function Page() {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (session) return redirect("/dashboard")

    return (
        <>

                        <div className='text-center'>
                            <Link href='/' className="text-center">
                                <Image className="h-10 mx-auto" src="/assets/logo.svg" alt="Nexonauts.png" width={200} height={40} priority />
                            </Link>

                            <UserAuthForm data-aos="fade-up" />
                        </div>



        </>
    )
}
