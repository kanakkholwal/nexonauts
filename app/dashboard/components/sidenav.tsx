"use client";
import { Button } from "@/components/ui/button";
import { LogOut, Settings2 } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { RiAppsLine, RiUserLine } from "react-icons/ri";
import { TbDashboard } from "react-icons/tb";

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
        href: "/apps",
    },
    {
        label: "Account",
        icon: RiUserLine,
        href: "/dashboard/account",
    },
    {
        label: "Settings",
        icon: Settings2,
        href: "/dashboard/settings",
    }
];

export default function SideBar() {
    return (<div
        aria-label="SideBar"
        className="fixed top-0 left-0 bottom-0 z-[999] flex flex-col w-64 min-h-screen px-4 py-8 rounded-r-[30px] bg-white  dark:bg-slate-800"
    >
        <div className="relative  flex w-full justify-center items-center">
            <Link href="/" aria-label="logo" className="flex items-center space-x-2">
                <Image height={40} width={300} className="h-10 dark:invert" src="/logo.svg" alt="logo" />
            </Link>
        </div>
        <nav className="flex flex-col justify-start items-start gap-2 flex-1 mt-6">
            {links.map((link: LinkType) => {
                return (
                    <Link href={link.href} key={link.href}
                        aria-label={link.label}
                        className="flex items-center gap-2 px-4 py-2 h-10 w-full text-sm text-slate-600 hover:text-primary/80 dark:text-slate-400 group rounded-md transition-colors duration-200 ease-in-out"
                    >
                        <span className="h-3 w-[2px] bg-transparent group-hover:bg-primary/50" />
                        <link.icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>

                    </Link>
                );
            })}
        </nav>
        <div className="">
            <Button variant="destructive" size="lg" className='rounded-full px-6 w-full'>
                Log Out
                <LogOut className="w-4 h-4 ml-2" />
            </Button>
        </div>

    </div>)
}