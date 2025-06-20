"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavList, QuickLinks } from "./nav-list-dynamic";
import ThemeSwitcher from "./theme-switcher";

import { cn } from "@/lib/utils";
import GoToBtn from "./go-to-btn";

export default function Navbar() {
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
  return (
    <div id="navbar" className={cn(
      "fixed inset-x-0 top-0 z-50 w-full",
      scrolled
        ? "backdrop-blur-xs dark:backdrop-blur-sm bg-card/50"
        : "",
    )}>
      <div
        className={cn(
          "relative flex items-center justify-between gap-6 py-2 lg:gap-0 lg:py-4 mx-auto px-4 sm:px-12 lg:px-8 ",
          "max-w-(--max-app-width) mx-auto"
        )}
        aria-label="Navbar"
      >
        <div className="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5" />
        <div className="flex lg:flex-1">
          <Link
            href="/" aria-label="Logo"
            className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
          >
            <Image
              height={40}
              width={280}
              className="h-8 dark:invert w-auto"
              src="/logo-square-with-bg.svg"
              alt="logo"
              priority
              loading="eager"
            />
            <span className="font-medium text-black dark:text-white">Nexonauts</span>
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
