"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import GoToBtn from "./go-to-btn";
import { NavList, QuickLinks } from "./nav-list-dynamic";
import ThemeSwitcher from "./theme-switcher";

// --- TYPES ---
// (If you have specific prop types, define them here)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="navbar"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8",
        scrolled ? "pt-4" : "pt-0 border-b border-border/10 bg-background/5 backdrop-blur-sm"
      )}
    >
      <nav
        className={cn(
          "relative mx-auto flex items-center justify-between gap-4 rounded-2xl transition-all duration-300",
          "max-w-[1400px]",
          scrolled
            ? "bg-background/70 backdrop-blur-xl border border-border/40 shadow-lg shadow-black/5 py-2.5 px-4 md:px-6"
            : "bg-transparent py-4"
        )}
        aria-label="Global"
      >
        {/* --- Logo Area --- */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Home">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Image
                src="/logo-square-with-bg.svg"
                alt="Nexonauts Logo"
                width={32}
                height={32}
                className="h-5 w-5 dark:invert transition-transform group-hover:scale-110"
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground hidden sm:block">
              Nexonauts
            </span>
          </Link>
        </div>

        {/* --- Desktop Navigation (Center) --- */}
        <div className="hidden lg:flex items-center gap-1">
          <NavList />
        </div>

        {/* --- Desktop Actions (Right) --- */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-2">
          <div className="flex items-center gap-2 pr-2 border-r border-border/50 mr-2">
            <QuickLinks />
          </div>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <GoToBtn />
          </div>
        </div>

        {/* --- Mobile Menu Button --- */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-muted-foreground hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

      </nav>

      {/* --- Mobile Menu Overlay --- */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl bg-card border border-border shadow-2xl animate-in slide-in-from-top-2">
          <div className="space-y-4 border-b-px border-border/50 flex items-center justify-between flex-wrap">
            <NavList />
            <div className="flex gap-2 items-center justify-end ml-auto">
              <QuickLinks />
              <ThemeSwitcher />
              <GoToBtn />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}