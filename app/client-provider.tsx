// provider.tsx
"use client";
import { Toaster } from "@/components/ui/sonner";
import Aos from 'aos';
import "aos/dist/aos.css";
import ThemeSwitcher from "app/layouts/theme-switcher";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Next13ProgressBar } from 'next13-progressbar';
import { useEffect } from "react";
import { Toaster as HotToastser } from "react-hot-toast";



export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
export function Provider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, [])
  return <SessionProvider>
    {children}
    <Next13ProgressBar height="4px" color="hsl(var(--primary))" options={{ showSpinner: true, trickle: true }} showOnShallow={true} />
    {/* <SmoothScroll /> */}
    <Toaster
      position="bottom-right"
      richColors
      theme={theme === "dark" ? "dark" : "light"}
      toastOptions={{
        // Define default options
        duration: 2500,
      }}
    />
    <HotToastser
      position="bottom-right"
      toastOptions={{
        // Define default options
        duration: 2500,
      }}
    />
    {process.env.NODE_ENV === "development" && <div className="fixed bottom-4 right-4 z-50">
      <ThemeSwitcher />
    </div>}
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
  </SessionProvider>;
}