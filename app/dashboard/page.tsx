import { authOptions } from "app/api/auth/[...nextauth]/options";
import { User } from 'lucide-react';
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { sessionType } from "src/types/session";

import { BadgePlus, Search } from 'lucide-react';


export default async function DashboardPage() {
    const session = await getServerSession(authOptions) as sessionType;

    console.log(session)

    return (<div className="space-y-6 my-5">
        <h2 className="text-3xl font-semibold">
            Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4 items-stretch w-full">
            <Link href={"/developers/" + session.user.username} target="_blank" className="grow hover:shadow-sm bg-white dark:bg-slate-800 rounded-xl py-3 px-5 space-x-2 flex items-center">
                <div className="flex items-center justify-center rounded-full p-3 w-16 h-16 bg-sky-500">
                    <User className="w-10 h-10 text-slate-100 dark:text-slate-200" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">@{session.user.username}</h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                        Check out your profile
                    </p>
                </div>
            </Link>
            <Link href={"/toolzen/browse"} target="_blank" className="grow hover:shadow-sm bg-white dark:bg-slate-800 rounded-xl py-3 px-5 space-x-2 flex items-center">
                <div className="flex items-center justify-center rounded-full p-3 w-16 h-16 bg-sky-500">
                    <Search className="w-10 h-10 text-slate-100 dark:text-slate-200" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">
                        Browse ToolZen
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                        Explore new tools
                    </p>
                </div>
            </Link>
            <Link href={"/dashboard/apps/new"} className="grow hover:shadow-sm bg-white dark:bg-slate-800 rounded-xl py-3 px-5 space-x-2 flex items-center">
                <div className="flex items-center justify-center rounded-full p-3 w-16 h-16 bg-sky-500">
                    <BadgePlus className="w-10 h-10 text-slate-100 dark:text-slate-200" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">
                        Create App
                    </h1>
                    <p className="text-gray-500 dark:text-slate-400 text-sm">
                        New AI application
                    </p>
                </div>
            </Link>
        </div>


    </div>)
}