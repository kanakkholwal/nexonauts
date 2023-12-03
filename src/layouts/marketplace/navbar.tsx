"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { CgSearch } from "react-icons/cg";
import { NAME } from "src/constants/marketplace";
import { SessionUserType } from "src/types/user";

const links = [
    { label: 'Templates', href: '/marketplace/explore?type=template' },
    { label: 'UI Kits', href: '/marketplace/explore?type=uikit' },
    { label: 'E-Books', href: '/marketplace/explore?type=ebook' },
    { label: 'Plugins', href: '/marketplace/explore?type=plugin' },
    // { label: 'Themes', href: '/marketplace/explore?type=theme' },
    // { label: 'Graphics', href: '/marketplace/explore?type=graphic' },
    // { label: 'Fonts', href: '/marketplace/explore?type=font' },
    // { label: 'Videos', href: '/marketplace/explore?type=video' },
    // { label: 'Courses', href: '/marketplace/explore?type=course' },
    // { label: 'Audio', href: '/marketplace/explore?type=audio' },
    // { label: '3D Assets', href: '/marketplace/explore?type=3d' },
    // { label: 'Tools', href: '/marketplace/explore?type=tool' },
    // { label: 'Mobile Apps', href: '/marketplace/explore?type=mobileapp' },
    // { label: 'Desktop Apps', href: '/marketplace/explore?type=desktopapp' },
    // { label: 'SaaS', href: '/marketplace/explore?type=saas' },
    // { label: 'Games', href: '/marketplace/explore?type=game' },
    // { label: 'Websites', href: '/marketplace/explore?type=website' },
    // { label: 'Jobs', href: '/marketplace/explore?type=job' },
    // { label: 'Services', href: '/marketplace/explore?type=service' },
    // { label: 'Other', href: '/marketplace/explore?type=other' },
];

export function Navbar({ user, title }: {
    user: SessionUserType | null,
    title: React.ReactNode | null,

}) {

    return (<nav role="navbar" className="w-full flex flex-1 justify-between items-center py-5 px-6 bg-white dark:bg-grey-600 z-20 relative lg:sticky lg:top-0 shadow-sm">
        <Link href="/marketplace" className="flex items-center gap-3 shrink-0 ">
            <Image src="/logo-sqaure.svg" alt="Nexo" className="w-12 h-12" height={150} width={180} />
            <span className="text-2xl font-bold sr-only">Nexo</span>
        </Link>
        <div className=" ml-7">
            {title ? title : <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                {NAME}
            </h1>}
        </div>

        <NavLinks links={links} active={'/marketplace'} />
        <div className="relative mx-auto flex-auto">
            <CgSearch className="absolute top-1/2 left-3 z-10 transform -translate-y-1/2 text-slate-500" />
            <Input className="pl-9 bg-slate-200 rounded-3xl max-w-lg" placeholder="Search templates, ui kits, e-books, and more..." />
        </div>
        {user ? <div className="flex items-center space-x-2 px-3 py-1.5 ml-auto shrink-0">
            <span className="text-slate-500 text-md mr-2 font-semibold sm:inline-block hidden">Hi, {user.name}</span>
            <Image src={user.profileURL} height={80} width={80} alt="avatar" className="w-8 h-8 rounded-full shadow-sm" />
        </div> : <div className="flex items-center space-x-2 px-3 py-1.5">

        </div>}
    </nav>)
}

function NavLinks({ links, active, ...props }) {
    return (<div className="hidden xl:flex flex-auto justify-center items-center gap-3 ">
        {links.map((link, i) => {
            return (<Link key={i} className={`px-7 py-3 rounded-3xl font-semibold text-sm  bg-slate-100 ${link.href === active ? " text-primary bg-primary/10 shadow-sm shadow-primary/10" : " text-slate-700  hover:text-slate-900 "}`} href={link.href}>
                {link.label}
            </Link>)
        })}

    </div>)
}