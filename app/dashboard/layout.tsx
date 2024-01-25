import { authOptions } from "app/api/auth/[...nextauth]/options";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Navbar from "./components/navbar";
import SideBar from "./components/sidenav";

export const metadata :Metadata = {
    title: "Dashboard - NexoNauts",
    description: "Dashboard for your account",
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session) return redirect("/login")

    return (<>
        <div className="flex gap-3 h-screen min-h-screen selection:bg-primary/10 selection:text-primary dark:bg-gray-900 bg-slate-200/80">
            <SideBar user={session.user}  />
            <div className="lg:pl-72 flex flex-col flex-1 w-full pt-3 px-2 ">
                <Navbar user={session.user} />
                <main className="content">
                    {children}
                </main>
                <span className="text-sm text-gray-500 dark:text-slate-400">v0.0.1({process.env.NODE_ENV})</span>

            </div>
        </div>

    </>)
}