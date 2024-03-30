import Image from "next/image";
import Link from "next/link";
import gettingStarted from "./getting-started.png";

export const dynamic = 'force-dynamic';

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (<>
        <div className="container relative h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-background-gradient">

            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <Link className="relative z-20 flex items-center text-lg font-medium" href="/">
                    <Image
                        width={280}
                        height={120}
                        alt="Authentication"
                        className="invert mr-2 h-10 w-10" src="/logo-square-with-bg.svg"
                    />
                    {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                </Link>
                <div className="relative z-20 m-auto">
                    <Image src={gettingStarted} width={500} height={500} alt="hero" />
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            "The only way to do great work is to love what you do."
                        </p>
                        <footer className="text-sm">Aman Asrani</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="lg:hidden">
                    <Image
                        width={280}
                        height={120}
                        alt="Authentication"
                        className="dark:invert h-10 w-10 absolute left-4 top-4 lg:left-8 lg:top-8" src="/logo-square-with-bg.svg"
                    />
                </div>
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 pt-32 lg:pt-14 lg:w-[450px]">
                    {children}
                </div>
            </div>
        </div>
    </>)
}
