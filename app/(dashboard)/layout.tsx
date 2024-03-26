import { authOptions } from "app/api/auth/[...nextauth]/options";
import WithoutSession from "app/layouts/without-session";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import Navbar from "./components/navbar";
import SideBar from "./components/sidenav";
import "./layout.css";

export const metadata :Metadata = {
    title: "Feed - NexoNauts",
    description: "Feed for NexoNauts",
}

export default async function FeedLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    // console.log(session)
    if (!(session && session.user))
        return <WithoutSession/>

    return (<>
        <div className="flex h-full min-h-screen selection:bg-primary/10 selection:text-primary dark:bg-neutral-800/80 bg-slate-200/80 z-0">
            <SideBar user={session.user}  />
            <div className="lg:pl-80 flex flex-col flex-1 w-full relative z-0">
                <Navbar user={session.user} />
                <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 pattern_feed invert dark:invert-0 -z-[1]">
                <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
                <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
            </div>
                <main className="content p-2 md:p-4 z-2">
                    {children}
                </main>
                {process.env.NODE_ENV !== "production" && <div className="fixed bottom-0 right-0 p-2 text-xs text-gray-500 dark:text-slate-400">v0.0.1({process.env.NODE_ENV})</div>}
            </div>
        </div>

    </>)
}