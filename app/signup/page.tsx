
import { authOptions } from "app/api/auth/[...nextauth]/options";
import Navbar from "app/navbar";
import illustration from "assets/images/login-illustration.webp";
import Footer from 'layouts/common/footer';
import Hero from 'layouts/common/hero';
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Image from 'next/image';
import { redirect } from "next/navigation";
import { UserAuthForm } from './register-form';


export const metadata: Metadata = {
    title: "Signup | " + process.env.NEXT_PUBLIC_APP_NAME || "NexoNauts",
    description: "Register for an account on " + process.env.NEXT_PUBLIC_APP_NAME,
    keywords: "register, account, " + process.env.NEXT_PUBLIC_APP_NAME,
}


export default async function Page() {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (session) return redirect("/dashboard")

    return (
        <>


            <header>
                <Navbar />

                </header>
            <Hero
                title="Get Started with your account"
                path={[{ name: "SignUp", path: "/signup" }]}
            />
            <section className='pt-17 pb-17 lg:pb-22 xl:pb-27 my-8'>
                <div className='max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0'>
                    <div className='rounded-3xl bg-violet-100 flex justify-around items-center shadow-lg ' data-aos="fade-in-up">
                        <div className='hidden lg:block w-full lg:w-1/2'>
                            <div className="relative py-20 pl-17 pr-22">
                                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
                                {/* <h2 className="max-w-[292px] font-bold text-white text-heading-4 mb-10">Unlock the Power of Writing Tool</h2> */}
                                <div className="relative aspect-[61/50] max-w-[427px] mx-auto w-full flex items-center justify-center">
                                    <Image src={illustration} width={600} height={600} alt="Dashboard Illustration" priority={true} />

                                </div>
                            </div>

                        </div>
                        <div className='w-full lg:w-[540px]'>
                            <div className='py-8 sm:py-20 pl-8 sm:pl-21 pr-8 sm:pr-20'>
                                <div className='text-center'>
                                    <h2 className='font-bold text-4xl mb-4'>
                                        Get Started
                                    </h2>
                                    <p className='text-md text-slate-600 mb-10'>
                                        Sign up to your account to access your dashboard
                                    </p>
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
