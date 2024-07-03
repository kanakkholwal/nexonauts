import Footer from "app/layouts/footer";
import Navbar from "app/layouts/navbar-dynamic";
import localFont from "next/font/local";
<<<<<<< HEAD

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
});
=======
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0

<<<<<<< HEAD
const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
});

=======
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
export const dynamic = "force-dynamic";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< HEAD
    <div className={satoshi.className}>
      <Navbar />

      <div
        className={
          "w-full max-w-[144rem] py-8 pt-32 mx-auto relative z-0 @container"
        }
      >
=======
<<<<<<< HEAD
    <div className={satoshi.className}>
      <Navbar />

      <div
        className={
          "w-full max-w-[144rem] py-8 pt-32 mx-auto relative z-0 @container"
        }
      >
=======
    <>
      <Navbar />

      <main className={"w-full max-w-7xl py-8 pt-32 mx-auto relative z-0 "}>
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-[1]"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>
        {children}
<<<<<<< HEAD
      </div>
      <Footer />
    </div>
=======
<<<<<<< HEAD
      </div>
      <Footer />
    </div>
=======
      </main>
      <Footer />
    </>
>>>>>>> c4e3c5276137435e875f30efdcad3d899385f5b0
>>>>>>> b1e235116848bde2fc0447918eff3e7aae2124e0
  );
}
