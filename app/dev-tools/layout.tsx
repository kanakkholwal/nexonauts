import Footer from "app/layouts/footer";
import Navbar from "app/layouts/navbar";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Developer Tools | Nexonauts",
    description: "A collection of tools that I have made to make your developer life easier.",

}


export default function Layout({ children }: { children: React.ReactNode }) {

    return (<>
        <Navbar />
        <main className="w-full grow mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0 pt-[70px] relative">

        {children}
        </main>
        <Footer />
    </>)
}