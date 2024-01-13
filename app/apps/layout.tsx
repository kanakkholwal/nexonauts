
import { authOptions } from "app/api/auth/[...nextauth]/options";
import Footer from "app/layouts/footer";
import { getServerSession } from "next-auth/next";
import { SessionUserType } from "src/types/user";
import Navbar from "./navbar";


export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    // console.log(session)

    return (<div className="w-full min-h-screen flex">
        <Navbar user={session?.user as SessionUserType || null} />
        <main className="p-10 flex min-h-screen gap-2 w-full justify-between flex-wrap items-start relative z-0">
            {children}
        </main>
        <Footer />
    </div>)
}