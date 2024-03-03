import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { NavList, QuickLinks } from "./nav-list-dynamic";
import ThemeSwitcher from "./theme-switcher";

import { Skeleton } from "@/components/ui/skeleton";
import GoToBtn from "./go-to-btn";

export default function Navbar() {


    return (<div aria-label="NavMenu" id="navbar" className="absolute inset-x-0 top-0 z-50  w-full">
        <div className="relative flex items-center justify-between gap-6 py-2 lg:gap-0 lg:py-4 mx-auto px-4 sm:px-12 xl:max-w-[1440px] xl:px-0 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
                <Link href="/" aria-label="Logo" className="p-1.5">
                    <span className="sr-only">Nexonauts</span>
                    <Image height={40} width={280} className="h-10 dark:invert w-auto" src="/assets/logo.svg" alt="logo" priority loading="eager" />
                </Link>

            </div>
            <Suspense fallback={<Skeleton className="w-full h-10  rounded-full animate-pulse" />}>
                <NavList />
            </Suspense>

            <div className="flex gap-2 items-center justify-end flex-auto">
                <QuickLinks />
                <GoToBtn />
                <Suspense fallback={<Skeleton className="w-10 h-10  rounded-full animate-pulse" />}>
                    <ThemeSwitcher />
                </Suspense>

            </div>
        </div>
    </div>)
}
