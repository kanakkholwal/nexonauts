import { FlickeringGrid } from "@/components/animation/flikering-grid";
import Footer from "app/layouts/footer";
import SquareGrid from "app/layouts/patterns/square-grid";

export const dynamic = "force-dynamic";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute top-0 left-0 z-0 w-full min-h-80 mask-[linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      {children}
      <Footer />
      <SquareGrid />
    </>
  );
}
