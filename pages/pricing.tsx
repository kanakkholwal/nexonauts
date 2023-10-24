import { Button } from "@/components/ui/button";
import Footer from 'layouts/common/footer';
import Header from 'layouts/common/header';
import Hero from 'layouts/common/hero';

import Aos from 'aos';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
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
            <NextSeo
                title={`Pricing | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`}
            />

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
                    <div className="rounded-xl bg-slate-100 shadow-xl relative z-20 overflow-hidden pt-12 pb-10 px-8 xl:px-10 pricing-item-border" data-aos="fade-in-up">
                        <h3 className="font-semibold text-heading-6 mb-5">Free Tier</h3>
                        <div className="flex items-center gap-3.5">
                            <h2 className="font-bold text-custom-1 pricing-gradient-text">$ 0</h2>
                            <p className="font-medium">/month</p></div>

                        <hr className="my-10 w-full h-[1px] pricing-gradient-divider" />
                        <ul className="flex flex-col gap-4">
                            <li className='flex items-center gap-5'>

                                <span className="font-medium">
                                    Create upto 3 AI apps
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                    Basic app analytics
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                    Upto 5 Usage per app per day.
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                    Save your favorite apps in your dashboard
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                    Share your apps with your friends with QR code
                                </span>
                            </li>
                        </ul>
                        <div className="flex justify-center items-center my-3">

                        <Link href="/signup">
                            <Button variant="gradient">
                                Get Started
                            </Button>
                        </Link>
                        </div>
                    </div>
                    <div className="rounded-xl bg-slate-100 shadow-xl relative z-20 overflow-hidden pt-12 pb-10 px-8 xl:px-10 pricing-item-border" data-aos="fade-in-up">
                        <h3 className="font-semibold text-heading-6 mb-5">Pro tier</h3>
                        <div className="flex items-center gap-3.5">
                            <h2 className="font-bold text-custom-1 pricing-gradient-text">$ 9.99</h2>
                            <p className="font-medium">/month</p></div>

                        <hr className="my-10 w-full h-[1px] pricing-gradient-divider" />
                        <ul className="flex flex-col gap-4">
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                    Create upto 10 apps
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                    Enchanced Apps analytics
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                    Basic features included (Free tier)
                                </span>
                            </li>
                        </ul>
                        <div className="flex justify-center items-center my-3">

<Link href="/signup">
    <Button variant="gradient">
        Get Started
    </Button>
</Link>
</div>
                    </div>
                    <div className="rounded-xl bg-slate-100 shadow-xl relative z-20 overflow-hidden pt-12 pb-10 px-8 xl:px-10 pricing-item-border" data-aos="fade-in-up">
                        <h3 className="font-semibold text-heading-6 mb-5">Premium</h3>
                        <div className="flex items-center gap-3.5">
                            <h2 className="font-bold text-custom-1 pricing-gradient-text">$ 14.99</h2>
                            <p className="font-medium">/month </p></div>

                        <hr className="my-10 w-full h-[1px] pricing-gradient-divider" />
                        <ul className="flex flex-col gap-4">
                            <li className='flex items-center gap-5'>

                                <span className="font-medium">
                                    Create upto 20 apps
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                    Advanced app analytics
                                </span>
                            </li>
                            <li className='flex items-center gap-5'>
                                <span className="font-medium">
                                    Basic features included (Pro tier)
                                </span>
                            </li>

                        </ul>
                        <div className="flex justify-center items-center my-3">

<Link href="/signup">
    <Button variant="gradient">
        Get Started
    </Button>
</Link>
</div>
                    </div>

                </div>

            </div>

            <Footer />
        </>
    )
}