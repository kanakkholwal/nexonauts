import Head from "next/head";
import * as gtag from "../lib/gtag"
import Script from 'next/script'
import "src/global.css";
import "aos/dist/aos.css";
import Progress from 'components/progress';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Aos from "aos";
import { SessionProvider } from "next-auth/react"


export default function MyApp({ Component, pageProps: { session, ...pageProps }, }) {

    const [isAnimating, setIsAnimating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleStart = () => {
            setIsAnimating(true);
        };
        const handleStop = () => {
            gtag.pageview(url);
            setIsAnimating(false);
        };

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleStop);
        router.events.on('routeChangeError', handleStop);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleStop);
            router.events.off('routeChangeError', handleStop);
        };
    }, [router]);


    useEffect(() => {

        if (window.matchMedia('(prefers-color-scheme: dark)')) {
            if (localStorage.getItem("kkupgrader_Mode") && localStorage.getItem("kkupgrader_Mode") === "false")
                document.body.classList.remove("DarkMode");
            else
                document.body.classList.remove("DarkMode");
        }
        else if (localStorage.getItem("kkupgrader_Mode") === "true")
            document.body.classList.add("DarkMode");
        else if (localStorage.getItem("kkupgrader_Mode") === "false")
            document.body.classList.remove("DarkMode");
        else
            document.body.classList.remove("DarkMode");

        Aos.init({
            offset: 200,
            duration: 750,
            easing: 'ease-in-out',
            delay: 100,
        });
    }, [])
    return <>
        <Head>
            {/* <!-- Preload Cdns --> */}
            <link href='https://fonts.googleapis.com' rel='preconnect' />
            <link href='https://fonts.cdnfonts.com' rel='preconnect' />
            <link crossOrigin='' href='https://fonts.gstatic.com' rel='preconnect' />
            <meta name="googlebot" content="all" />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
            <link rel="icon" type="image/svg+xml" href="/kkupgrader.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#11a6d3" />
            <link rel="apple-touch-icon" href="/favicon.ico" />

        </Head>
        <Progress isAnimating={isAnimating} />
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-BCVK6GWZ0E" />

        <Script id='google-analytics'
            strategy="afterInteractive" >
            {`
        window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BCVK6GWZ0E', {
            page_path: window.location.pathname,
         });
        `}
        </Script>
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    </>
}