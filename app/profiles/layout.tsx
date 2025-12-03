import Footer from "app/layouts/footer";
import Navbar from "app/layouts/navbar-dynamic";
import SquareGrid from "app/layouts/patterns/square-grid";
export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-7xl py-8 pt-32 mx-auto relative z-0">
        {children}
      </main>
      <SquareGrid />
      <Footer />
    </>
  );
}
