import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

// export default function Document() {
//     return (
//         <Html lang='en'>
//             <Head>
//                 <link href='https://fonts.googleapis.com/css?family=Google%20Sans:300,400,500,600,700,800&display=swap' rel='stylesheet' />
//                 <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
//                 <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
//                 <NextScript async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2329686175069611"
//                     crossOrigin="anonymous" ></NextScript>
//             </Head>
//             <body>
//                 <Main />
//             </body>
//         </Html>
//     )
// }

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {


        return (
            <Html lang='en'>
                <Head>
                    <link href='https://fonts.googleapis.com/css?family=Google%20Sans:300,400,500,600,700,800&display=swap' rel='stylesheet' />
                    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
                    <NextScript async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2329686175069611"
                        crossOrigin="anonymous" ></NextScript>
                </Head>
                <body>
                    <Main />
                </body>
            </Html>
        )
    }
}