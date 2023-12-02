"use client";
import Image from "next/image";
import Link from "next/link";
import { SessionUserType } from "src/types/user";
const links = [
    { label: 'Home', href: '/' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Docs', href: '/docs' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

export function Navbar({ user }: {
    user: SessionUserType | null

}) {

    return (<nav role="navbar" className="w-full flex flex-1 py-5 px-6 bg-white dark:bg-grey-600 z-20 relative lg:sticky lg:top-0 shadow-sm">
        <Link href="/marketplace" className="flex items-center gap-3 flex-1">
            <img src="/logo-sqaure.svg" alt="Nexo" className="w-12 h-12" />
            <span className="text-2xl font-bold sr-only">Nexo</span>
        </Link>
        <NavLinks links={links} active={'/marketplace'} />
        {user ? <div className="flex items-center space-x-2 px-3 py-1.5">
            <span className="text-slate-500 text-md mr-2 font-semibold md:inline-block">Hi, {user.name}</span>
            <Image src={user.profileURL} height={80} width={80} alt="avatar" className="w-8 h-8 rounded-full shadow-sm" />
        </div> : <div className="flex items-center space-x-2 px-3 py-1.5">

        </div>}
    </nav>)
}

function NavLinks({ links, active, ...props }) {
    return (<div className="flex flex-auto justify-end items-center gap-3">
        {links.map((link, i) => {
            return (<Link key={i} className={`px-7 py-3 rounded-3xl font-semibold text-sm  ${link.href === active ? '  bg-primary/10 dark:bg-primary/10' : 'text-slate-900 dark:text-gray-400 bg-slate-300 '} bg-slate-900 text-slate-100`} href={link.href}>
                {link.label}
            </Link>)
        })}

    </div>)
}