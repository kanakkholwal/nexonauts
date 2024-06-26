"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeSwitcher from "app/layouts/theme-switcher";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      id="navbar"
      className="fixed inset-x-0 z-20 w-full border-b border-gray-100 backdrop-blur dark:border-gray-700/30 "
    >
      <div className="mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0">
        <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0 lg:py-4">
          <div className="relative z-20 flex w-full justify-between md:px-0 lg:w-max">
            <a
              href="/"
              aria-label="logo"
              className="flex items-center space-x-2"
            >
              <img
                className="h-10 dark:invert"
                src="/assets/logo.svg"
                alt="logo"
              />
            </a>
            <button
              aria-label="humburger"
              id="hamburger"
              className="relative -mr-6 p-6 lg:hidden"
              onClick={() => setOpen(!open)}
            >
              <div
                aria-hidden="true"
                className={
                  "m-auto h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300" +
                  (open ? " translate-y-[0.375rem] rotate-[45deg]" : "")
                }
              />
              <div
                aria-hidden="true"
                className={
                  "m-auto mt-2 h-0.5 w-5 rounded bg-sky-900 transition duration-300 dark:bg-gray-300" +
                  (open ? " translate-y-[-0.25rem] rotate-[-45deg]" : "")
                }
              />
            </button>
          </div>
          <div
            id="layer"
            aria-hidden={open ? "false" : "true"}
            className="fixed inset-0 z-10 h-screen w-screen origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl transition duration-500 dark:bg-gray-900/70 lg:hidden"
          />
          <div
            id="navlinks"
            className={
              "invisible absolute top-full left-0 z-20 w-full origin-top-right translate-y-1 scale-90 flex-col flex-wrap justify-end gap-6 rounded-3xl border border-gray-100 bg-white p-8 opacity-0 shadow-2xl shadow-gray-600/10 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:visible lg:relative lg:flex lg:w-auto lg:translate-y-0 lg:scale-100 lg:flex-row lg:items-center lg:gap-0 lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 lg:shadow-none lg:peer-checked:translate-y-0 dark:lg:bg-transparent" +
              (open
                ? " !visible !scale-100 !opacity-100 !lg:translate-y-0"
                : "")
            }
          >
            <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    aria-label="search"
                    role="button"
                    className="inline-flex w-full items-center whitespace-nowrap rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-slate-100 dark:bg-slate-800 shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 h-9 px-4 py-2 relative justify-start text-sm text-muted-foreground md:pr-12 md:w-40 lg:w-64 "
                  >
                    <span className="inline-flex">
                      <Search className="w-4 h-4 dark:text-gray-400" />
                    </span>
                    <span className="hidden ml-2 lg:inline-flex">
                      Search a profile...
                    </span>
                    <span className="inline-flex lg:hidden">Search...</span>
                    <kbd className="pointer-events-none absolute right-1.5 top-[50%] translate-y-[-50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted text-slate-600 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                      <span className="text-xs">⌘</span>J
                    </kbd>
                  </button>
                </SheetTrigger>
                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Save changes</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
            <div className="mt-6 -ml-1 flex w-full flex-col space-y-2 border-primary/10 dark:border-gray-700 sm:flex-row md:w-max lg:mt-0 lg:mr-6 lg:space-y-0 lg:border-l lg:pl-6">
              <Link
                className="relative ml-auto flex  h-12 lg:h-9 w-full items-center justify-center before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-primaryLight sm:px-4 lg:before:border lg:before:border-gray-200 lg:before:bg-primary/10 lg:dark:before:bg-gray-800"
                href="/signup?ref=navbar-button"
              >
                <span className="relative text-sm font-semibold text-white dark:text-gray-900 lg:text-primary lg:dark:text-white">
                  Get Started
                </span>
              </Link>
            </div>
            <ThemeSwitcher />
          </div>
          <div className="fixed top-3 right-14 z-20 sm:right-24 lg:hidden">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
