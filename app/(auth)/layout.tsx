import Image from "next/image";
import Link from "next/link";
import gettingStarted from "./getting-started.png";
import illustration from "./illustration.png";

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
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen w-full h-full flex lg:flex-row relative">
            <div className="relative" id="hero">
                <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
                </div>
            </div>
            <div className="relative pt-xl flex flex-col w-full md:py-lg md:px-2xl lg:p-2xl lg:pb-sm lg:w-[calc(100vw-52%)] min-h-screen justify-start glassmorphism">
                {/* Register or Login */}
                <nav className="flex flex-col items-center justify-center w-full p-4 py-6 space-y-4 border-b border-border border-solid">
                    <Link href="/">
                        <Image src="/assets/logo.svg" className="h-10 dark:invert" alt="Nexonauts" width={200} height={200} />
                    </Link>
                </nav>
                {children}
            </div>
            <div className="hidden relative items-stretch justify-center overflow-hidden lg:!flex lg:w-[calc(100vw-48%)] bg-slate-50/15 dark:bg-slate-800/15 backdrop-blur-xl border-slate-500/10 dark:border-border/70"
            >
                <Image src={illustration} alt="Illustration" width={960} height={1024} className="absolute inset-0 w-full h-auto m-auto" />
            </div>
        </div>
    </>)
}
