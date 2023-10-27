import { Input } from "@/components/ui/input";
import Footer from 'layouts/common/footer';
import Image from "next/image";
import Link from "next/link";
import { CgSearch } from "react-icons/cg";
import { VscChevronDown } from "react-icons/vsc";
import { SessionUserType } from "src/types/user";
import Sidenav from "../common/sidenav";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import debounce from 'lodash.debounce';
import { signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarRightExpand } from "react-icons/tb";


export default function Layout({ children, user }: { children: React.ReactNode, user: SessionUserType | null }) {
    const [isSidenavOpen, setSidenavOpen] = useState<boolean>(false);
    let NavRef = useRef<HTMLElement>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async (searchQuery) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/apps/search?query=${searchQuery}`);
            console.log(response.data.result);
            setResults(response.data.result);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = debounce(handleSearch, 300); // Adjust the debounce delay as needed

    const handleChange = (e) => {
        const searchText = e.target.value;
        setSearchQuery(searchText);
        debouncedSearch(searchText);
    };
    useEffect(() => {
        let sidenavPanel = document.body.querySelector("#nexo_sidenav");
        if (!sidenavPanel) return;

        if (!sidenavPanel.classList.contains('isOpen')) {
            sidenavPanel.classList.add('isOpen');
        }
        else {
            sidenavPanel.classList.remove('isOpen');
        }

    }, [isSidenavOpen]);
    useEffect(() => {

        const HandleOutSide = (e: MouseEvent & {
            target: {
                id: string
            }
        }) => {
            if (NavRef.current && !NavRef.current.contains(e.target as any) ||document.body.querySelector("#nexo_sidenav")?.contains(e.target as any) ||document.body.querySelector("#nexo_sidenav_toggler")?.contains(e.target as any)) {
                setSidenavOpen(false);
            }
        }
        document.addEventListener("mousedown", HandleOutSide)

        return () => {
            document.removeEventListener("mousedown", HandleOutSide)
        }
    }, []);

    return (<div className="w-full min-h-screen flex">
        <Sidenav open={isSidenavOpen} />
        {isSidenavOpen ? <div className="xl:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm " /> : null}
        <div className="flex-1">
            <header className="w-full">
                <nav className="flex items-center w-full p-6 border-b border-solid border-slate-200" ref={NavRef}>
                    <div className="grow-0 flex xl:hidden">
                        <Button size="icon" variant="ghost" onClick={() => {
                            setSidenavOpen(!isSidenavOpen)
                        }} id="nexo_sidenav_toggler" className="bg-slate-100 hover:bg-slate-200 mr-2">
                            {isSidenavOpen ? <TbLayoutSidebarRightExpand className="w-4 h-4" /> : <TbLayoutSidebarRightCollapse className="w-4 h-4" />}
                        </Button>
                    </div>
                    <div className="relative">
                        <CgSearch className="absolute top-1/2 left-3 z-10 transform -translate-y-1/2 text-slate-500" />
                        <Input className="pl-9 bg-slate-200" placeholder="Search..." value={searchQuery} onChange={handleChange} />
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
            <main className="p-10 flex min-h-screen gap-2 w-full justify-between flex-wrap items-start">
                {children}
            </main>
            <Footer />
        </div>
    </div>)
}