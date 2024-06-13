import { GoogleAnalytics } from '@next/third-parties/google';
import { ROOT_METADATA } from 'data/root';
import type { Metadata } from 'next';
import { Provider, ThemeProvider } from './client-provider';
import './codebox.css';
import './global.css';
// import { Urbanist } from 'next/font/google';
import { Plus_Jakarta_Sans } from 'next/font/google';

const font = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin-ext', 'latin'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--plus-jakarta',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = ROOT_METADATA;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6988693445063744" />
      </head>
      <body
        className={`${font.className}  min-h-screen selection:bg-primary/10 selection:text-primary bg-slate-100 dark:bg-neutral-900 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          themes={['light', 'dark']}
        >
          <Provider>{children}</Provider>
        </ThemeProvider>
        {process.env.NODE_ENV !== 'development' && (
          <GoogleAnalytics gaId="G-DQ8920P13D" />
        )}
      </body>
    </html>
  );
}
