
import React from 'react';
import { Head, Html } from 'next/document';

interface MetaProps {
    PageTitle: string,
    SiteName: string,
    PageDescription: string,
    PageUrl: string,
    PreviewImage: string,
    PageType: string,
    PageLocale: string

}
export default function PageMetaData({ PageTitle, SiteName, PageDescription, PageUrl, PreviewImage, PageType, PageLocale }: MetaProps) {

    return (
        <Html lang='en'>
            <Head>
                <title>{PageTitle ?? "K K UPGRADER"}</title>
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content={PageTitle ?? "K K UPGRADER"} />
                {/* <!-- Search Engine --> */}
                <meta name="description" content={PageDescription ?? "Open Source Projects ,Blogging , Internet Tools and Coding Tips."} />
                <meta name="image" content={PreviewImage ?? "/textLogo.svg"} />
                {/* <!-- Schema.org for Google --> */}
                <meta itemProp="name" content={PageTitle ?? "K K UPGRADER"} />
                <meta itemProp="description" content={PageDescription ?? "Open Source Projects ,Blogging , Internet Tools and Coding Tips."} />
                <meta itemProp="image" content={PreviewImage ?? "/textLogo.svg"} />
                {/* <!-- Open Graph general (Facebook, Pinterest & LinkedIn) --> */}
                <meta property="og:title" content={PageTitle ?? "K K UPGRADER"} />
                <meta property="og:description" content={PageDescription ?? "Open Source Projects ,Blogging , Internet Tools and Coding Tips."} />
                <meta property="og:image" content={PreviewImage ?? "/textLogo.svg"} />
                <meta property="og:url" content={PageUrl ?? "https://kkupgrader.eu.org"} />
                <meta property="og:site_name" content={SiteName ?? "K K UPGRADER"} />
                <meta property="og:locale" content={PageLocale ?? "en_US"} />
                <meta property="og:type" content={PageType ?? "website"} />
                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:title" content={PageTitle ?? "K K UPGRADER"} />
                <meta property="twitter:description" content={PageDescription ?? "Open Source Projects ,Blogging , Internet Tools and Coding Tips."} />
                <meta property="twitter:image:src" content={PreviewImage ?? "/textLogo.svg"} />

                {/* <!-- Preload Cdns --> */}
                <link href='https://fonts.googleapis.com' rel='preconnect' />
                <link href='https://fonts.cdnfonts.com' rel='preconnect' />
                <link crossOrigin='' href='https://fonts.gstatic.com' rel='preconnect' />

                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <link rel="icon" type="image/svg+xml" href="/kkupgrader.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#a4acff" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
            </Head>
        </Html>
    )
}