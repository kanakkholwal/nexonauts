"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { VscChevronDown } from "react-icons/vsc";
import { SessionUserType } from "src/types/user";

export default function Navbar({ user }: { user: SessionUserType }) {
    const pathname = usePathname();

    return (<nav className="w-full p-4  backdrop-blur border-b border-solid border-slate-100/50 dark:border-slate-700 flex items-center lg:px-6 z-2">
        <div className="flex items-start flex-col pl-12 lg:pl-0">
            <h3 className="text-lg font-bold">Dashboard</h3>
            <h6 className="text-xs text-slate-500 dark:text-slate-400 font-semibold truncate w-full max-w-72">
                {pathname}
            </h6>
        </div>
        <div className="ml-auto inline-flex gap-1 items-center">

            <div className="flex items-center space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center space-x-2 px-3 py-1.5 rounded-lg">
                            <Avatar>
                                <AvatarImage src={user.profilePicture.toString()} alt={"@" + user.username} height={80} width={80} className="" />
                                <AvatarFallback className="uppercase hidden md:flex">
                                    {user.name[0] + user.name[1]}
                                </AvatarFallback>
                            </Avatar>
                            <VscChevronDown className="text-slate-500" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={15}>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/devs/${user.username}`} target="_blank" className="w-full text-accent-foreground hover:text-slate-800 cursor-pointer">
                                <FaRegUser className="w-3 h-3 mr-1" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <button onClick={(e) => {
                                e.preventDefault();
                                signOut();
                            }} className="w-full text-accent-foreground hover:text-red-800 cursor-pointer">
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