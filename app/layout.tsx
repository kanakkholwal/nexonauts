import type { Metadata } from 'next';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import { Provider } from "./client-provider";
import './global.css';

// import { Urbanist } from 'next/font/google';
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin-ext', 'latin'],
    display: 'swap',
    adjustFontFallback: false,
    variable: '--plus-jakarta',
    fallback:['system-ui','sans-serif']
})


// const font = Urbanist({
//     subsets: ['latin'],
//     preload: true,
//     display: 'swap',
//     weight: ["200","300", "400", "500", "600", '700', "800"],
// })

export const metadata: Metadata = {
    title: 'Nexonauts - One stop solution for all your developer needs.',
    description: 'Nexonauts is an one stop solution for all your developer needs.',
    applicationName: 'Nexonauts',
    keywords: ['Next.js', 'React', 'JavaScript', 'Nexonauts', 'AI Saas', 'AI', 'Saas', 'developer', 'developer tools', 'developer resources', 'developer'],
    authors: [{ name: 'Kanak Kholwal', url: 'https://kanakkholwal.eu.org' }],
    creator: 'Kanak Kholwal',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://nexonauts.com/'),
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    manifest: './manifest.json',

}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-BCVK6GWZ0E" />
                <meta name="google-adsense-account" content="ca-pub-2329686175069611" />
                {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
                    <link href='https://fonts.googleapis.com/css?family=Fira+Code:wght@300,400,500,600&display=swap' rel='stylesheet' /> */}
            </head>
            <body className={font.className + " min-h-screen selection:bg-primary/10 selection:text-primary dark:bg-gray-900"}>
                <Provider>{children}</Provider>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                    gutter={8}
                    containerClassName=""
                    containerStyle={{}}
                    toastOptions={{
                        // Define default options
                        className: '',
                        duration: 5000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        // Default options for specific types
                        success: {
                            duration: 3000,
                            // "theme": {
                            //     primary: 'green',
                            //     secondary: 'black',
                            // },
                        },
                    }}
                />
            </body>
        </html>
    )
}
