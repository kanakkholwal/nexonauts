import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiSignOut } from "react-icons/pi";
import { RiAppsLine } from "react-icons/ri";
import { TbBrandBlogger, TbDashboard, TbSmartHome, TbTools } from "react-icons/tb";

type LinkType = {
    title: string;
    path: string;
    Icon?: React.ElementType;
    sessionRequired?: boolean;
}
const userRoutes = [
    {
        title: "Home",
        Icon: TbSmartHome,
        path: "/",
    },
    {
        title: "Dashboard",
        Icon: TbDashboard,
        path: "/dashboard",
        sessionRequired: true,
    },
    {
        title: "Apps",
        Icon:RiAppsLine,
        path: "/apps",
    },
    {
        title: "Tools",
        Icon: TbTools,
        path: "/tools",
    },
    {
        title: "Blog",
        Icon: TbBrandBlogger,
        path: "/blog",
    },
    {
        title: "Profile",
        Icon:TbBrandBlogger,
        path: "/dashboard/profile",
        sessionRequired: true,
    }
]  as LinkType[]
export default function Sidenav() {

    return (<div className="w-[300px] min-h-screen h-full px-3 py-2 space-y-4 bg-slate-100 fixed left-0 bottom-0 translate-x-[-300px] lg:translate-x-0 transition-duration-300 lg:sticky top-0">
                <div  className="w-full flex justify-center items-center mt-5" aria-roledescription="Website Logo">
                    <Image height={120} width={280} src="/logo.svg" alt="logo" className="w-64 h-12" draggable={false} />
                </div>
            <div className="space-y-1 px-3 py-2">
                {userRoutes.map((link :LinkType, i) => {
                    return <Link  key={i} href={link.path} className="inline-flex items-center rounded-md w-full justify-start text-sm group font-semibold text-slate-500 hover:shadow-sm hover:bg-white hover:text-slate-900 px-4 py-3 ">
                                {link.Icon && <link.Icon className="w-4 h-4 mr-2 text-current" />}
                                <span className="truncate">
                                    {link.title}
                                </span>
                        </Link>
                })}
            </div>
            <div className="mt-auto px-3 py-2">
                <Link href="/logout" className="inline-flex items-center rounded-md w-full justify-start text-sm group font-semibold text-slate-500 hover:shadow-sm  hover:bg-red-500 hover:text-white px-4 py-3 ">
                        <PiSignOut className="w-4 h-4  mr-2 font-inherit text-current" />
                    <span className="truncate">
                        Logout
                    </span>
                </Link>
            </div>
        
    </div>)
}