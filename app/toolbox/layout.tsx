import Footer from "app/layouts/footer";
import Navbar from "app/layouts/navbar";


export default function Layout({ children }: { children: React.ReactNode }) {

    return (<>
    <Navbar />
    <Footer />
    
    </>)
}