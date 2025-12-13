import { GoogleAnalytics } from "@next/third-parties/google";
import { ROOT_METADATA } from "data/root";
import type { Metadata } from "next";
import { Provider, ThemeProvider } from "./client-provider";
import "./codebox.css";
import "./global.css";
// import { Urbanist } from 'next/font/google';
import { cn } from "@/lib/utils";
import { appConfig } from "@root/project.config";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import Script from "next/script";

const fontSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin-ext", "latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-sans",
  fallback: ["system-ui", "sans-serif"],
});
const fontMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: "400",
});
export const metadata: Metadata = ROOT_METADATA;

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-6988693445063744" />
      </head>
      <body className={cn(" min-h-screen antialiased relative", 
      fontSans.variable,
          fontMono.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["system", "light", "dark"]}
        >
          <Provider>{children}</Provider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && (<>
          <Script
            id="adsense-script"
            strategy="afterInteractive"
            async
            src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + appConfig.verifications.google_adsense}
            crossOrigin="anonymous"
          />
          <GoogleAnalytics gaId={appConfig.verifications.google_analytics} />
        </>
        )}
      </body>
    </html>
  );
}
