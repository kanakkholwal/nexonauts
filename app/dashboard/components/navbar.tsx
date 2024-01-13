"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { VscChevronDown } from "react-icons/vsc";
import { SessionUserType } from "src/types/user";
import ThemeSwitcher from "./theme-switcher";

export default function Navbar({ user }: { user: SessionUserType }) {

    return (<nav className="w-full p-4 rounded-[20px] bg-white dark:bg-slate-800 flex items-center lg:px-6">
        <div className="flex items-start flex-col pl-12 lg:pl-0">
            <h3 className="text-lg font-bold">Dashboard</h3>
            <h6 className="text-sm text-gray-500 dark:text-slate-400">
                Hello {user.name}, Welcome back!
            </h6>
        </div>
        <div className="ml-auto inline-flex gap-1 items-center">

            <ThemeSwitcher />
            <div className="flex items-center space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg">
                            <Image src={user.profilePicture.toString()} height={80} width={80} alt="avatar" className="w-10 h-10 rounded-full" />
                            <span className="text-slate-500 dark:text-slate-300 text-sm ml-2 font-semibold hidden md:inline-block">{user.name}</span>
                            <VscChevronDown className="text-slate-500" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={15}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={"/dashboard/settings?defaultTabprofile=profile"} className="w-full text-accent-foreground hover:text-slate-800">
                                <FaRegUser className="w-3 h-3 mr-1" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <button onClick={(e) => {
                                e.preventDefault();
                                signOut();
                            }} className="w-full text-accent-foreground hover:text-slate-800">
                                <MdLogout className="w-3 h-3 mr-1" />
                                Log Out
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </nav>)
}