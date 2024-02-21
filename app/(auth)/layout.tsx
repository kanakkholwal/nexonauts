import Image from "next/image";
import Link from "next/link";
import illustration from "./illustration.png";


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
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
                        <Image src="/assets/logo.svg" className="h-10 dark:invert"  alt="Nexonauts" width={200} height={200} />
                    </Link>
                </nav>
                {children}
            </div>
            <div className="hidden relative items-stretch justify-center overflow-hidden lg:!flex lg:w-[calc(100vw-48%)] bg-slate-50/15 dark:bg-slate-800/15 backdrop-blur-xl border-slate-500/10 dark:border-border/70"
            >
                <Image src={illustration} alt="Illustration" width={960} height={1024} className="absolute inset-0 w-full h-auto m-auto" />
            </div>
        </div>
    )
}
