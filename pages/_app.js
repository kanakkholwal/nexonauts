import Head from "next/head";
// import { Html } from "next/document";
import "../src/style.css";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";
export default function MyApp({ Component, pageProps }) {



    useEffect(() => {
        if (localStorage.getItem("kkupgrader_Mode") === "true")
            document.body.classList.add("DarkMode");
        else
            document.body.classList.remove("DarkMode");
        Aos.init();

    }, [])
    return <>
        <Head>
            {/* <!-- Preload Cdns --> */}
            <link href='https://fonts.googleapis.com' rel='preconnect' />
            <link href='https://fonts.cdnfonts.com' rel='preconnect' />
            <link crossOrigin='' href='https://fonts.gstatic.com' rel='preconnect' />

            <meta http-equiv='X-UA-Compatible' content='IE=edge' />
            <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
            <link rel="icon" type="image/svg+xml" href="/kkupgrader.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#a4acff" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <link href='https://fonts.googleapis.com/css?family=Google%20Sans:300,400,500,700&display=swap' rel='stylesheet' />
            <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700&display=swap" rel="stylesheet" />
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2329686175069611"
                crossorigin="anonymous" ></script>

        </Head>
        <Component {...pageProps} />
    </>
}