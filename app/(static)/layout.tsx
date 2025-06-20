import NavbarGlobal from "@/components/common/navbar";
import Footer from "app/layouts/footer";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <NavbarGlobal />
      </header>
      <main className="space-y-10 mb-40 max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
