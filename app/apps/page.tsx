
import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { getPublicApps } from "src/lib/apps/actions";
import {Suspense} from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "./components/search";

export default async function AppsPage({
    searchParams,
}: {
    searchParams?: {
        query?: string,
        page?: string,
    };
}) {
    const session = await getServerSession(authOptions);
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const { apps, totalPages } = await getPublicApps(query, currentPage, {});



    return (<div className="max-full grow">
        <div className="relative mb-28" id="hero">
            <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
                <div className="relative pt-36 ml-auto">
                    <div className="lg:w-3/4 text-center mx-auto">
                        <h1 className="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">
                            Nexo <span className="relative bg-gradient-to-r from-primary to-violet-200 bg-clip-text text-transparent dark:from-primaryLight dark:to-secondaryLight md:px-2">Apps</span>Portal</h1>
                        <p className="mt-8 text-gray-700 dark:text-gray-300 text-center mx-auto">
                            Find perfect apps for your needs
                        </p>
                        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
                            <Suspense fallback={<Skeleton className="w-full h-12"/>}>
                                <SearchBar />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>)
}