"use client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ChevronLeftCircle, ChevronRightCircle, LogOut, Settings2, UserRoundCog } from 'lucide-react';
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { RiAppsLine } from "react-icons/ri";
import { TbDashboard } from "react-icons/tb";
import { SessionUserType } from "src/types/user";

type LinkType = {
    label: string;
    href: string;
    icon: React.ElementType;
}

const links: LinkType[] = [
    {
        label: "Dashboard",
        icon: TbDashboard,
        href: "/dashboard",
    },
    {
        label: "Apps",
        icon: RiAppsLine,
        href: "/dashboard/apps",
    },
    {
        label: "Account",
        icon: UserRoundCog,
        href: "/dashboard/settings/account",
    },
    {
        label: "Settings",
        icon: Settings2,
        href: "/dashboard/settings",
    }
];

export default function SideBar({ user }: { user: SessionUserType }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname()

    return (<div
        aria-label="Sidenav"
        className={"fixed top-0 left-0 bottom-0 z-[999] flex flex-col w-[280px] min-h-screen space-y-6 bg-slate-100 dark:bg-slate-800" + (open ? " translate-x-0" : " -translate-x-full lg:translate-x-0") + " transition-transform duration-200 ease-in-out shadow-lg"}
    >
        <button
            className={"absolute top-10 -right-6 p-2 rounded-xl bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 shadow-md transition-colors duration-200 ease-in-out" + (open ? " translate-x-0" : " translate-x-full") + " lg:translate-x-0 lg:hidden"}
            onClick={() => {
                setOpen(!open)
            }}>
            {open ? <ChevronLeftCircle className="w-4 h-4" /> : <ChevronRightCircle className="w-4 h-4" />}
        </button>
        <Link href="/" aria-label="logo" className="flex items-center justify-start px-4">
            <Image height={40} width={300} className="h-14 w-56 dark:invert" src="/logo.svg" alt="logo" />
        </Link>
        <nav className="flex flex-col justify-start items-start gap-2 flex-1 px-4">
            {links.map((link: LinkType) => {
                return (
                    <Link href={link.href} key={link.href}
                        aria-label={link.label}
                        className={cn("flex items-center gap-2 px-3 text-sm py-2 rounded-lg self-stretch font-semibold text-slate-500 hover:bg-white hover:text-slate-900   dark:text-slate-400  dark:hover:text-slate-300 dark:hover:bg-slate-700 group transition-colors duration-200 ease-in-out " , pathname === link.href ? ' bg-primary/10 text-primary hover:bg-primary/20  hover:text-primary dark:bg-primary/10  dark:text-primary  dark:hover:bg-primary/20 dark:hover:text-primary' : '')}
                    >
                        <link.icon className="w-4 h-4" />
                        {link.label}

                    </Link>
                );
            })}
        </nav>
        <div className="flex self-stretch items-center gap-3 border-t border-t-border py-6 px-2 rounded-md mx-4 dark:border-t-slate-700">
            <Avatar>
                <AvatarImage src={user.profilePicture.toString()} alt={"@" + user.username} />
                <AvatarFallback className="uppercase">
                    {user.name[0] + user.name[1]}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start justify-start ">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                    <Link href={"/developers/" + user.username} target="_blank">
                        @{user.username}
                    </Link>
                </p>
            </div>
            <Button variant="destructive_light" size="icon" className='rounded-full ml-auto' onClick={(e) =>{
                e.preventDefault();
                signOut({
                    callbackUrl: "/login"
                })

            }}>
                <LogOut className="w-5 h-5" />
            </Button>
        </div>

    </div>)
}
