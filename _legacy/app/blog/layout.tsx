import NavbarGlobal from "@/components/common/navbar";
import { cn } from "@/lib/utils";
import Footer from "app/layouts/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 grid grid-cols-2 -space-x-52 pattern-square_grid invert dark:invert-0 -z-1",
          "top-0"
        )}
      />
      <div className="w-full max-w-[1440px] mx-auto @container">
        <NavbarGlobal />
        {children}
        <Footer />
      </div>
    </>
  );
}
