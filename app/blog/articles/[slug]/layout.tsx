import Footer from "app/layouts/footer";
import Navbar from "app/layouts/navbar-static";


export default function Layout({ children }: { children: React.ReactNode }) {

    return (<>
        <Navbar />
        {children}
        <Footer />
    </>)
}