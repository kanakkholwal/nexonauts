import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { NavList, ToggleButton } from "./nav-list";
import ThemeSwitcher from "./theme-switcher";

import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar() {


  return (<div aria-label="NavMenu" id="navbar" className="absolute inset-x-0 top-0 z-50  w-full">
    <div className="relative flex flex-wrap items-center justify-between gap-6 py-2 lg:gap-0 lg:py-4 mx-auto px-4 sm:px-12 xl:max-w-[1440px] xl:px-0 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <Link href="/" aria-label="Logo" className="p-1.5">
          <span className="sr-only">Nexonauts</span>
          <Image height={40} width={280} className="h-10 dark:invert w-auto" src="/assets/logo.svg" alt="logo" priority loading="eager" />
        </Link>

      </div>
      <Suspense fallback={<Skeleton className="w-full h-10  rounded-full animate-pulse" />}>
      <NavList />
      </Suspense>

      <div className="flex gap-2 items-center justify-end flex-1">
        <Link
          className="relative ml-auto hidden md:flex  h-9 items-center justify-center before:absolute before:inset-0 before:rounded-full  before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-primaryLight sm:px-4 before:border before:border-gray-200 before:bg-primary/10 dark:before:bg-gray-800"
          href="/login?ref=navbar-button">
          <span className="relative text-sm font-semibold  text-primary dark:text-white">Sign In</span>
        </Link>
        <Suspense fallback={<Skeleton className="w-10 h-10  rounded-full animate-pulse" />}>
          <ThemeSwitcher />
          <ToggleButton />
        </Suspense>

      </div>
    </div>
  </div>)
}
