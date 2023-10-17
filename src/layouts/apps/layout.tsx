import { Input } from "@/components/ui/input";
import Footer from 'layouts/common/footer';
import Image from "next/image";
import Link from "next/link";
import { CgSearch } from "react-icons/cg";
import { VscChevronDown } from "react-icons/vsc";
import { SessionUserType } from "src/types/user";
import Sidenav from "./components/sidenav";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";


export default function Layout({ children, user }: { children: React.ReactNode, user: SessionUserType | null }) {

    return (<div className="w-full min-h-screen flex">
        <Sidenav />
        <div className="flex-1">
            <header className="w-full">
                <nav className="flex items-center w-full p-6 border-b border-solid border-slate-200">
                    <div className="relative">
                        <CgSearch className="absolute top-1/2 left-3 z-10 transform -translate-y-1/2 text-slate-500" />
                        <Input className="pl-9 bg-slate-200" placeholder="Search..." />
                    </div>
                    <div className="ml-auto">
                        {user ? <div className="flex items-center space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center space-x-2 hover:bg-slate-100 px-3 py-1.5 rounded-lg">
                                        <Image src={user.profileURL} height={80} width={80} alt="avatar" className="w-6 h-6 rounded-full" />
                                        <span className="text-slate-500 text-md ml-2 font-semibold   hidden md:inline-block">{user.name}</span>
                                        <VscChevronDown className="text-slate-500" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent sideOffset={15}>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={"/dashboard/profile"} className="w-full text-accent-foreground hover:text-slate-800">
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



                        </div> : <div className="flex items-center space-x-2">
                            <Link href="/login" className=" text-sm hover:text-opacity-75 bg-slate-200  py-2  px-3 relative rounded-lg  flex items-center gap-1.5">
                                SignIn
                            </Link>
                            <Link href="/signup" className="bg-primary text-white py-2  px-3 relative rounded-lg  text-sm flex items-center gap-1.5 shadow-button">
                                Sign up
                            </Link>
                        </div>}
                    </div>
                </nav>
            </header>
            <main className="p-10">     
                {children}
            </main>
            <Footer />
        </div>
    </div>)
}