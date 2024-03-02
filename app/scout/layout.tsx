import Footer from "app/layouts/footer";

export const dynamic = 'force-dynamic';
export default function Layout({ children }: { children: React.ReactNode }) {

    return (<>
        {children}
        <Footer />
    </>)
}