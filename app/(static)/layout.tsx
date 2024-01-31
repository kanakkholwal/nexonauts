import Footer from 'app/layouts/footer';
import Navbar from "app/layouts/navbar";
import Link from "next/link";


export default function Layout({children}:{children:React.ReactNode}) {

    return (<>
        <header>
            <Navbar />
        </header>
        <main className="space-y-40 mb-40 max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
            {children}
        </main>
        <Footer />

    </>)
}