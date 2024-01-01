import Footer from "app/layouts/footer";
import Navbar from "app/layouts/navbar";


export default function Layout({ children }: { children: React.ReactNode }) {

    return (<>
        <Navbar />
        <main className="w-full grow mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0 pt-[70px] relative">

        {children}
        </main>
        <Footer />
    </>)
}