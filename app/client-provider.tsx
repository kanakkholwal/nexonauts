// provider.tsx
"use client";
import { Toaster } from "@/components/ui/sonner";
import Aos from "aos";
import "aos/dist/aos.css";
import ThemeSwitcher from "app/layouts/theme-switcher";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Next13ProgressBar } from "next13-progressbar";
import { useEffect } from "react";
import { Toaster as HotToaster } from "react-hot-toast";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
export function Provider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <SessionProvider>
      {children}
      <Next13ProgressBar
        height="4px"
        color="hsl(var(--primary))"
        options={{ showSpinner: true, trickle: true }}
        showOnShallow={true}
      />
      <Toaster
        position="bottom-right"
        richColors
        theme={theme === "dark" ? "dark" : "light"}
        toastOptions={{
          // Define default options
          duration: 2500,
        }}
      />
      <HotToaster
        position="bottom-right"
        toastOptions={{
          // Define default options
          duration: 2500,
        }}
      />
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 z-50">
          <ThemeSwitcher />
        </div>
      )}
      {/* <div
        <div
            className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
        >
            <div
                className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] dark:from-indigo-400  dark:from-10%  dark:via-sky-400  dark:via-30%  dark:to-emerald-300  dark:to-90% opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                    clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
            />
        </div> */}

      {/* <div className="fixed inset-0 aspect-square rounded-full overflow-hidden will-change-transform m-auto -z-1 backdrop-blur-[100px]"
                style={{
                    background:"linear-gradient(139deg,#233452 0%,rgba(35,52,82,0) 100%)",
                    transform:"perspective(1200px) translateX(-50%) rotate(39deg)"
                }}
                />
                <div className="fixed inset-0 aspect-square rounded-full overflow-hidden will-change-transform m-auto -z-1 backdrop-blur-[100px]"
                style={{
                    background:"linear-gradient(139deg,#233452 0%,rgba(35,52,82,0) 100%)",
                    transform:"perspective(1200px) translateX(-50%) rotate(-60deg)"
                }}
    /> */}
    </SessionProvider>
  );
}
