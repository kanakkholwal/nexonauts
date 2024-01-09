import Footer from "app/layouts/footer";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (<>
        {children}
        <Footer />
    </>)
}