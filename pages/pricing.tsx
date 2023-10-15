import Footer from 'layouts/common/footer';
import Header from 'layouts/common/header';
import Hero from 'layouts/common/hero';
import Head from "next/head";

import Aos from 'aos';
import { useEffect } from 'react';
import { BsStars } from "react-icons/bs";




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
                    Pricing | {process.env.NEXT_PUBLIC_WEBSITE_NAME}

                </title>
            </Head>
            <Header />
            <Hero
                title="Pricing"
                // description="Choose the plan that works for you."
                path={[{ name: "AI Apps", path: "/apps" }]}
            />
            <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
                <div className="text-center">
                    <span className="hero-subtitle-gradient hover:hero-subtitle-hover shadow-md mt-4 text-primary relative mb-5 font-medium text-sm inline-flex items-center gap-2 py-2 px-3 rounded-full">
                        <BsStars className="text-md" />
                        <span className="hero-subtitle-text">
                            Launch Your AI Toolkit
                        </span>
                    </span>
                    <h1 className=" mb-6 text-3xl font-extrabold sm:text-5xl xl:text-heading-1" data-aos="zoom-in-up">
                        Our Pricing Plan
                    </h1>
                    <p className="max-w-[500px] mx-auto mb-9 font-medium md:text-lg text-slate-600" data-aos="zoom-in-up" data-aos-delay={100}>
                        Nexo AI Toolkit is a collection of AI-powered apps that
                        help you to automate your daily tasks.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                    <div className="rounded-3xl bg-slate-100 shadow-xl relative z-20 overflow-hidden pt-12 pb-10 px-8 xl:px-10 pricing-item-border" data-aos="fade-in-up">
                        <h3 className="font-semibold text-heading-6 mb-5">Starter</h3>
                        <div className="flex items-center gap-3.5">
                            <h2 className="font-bold text-custom-1 pricing-gradient-text">$ 100</h2>
                            <p className="font-medium">/month <br />(billed annually)</p></div>

                        <hr className="my-10 w-full h-[1px] pricing-gradient-divider" />
                        <ul className="flex flex-col gap-4">
                            <li className='flex items-center gap-5'>

                                <span className="font-medium">
                                    Subscription with levels
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-3xl bg-slate-100 shadow-xl relative z-20 overflow-hidden pt-12 pb-10 px-8 xl:px-10 pricing-item-border" data-aos="fade-in-up">
                        <h3 className="font-semibold text-heading-6 mb-5">Starter</h3>
                        <div className="flex items-center gap-3.5">
                            <h2 className="font-bold text-custom-1 pricing-gradient-text">$ 100</h2>
                            <p className="font-medium">/month <br />(billed annually)</p></div>

                        <hr className="my-10 w-full h-[1px] pricing-gradient-divider" />
                        <ul className="flex flex-col gap-4">
                            <li className='flex items-center gap-5'>

                                <span className="font-medium">
                                    Subscription with levels
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-3xl bg-slate-100 shadow-xl relative z-20 overflow-hidden pt-12 pb-10 px-8 xl:px-10 pricing-item-border" data-aos="fade-in-up">
                        <h3 className="font-semibold text-heading-6 mb-5">Starter</h3>
                        <div className="flex items-center gap-3.5">
                            <h2 className="font-bold text-custom-1 pricing-gradient-text">$ 100</h2>
                            <p className="font-medium">/month <br />(billed annually)</p></div>

                        <hr className="my-10 w-full h-[1px] pricing-gradient-divider" />
                        <ul className="flex flex-col gap-4">
                            <li className='flex items-center gap-5'>

                                <span className="font-medium">
                                    Subscription with levels
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                Advanced features included
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}