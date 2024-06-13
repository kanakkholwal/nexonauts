import Footer from "app/layouts/footer";
import SquareGrid from "app/layouts/patterns/square-grid";

export const dynamic = "force-dynamic";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
      <SquareGrid />
    </>
  );
}
