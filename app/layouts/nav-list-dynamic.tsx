"use client";
import { LayoutDashboard } from 'lucide-react';
import { useState } from "react";

import {
    Search,
    Settings,
    User
} from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useSession } from 'next-auth/react';
import Link from "next/link";
import React from "react";

const loggedInList = [

    {
        path: "/dashboard",
        title: "Dashboard",
        icon: LayoutDashboard
    },
    {
        path: "/dashboard/settings",
        title: "Settings",
        icon: Settings
    }
]
const defaultList = [
    {
        title: "Nexo Scout",
        path: "/scout",
    },
    {
        title: "Dev Tools",
        path: "/marketplace",
    },
    {
        title: "Discover Devs",
        path: "/devs",
    },
]

export function QuickLinks() {
    const [open, setOpen] = useState(false);
    const {data:session} = useSession();

    const isLoggedIn = !!session?.user;

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>

            <button aria-label="search" role="button"
                onClick={() => setOpen(!open)}
                className={cn(
                    "font-medium  text-sm text-muted-foreground",
                    "inline-flex items-center whitespace-nowrap rounded-full w-full max-w-60 transition-colors h-9 px-4 py-2 relative justify-start ml-auto",
                    "backdrop-blur-sm bg-white/30 dark:bg-slate-100/5 border border-border/50 shadow-lg md:shadow-none",
                )}>
                <span className="inline-flex">
                    <Search className="w-4 h-4 dark:text-gray-400" />
                </span>
                <span className="hidden ml-2 lg:inline-flex">
                    Quick Links ...</span>
                <span className="inline-flex lg:hidden">Quick Links...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-[50%] translate-y-[-50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted text-slate-600 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>J</kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {defaultList.map((item, index) => {
                            return (<CommandItem key={`command-item-${index}`}>
                                <Link href={item.path} className="flex items-center w-full">
                                    <span>{item.title}</span>
                                </Link>
                            </CommandItem>)
                        })}
                        {!isLoggedIn && <CommandItem >
                                <Link href={`/signup`} className="flex items-center w-full">
                                    <span>Sign Up</span>
                                </Link>
                            </CommandItem>}
                    </CommandGroup>
                    <CommandSeparator />
                    {isLoggedIn && <CommandGroup heading="Go To">
                        <CommandItem>
                            <Link href={`/devs/` + session?.user?.username!} className="flex items-center  w-full">
                                <User className="mr-2 h-4 w-4" />
                                <span>Your Profile</span>
                            </Link>
                        </CommandItem>
                        {loggedInList.map((item, index) => {
                            return (<CommandItem key={`command-item-${index}`}>
                                <Link href={item.path} className="flex items-center w-full">
                                    <item.icon className="mr-2 h-4 w-4" />
                                    <span>{item.title}</span>
                                </Link>
                            </CommandItem>)
                        })}
                    </CommandGroup>}
                </CommandList>
            </CommandDialog>
        </>
    )
}

const list = [
    {
        title: "Nexo Scout",
        path: "/scout",
    },
    {
        title: "Dev Tools",
        path: "/marketplace",
    },
    {
        title: "Discover Devs",
        path: "/devs",
    },


]
export function NavList() {

    return (
        <div className="hidden lg:flex items-center justify-start flex-1 mx-auto " id="navlinks">
            {list.map((item, index) => {
                return (<Link key={`navlink-${index}`}
                    className={cn(
                        "relative items-center justify-center py-1 px-3 rounded-full",
                        "text-gray-600 dark:text-gray-100 hover:text-gray-800 dark:hover:text-white",
                        "bg-transparent dark:bg-transparent hover:bg-white/30 dark:hover:bg-slate-100/5 backdrop-blur-lg",
                        "transition-colors duration-300",
                        "text-sm font-semibold"
                    )}
                    href={item.path}>
                    {item.title}
                </Link>)
            })}

        </div>
    )
}