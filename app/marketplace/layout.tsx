import Footer from "app/layouts/footer";
import Navbar from "app/layouts/navbar-dynamic";

export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main className={"w-full max-w-7xl py-8 pt-32 mx-auto relative z-0 "}>
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-[1]"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
}
