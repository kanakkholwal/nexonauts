
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
    console.log(session)
    if (session) return redirect("/dashboard")

    return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center" style={{
            backgroundColor: "#8EC5FC",
            backgroundImage: ' linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',

        }}>


            <div className='rounded-3xl bg-slate-100 flex justify-around items-center shadow-lg ' data-aos="fade-left">

                <div className='w-full lg:w-[540px]'>
                    <div className='py-8 px-8'>
                        <div className='text-center'>
                            <Link href='/' className="text-center">
                                <Image className="h-10 mx-auto" src="/logo.svg" alt="Nexonauts.png" width={200} height={40} priority />
                            </Link>
                            <h2 className='font-bold text-xl mt-5'>
                                Forgot Password
                            </h2>
                            <p className='text-base text-slate-600 mb-8'>
                                Enter your email to reset your password
                            </p>
                            <UserAuthForm data-aos="fade-up" />
                        </div>


                    </div>
                </div>
            </div>

        </main>
    )
}
