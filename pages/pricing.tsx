import { Button } from "@/components/ui/button";
import Footer from 'layouts/common/footer';
import Header from 'layouts/common/header';
import Hero from 'layouts/common/hero';

import { NextSeo } from 'next-seo';
import { BsStars } from "react-icons/bs";

import Link from 'next/link';


export default function Page() {
    // useEffect(() => {
    //     Aos.init({
    //         duration: 800,
    //         easing: 'ease-in-out',
    //         once: true,
    //         mirror: false
    //     })
    // }, [])

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
                <PricingTable />

            </div>

            <Footer />
        </>
    )
}

function PricingTable() {
    return (
        <section className=" w-full py-12  flex items-center justify-center">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
                    <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-200 hover:border-primary transition-all duration-300 hover:translate-y-[-16px]">
                        <div>
                            <h3 className="text-2xl font-bold text-center">Free</h3>
                            <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                                <span className="text-4xl font-bold">$0</span>/ month
                            </div>
                            <ul className="my-4 space-y-2">
                                <li className="flex items-center">
                                    <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                                    Upto 5 Usage per app per day.
                                </li>
                                <li className="flex items-center">
                                    <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                                    Create upto 3 AI apps
                                </li>
                                <li className="flex items-center">
                                    <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                                    Basic app analytics
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6">
                            <Link href="/signup">
                                <Button className="w-full">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500  hover:border-purple-700 transition-all duration-300 hover:translate-y-[-16px]">
                        <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            Popular
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-center">Pro</h3>
                            <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                                <span className="text-4xl font-bold">$9.99</span>/ month
                            </div>
                            <ul className="my-4 space-y-2">
                                <li className="flex items-center">
                                    <IconCheck className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                                    Basic features included (Free tier)
                                </li>
                                <li className="flex items-center">
                                    <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                                    Create upto 10 apps
                                </li>
                                <li className="flex items-center">
                                    <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                                    Enchanced Apps analytics
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6">
                            <Link href="/signup">
                                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-200 hover:border-primary transition-all duration-300 hover:translate-y-[-16px]">
                        <div>
                            <h3 className="text-2xl font-bold text-center">Premium</h3>
                            <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                                <span className="text-4xl font-bold">$14.99</span>/ month
                            </div>
                            <ul className="my-4 space-y-2">
                                <li className="flex items-center">
                                    <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                                    Basic features included (Pro tier)
                                </li>
                                <li className="flex items-center">
                                    <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                                    Create upto 20 apps

                                </li>
                                <li className="flex items-center">
                                    <IconCheck className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                                    Advanced app analytics

                                </li>

                            </ul>
                        </div>
                        <div className="mt-6">
                            <Link href="/signup">
                                <Button className="w-full">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function IconCheck(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
