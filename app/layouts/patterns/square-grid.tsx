import { cn } from "@/lib/utils";
import "./square-grid.css";

export default function SquareGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 grid grid-cols-2 -space-x-52 pattern-square_grid dark:invert -z-[1]",
        className
      )}
    >
      <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
      <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
    </div>
  );
}
