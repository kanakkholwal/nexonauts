import Head from "next/head";
import "../src/style.css";
export default function MyApp({ Component, pageProps }) {
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
        </Head>
        <Component {...pageProps} />
    </>
}