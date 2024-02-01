import Navbar from "app/developers/components/navbar";
import Footer from "app/layouts/footer";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (<>
        <Navbar />
        <main className="w-full max-w-7xl py-8 pt-32 mx-auto">
            {children}
        </main>
        <Footer />
    </>)
}