import Head from "next/head";
import "@/src/global.css";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";
import Script from 'next/script';


export default function MyApp({ Component, pageProps }) {



    useEffect(() => {

        if (localStorage.getItem("kkupgrader_Mode") === "false")
            document.body.classList.remove("DarkMode");
        else if (localStorage.getItem("kkupgrader_Mode") === "true" || window.matchMedia('(prefers-color-scheme: dark)'))
            document.body.classList.add("DarkMode");
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
        <Script
            src={"https://www.googletagmanager.com/gtag/js?id=" + (process.env.GOOGLE_ANALYTICS_ID || 'GTM-KSK95ML')}
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.GOOGLE_ANALYTICS_ID || 'GTM-KSK95ML'});
        `}
        </Script>
        <Component {...pageProps} />
    </>
}