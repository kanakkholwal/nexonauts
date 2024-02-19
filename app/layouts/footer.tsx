import Link from "next/link";
import { FiLinkedin } from "react-icons/fi";
//import { LuGithub } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";


export default function Footer() {

    return (<footer className="relative z-10 pb-17 lg:pb-22 xl:pb-27 mt-10">
        <div className="absolute bottom-0 left-0 w-full flex flex-col gap-3 -z-1 opacity-50">
            <div className="w-full h-[1px] footer-bg-gradient" />
            <div className="w-full h-[2px] footer-bg-gradient" />
            <div className="w-full h-[3px] footer-bg-gradient" />
            <div className="w-full h-[4px] footer-bg-gradient" />
            <div className="w-full h-[6px] footer-bg-gradient" />
            <div className="w-full h-[7px] footer-bg-gradient" />
            <div className="w-full h-[8px] footer-bg-gradient" />
            <div className="w-full h-[9px] footer-bg-gradient" />
            <div className="w-full h-[13px] footer-bg-gradient" />
        </div>
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0 relative pt-17">
            <div className="w-full h-[1px] footer-divider-gradient absolute top-0 left-0" />
            <div className="flex flex-wrap justify-between">
                <div className="mb-10 max-w-[520px] w-full prose dark:prose-invert">
                    <Link className="mb-8 inline-block  text-3xl font-extrabold sm:text-3xl xl:text-heading-3 not-prose" href="/">
                        {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                    </Link>
                    <p className="mb-12 xl:w-4/5">
                        {process.env.NEXT_PUBLIC_WEBSITE_NAME}  is a developer-centric platform, which is designed to help you create amazing digital products and services.
                    </p>
                    <div className="flex items-center gap-5">
                        <Link href="https://x.com/NexoNauts" className={"text-slate-500 hover:text-primary hover:-translate-y-1 ease-in duration-300 flex justify-center items-center h-8 icon"}>
                            <RiTwitterXFill className="w-5 h-5" />
                        </Link>
                        <Link href="https://linkedin.com/NexoNauts" className={"text-slate-500 hover:text-primary hover:-translate-y-1 ease-in duration-300 flex justify-center items-center h-8 icon"}>
                            <FiLinkedin className="w-5 h-5" />
                        </Link>
                        {/*                         <Link href="https://github.com/NexoNauts" className={"text-slate-500 hover:text-primary ease-in duration-300 flex justify-center items-center h-16 icon"}>
                            <LuGithub className="w-5 h-5" />
                        </Link> */}
                    </div>
                    <p className="font-medium mt-6 text-slate-600">
                        © {new Date().getFullYear()} <Link href="/" className="text-slate-900 dark:text-slate-200 font-semibold">{process.env.NEXT_PUBLIC_WEBSITE_NAME}</Link> . All rights reserved.
                    </p>
                </div>
                <div className="max-w-[571px] w-full">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-10">
                        <div>
                            <h5 className="font-semibold mb-5">
                                Product
                            </h5>
                            <ul className="flex flex-col gap-3">
                                <li>
                                    <Link href="/apps" className="text-slate-500 hover:text-primary ease-in duration-300">
                                        AI Apps
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dev-tools" className="text-slate-500 hover:text-primary ease-in duration-300">
                                        Dev Tools
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/toolzen" className="text-slate-500 hover:text-primary ease-in duration-300">
                                        Tool Finder
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/marketplace" className="text-slate-500 hover:text-primary ease-in duration-300">
                                        MarketPlace <span className="text-slate-400 italic">(Comming Soon)</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold mb-5">
                                Company
                            </h5>
                            <ul className="flex flex-col gap-3">
                                <li>
                                    <Link href="/about" className="text-slate-500 hover:text-primary ease-in duration-300">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/pricing" className="text-slate-500 hover:text-primary ease-in duration-300">
                                        Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="text-slate-500 hover:text-primary ease-in duration-300">
                                        Privacy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/tos" className="text-slate-500 hover:text-primary ease-in duration-300">
                                        Term of Use
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="pb-5">
                            <h5 className="font-semibold mb-5">
                                Support
                            </h5>
                            <ul className="flex flex-col gap-3">
                                <li>
                                    <Link href="/contact" className="text-slate-500 hover:text-primary ease-in duration-300">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/copyright" className="text-slate-500 hover:text-primary ease-in duration-300">
                                        Disclaimer
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </footer>)
}
