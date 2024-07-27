import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NavList } from "./nav-list";

export default function Navbar() {
  return (
    <div
      id="navbar"
      className="absolute inset-x-0 top-0 z-50 w-full md:w-[calc(100%-2rem)] max-w-4xl mx-auto md:mt-10 p-3 bg-glass md:rounded-full"
    >
      <nav
        className="relative flex items-center justify-between gap-4"
        aria-label="Global"
      >
        <div className="flex">
          <Link href="/" aria-label="Logo" className="p-1.5">
            <span className="sr-only">Nexonauts</span>
            <Image
              height={40}
              width={280}
              className="h-6 dark:invert w-auto"
              src="/assets/logo.svg"
              alt="logo"
              priority
              loading="eager"
            />
          </Link>
        </div>
        <div className="hidden md:flex gap-4 mx-auto">
          <NavList />
        </div>
        <Button rounded="full" className="" asChild>
          <Link href="/login">
            Log In <ArrowRight />
          </Link>
        </Button>
      </nav>
    </div>
  );
}
