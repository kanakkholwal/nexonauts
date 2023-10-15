import Aos from 'aos';
import Footer from 'layouts/common/footer';
import Header from 'layouts/common/header';
import Hero from 'layouts/common/hero';
import Head from "next/head";
import Image from 'next/image';
import Link from "next/link";
import { useEffect } from 'react';





export default function Page() {
    useEffect(() => {
        Aos.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    }, [])

    return (
        <>
            <Head>
                <title>
                    404 | {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                </title>
            </Head>
            <Header/>
            <Hero
                title="404"
                description="Page Not Found"
                path={[{ name: "Error Page", path: "/404" }]}
            />
            <div className="pt-17 lg:pt-22 xl:pt-27 pb-20 lg:pb-25 xl:pb-30 2xl:pb-[150px] max-w-[597px] mb-40">
                <div className=" mx-auto w-full max-w-[597px] text-center px-4 sm:px-8 lg:px-0" data-aos="fade-in-up">
                <div className="relative aspect-[191/143] max-w-[382px] mx-auto w-full flex justify-center items-center mb-12" data-aos="fade-in-up">

                <Image src="/assets/images/404.svg" alt="404" width={500} height={500} />
                </div>
                <h2 className="mb-5 text-2xl font-bold">
                    Oops! Page Not Found
                </h2>
                <p className="font-medium text-slate-600 mb-9">
                    The page you are looking for is not available or has been moved. Try a different page or go to homepage with the button below.
                    </p>
                <Link href="/" className="hero-button-gradient inline-flex rounded-lg py-3 px-7  font-medium ease-in duration-300 hover:opacity-80">
                    Back to Home
                </Link>
                    
                </div>
              
            </div>
            <Footer only="true" />
        </>)
}