"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavList, QuickLinks } from "./nav-list-dynamic";
import ThemeSwitcher from "./theme-switcher";

import { cn } from "@/lib/utils";
import GoToBtn from "./go-to-btn";

export default function Navbar() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window?.addEventListener("scroll", handleScroll);
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);
<<<<<<< HEAD
=======
  return (
    <div id="navbar" className="fixed inset-x-0 top-0 z-50  w-full">
      <div
        className={cn(
          "relative flex items-center justify-between gap-6 py-2 lg:gap-0 lg:py-4 mx-auto px-4 sm:px-12 lg:px-8 ",
          scrolled
            ? "backdrop-blur-sm dark:backdrop-blur bg-white/50 dark:bg-zinc-900/20"
            : ""
        )}
=======
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
  return (
    <div id="navbar" className="fixed inset-x-0 top-0 z-50  w-full">
      <div
<<<<<<< HEAD
        className={cn(
          "relative flex items-center justify-between gap-6 py-2 lg:gap-0 lg:py-4 mx-auto px-4 sm:px-12 lg:px-8 ",
          scrolled
            ? "backdrop-blur-sm dark:backdrop-blur bg-white/50 dark:bg-zinc-900/20"
            : ""
        )}
=======
        className="relative flex items-center justify-between gap-6 py-2 lg:gap-0 lg:py-4 mx-auto px-4 sm:px-12 lg:px-8 backdrop-blur-sm dark:backdrop-blur bg-white/50 dark:bg-zinc-900/20"
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
        aria-label="Navbar"
      >
        <div className="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5" />
        <div className="flex lg:flex-1">
          <Link href="/" aria-label="Logo" className="p-1.5">
            <span className="sr-only">Nexonauts</span>
            <Image
              height={40}
              width={280}
              className="h-8 dark:invert w-auto"
              src="/assets/logo.svg"
              alt="Nexonauts Logo"
              priority
              loading="eager"
            />
          </Link>
        </div>
        <div className="flex items-center gap-5 justify-end ml-auto">
          <NavList />
          <div className="hidden xl:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
          <QuickLinks />
          <GoToBtn />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
